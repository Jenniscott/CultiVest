// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "forge-std/Test.sol";
import "../contracts/CultiVest.sol"; 


contract MockUSDC {
    string public name = "Mock USDC";
    string public symbol = "mUSDC";
    uint8 public decimals = 18;
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    address public owner;

    constructor(uint256 initialSupply) {
        owner = msg.sender;
        balanceOf[msg.sender] = initialSupply;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "onlyOwner");
        _;
    }

    function mint(address to, uint256 amount) external onlyOwner {
        balanceOf[to] += amount;
    }

    function approve(address spender, uint256 amount) external returns (bool) {
        allowance[msg.sender][spender] = amount;
        return true;
    }

    function transfer(address to, uint256 amount) external returns (bool) {
        require(balanceOf[msg.sender] >= amount, "insufficient");
        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;
        return true;
    }

    function transferFrom(address from, address to, uint256 amount) external returns (bool) {
        uint256 allowed = allowance[from][msg.sender];
        require(allowed >= amount, "allowance");
        require(balanceOf[from] >= amount, "balance");
        allowance[from][msg.sender] = allowed - amount;
        balanceOf[from] -= amount;
        balanceOf[to] += amount;
        return true;
    }
}

contract FarmingProjectTest is Test {
    // Contracts under test
    FarmerRegistry registry;
    FarmingProjectFactory factory;
    ProjectEscrow project;
    MockUSDC mUSDC;

    // Actors
    address farmer = address(0x1a);
    address investor1 = address(0xb1);
    address investor2 = address(0xb2);
    address projectAdmin = address(0xad);
    address owner = address(this); // test contract acts as owner for mocks

    // Params
    uint256 public constant FUNDING_GOAL = 1000 * 1e18;
    uint256[] public milestoneAmounts;
    uint256 public constant EXPECTED_ROI = 20; // 20%
    uint256 public constant START_TIME = 1000;
    uint256 public constant FUNDING_DEADLINE = 1200;

    function setUp() public {
        // Deploy mock token and grant initial supply to owner (this test)
        mUSDC = new MockUSDC(0);

        // Prepare dynamic milestone array (must sum to FUNDING_GOAL)
       milestoneAmounts = new uint256[](2);
       milestoneAmounts[0] = 400 * 1e18;
       milestoneAmounts[1] = 600 * 1e18;


        // Deploy registry and factory (owner = this test contract)
        registry = new FarmerRegistry(address(this));
        factory = new FarmingProjectFactory(address(registry), projectAdmin);

        // Vet farmer in registry (onlyOwner)
        vm.prank(address(this));
        registry.vetFarmer(farmer);

        // Mint tokens to investors (owner mints)
        vm.prank(address(this));
        mUSDC.mint(investor1, 500 * 1e18);
        vm.prank(address(this));
        mUSDC.mint(investor2, 500 * 1e18);

        
        vm.warp(START_TIME);
    }

    function testProjectCreationSuccess() public {
        vm.prank(farmer);
        factory.createProject(
            FUNDING_GOAL,
            milestoneAmounts,
            FUNDING_DEADLINE,
            START_TIME + 200,
            address(mUSDC),
            EXPECTED_ROI
        );

        // Get deployed project address (public array getter returns ProjectEscrow contract type -> cast to address)
        address newProjectAddr = address(factory.deployedProjects(0));
        assertNotEq(newProjectAddr, address(0));

        ProjectEscrow p = ProjectEscrow(newProjectAddr);
        
        assertEq(uint256(p.projectState()), uint256(ProjectEscrow.ProjectState.Ongoing));
    }

    function testRevertCreateProjectAfterFarmingStart() public {
        vm.warp(START_TIME + 201);
        vm.prank(farmer);
        vm.expectRevert(bytes("Farming season has already started."));
        factory.createProject(
            FUNDING_GOAL,
            milestoneAmounts,
            FUNDING_DEADLINE,
            START_TIME + 200,
            address(mUSDC),
            EXPECTED_ROI
        );
    }

    function testInvestmentSuccess() public {
      
        vm.prank(farmer);
        factory.createProject(
            FUNDING_GOAL,
            milestoneAmounts,
            FUNDING_DEADLINE,
            START_TIME + 200,
            address(mUSDC),
            EXPECTED_ROI
        );

        address newProjectAddr = address(factory.deployedProjects(0));
        project = ProjectEscrow(newProjectAddr);

        
        vm.prank(investor1);
        mUSDC.approve(address(project), 500 * 1e18);
        vm.prank(investor1);
        project.invest(500 * 1e18);

        assertEq(project.totalPledged(), 500 * 1e18);
        assertEq(project.investors(investor1), 500 * 1e18);
        assertEq(mUSDC.balanceOf(investor1), 0);
        assertEq(mUSDC.balanceOf(newProjectAddr), 500 * 1e18);

        
        vm.prank(investor2);
        mUSDC.approve(address(project), 500 * 1e18);
        vm.prank(investor2);
        project.invest(500 * 1e18);

        assertEq(project.totalPledged(), FUNDING_GOAL);
        assertEq(uint256(project.projectState()), uint256(ProjectEscrow.ProjectState.Funded));
    }

    function testRefundInvestorsIfUnfunded() public {
      
        vm.prank(farmer);
        factory.createProject(
            FUNDING_GOAL,
            milestoneAmounts,
            FUNDING_DEADLINE,
            START_TIME + 200,
            address(mUSDC),
            EXPECTED_ROI
        );
        address newProjectAddr = address(factory.deployedProjects(0));
        project = ProjectEscrow(newProjectAddr);

        // investor1 invests part
        vm.prank(investor1);
        mUSDC.approve(address(project), 500 * 1e18);
        vm.prank(investor1);
        project.invest(500 * 1e18);

        assertEq(project.totalPledged(), 500 * 1e18);

        // Warp past deadline
        vm.warp(FUNDING_DEADLINE + 1);

        // Trigger refund
        vm.prank(address(0xdead));
        project.refundInvestorsIfUnfunded();

        assertEq(uint256(project.projectState()), uint256(ProjectEscrow.ProjectState.Canceled));
        assertEq(mUSDC.balanceOf(investor1), 500 * 1e18);
        assertEq(mUSDC.balanceOf(address(project)), 0);
    }

    function testMilestonePayoutsAndReturns() public {
        testInvestmentSuccess(); // fund project
        address newProjectAddr = address(factory.deployedProjects(0));
        project = ProjectEscrow(newProjectAddr);

        // Warp to during farming time
        vm.warp(START_TIME + 250);

        // Farmer submits milestone 1 proof
        vm.prank(farmer);
        project.submitMilestoneProof("milestone1-proof");
        assertTrue(project.milestoneProofsSubmitted(0));

        // Admin releases funds for milestone 1
        vm.prank(projectAdmin);
        project.releaseMilestoneFunds(abi.encodePacked("signature")); // mock signature
        assertEq(mUSDC.balanceOf(farmer), 400 * 1e18);
        assertEq(project.currentMilestoneIndex(), 1);

        // Milestone 2 proof and payout
        vm.prank(farmer);
        project.submitMilestoneProof("milestone2-proof");
        assertTrue(project.milestoneProofsSubmitted(1));

        vm.prank(projectAdmin);
        project.releaseMilestoneFunds(abi.encodePacked("signature"));
        assertEq(mUSDC.balanceOf(farmer), 400 * 1e18 + 600 * 1e18);
        assertEq(project.currentMilestoneIndex(), 2);
        assertEq(uint256(project.projectState()), uint256(ProjectEscrow.ProjectState.Completed));

        // Farmer deposits returns (owner mints and farmer pays to project)
        uint256 totalExpectedReturns = (FUNDING_GOAL * EXPECTED_ROI) / 100 + FUNDING_GOAL;
        vm.prank(address(this));
        mUSDC.mint(farmer, totalExpectedReturns);
        vm.prank(farmer);
        mUSDC.approve(address(project), totalExpectedReturns);
        vm.prank(farmer);
        project.payReturns(totalExpectedReturns);

        assertEq(project.totalReturnsDeposited(), totalExpectedReturns);

        // Investor1 claim
        vm.prank(investor1);
        uint256 before = mUSDC.balanceOf(investor1);
        vm.prank(investor1);
        project.claimReturns();
        uint256 expectedClaim = (500 * 1e18 * totalExpectedReturns) / FUNDING_GOAL;
        assertEq(mUSDC.balanceOf(investor1), before + expectedClaim);
        assertEq(project.returnsBalances(investor1), 0);
    }
}
