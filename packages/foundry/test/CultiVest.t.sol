// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "forge-std/Test.sol";
import "../contracts/CultiVest.sol"; 

// Mock ERC20 Token for testing
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
    address private farmer = address(0x1a);
    address private investor1 = address(0xb1);
    address private investor2 = address(0xb2);
    address private projectAdmin = address(0xad);
    address private owner = address(0xc0); // Using a specific address for the owner
    uint256 private constant PROJECT_ADMIN_PRIVATE_KEY = 0x123;

    // Params
    uint256 public constant FUNDING_GOAL = 1000 * 1e18;
    uint256[] public milestoneAmounts;
    uint256 public constant EXPECTED_ROI = 20; // 20%
    uint256 public constant START_TIME = 1000;
    uint256 public constant FUNDING_DEADLINE = 1200;

    function setUp() public {
        // Deploy mock token and grant initial supply to owner (this test)
        vm.prank(owner);
        mUSDC = new MockUSDC(1000000 * 1e18); // Mint initial supply to the owner

        // Prepare dynamic milestone array (must sum to FUNDING_GOAL)
        milestoneAmounts = new uint256[](2);
        milestoneAmounts[0] = 400 * 1e18;
        milestoneAmounts[1] = 600 * 1e18;


        // Deploy registry and factory (owner = this test contract)
        vm.prank(owner);
        registry = new FarmerRegistry(owner);
        vm.prank(owner);
        factory = new FarmingProjectFactory(address(registry), projectAdmin);

        // Vet farmer in registry (onlyOwner)
        vm.prank(owner);
        registry.vetFarmer(farmer);

        // Mint tokens to investors (owner mints)
        vm.prank(owner);
        mUSDC.mint(investor1, 500 * 1e18);
        vm.prank(owner);
        mUSDC.mint(investor2, 500 * 1e18);
        
        // Approve tokens for investors
        vm.prank(investor1);
        mUSDC.approve(address(factory), 500 * 1e18);
        vm.prank(investor2);
        mUSDC.approve(address(factory), 500 * 1e18);
        
        vm.warp(START_TIME);
    }

    function testProjectCreationSuccess() public {
        vm.prank(farmer);
        factory.createProject(
            FUNDING_GOAL,
            milestoneAmounts,
            FUNDING_DEADLINE,
            FUNDING_DEADLINE + 1 weeks,
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
        // Warp time to be past the farming season start time
        vm.warp(FUNDING_DEADLINE + 1 weeks + 1);
        vm.prank(farmer);
        vm.expectRevert("Farming season has already started.");
        factory.createProject(
            FUNDING_GOAL,
            milestoneAmounts,
            FUNDING_DEADLINE,
            FUNDING_DEADLINE + 1 weeks,
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
            FUNDING_DEADLINE + 1 weeks,
            address(mUSDC),
            EXPECTED_ROI
        );

        address newProjectAddr = address(factory.deployedProjects(0));
        project = ProjectEscrow(newProjectAddr);

        vm.startPrank(investor1);
        mUSDC.approve(address(project), 500 * 1e18);
        project.invest(500 * 1e18);
        vm.stopPrank();

        assertEq(project.totalPledged(), 500 * 1e18);
        assertEq(project.investors(investor1), 500 * 1e18);
        assertEq(mUSDC.balanceOf(investor1), 0);
        assertEq(mUSDC.balanceOf(newProjectAddr), 500 * 1e18);

        vm.startPrank(investor2);
        mUSDC.approve(address(project), 500 * 1e18);
        project.invest(500 * 1e18);
        vm.stopPrank();

        assertEq(project.totalPledged(), FUNDING_GOAL);
        assertEq(uint256(project.projectState()), uint256(ProjectEscrow.ProjectState.Funded));
    }

    function testRefundInvestorsIfUnfunded() public {
      
        vm.prank(farmer);
        factory.createProject(
            FUNDING_GOAL,
            milestoneAmounts,
            FUNDING_DEADLINE,
            FUNDING_DEADLINE + 1 weeks,
            address(mUSDC),
            EXPECTED_ROI
        );
        address newProjectAddr = address(factory.deployedProjects(0));
        project = ProjectEscrow(newProjectAddr);

        // investor1 invests part
        vm.startPrank(investor1);
        mUSDC.approve(address(project), 500 * 1e18);
        project.invest(500 * 1e18);
        vm.stopPrank();

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
        vm.warp(FUNDING_DEADLINE + 1 weeks + 1);

        // Farmer submits milestone 1 proof
        vm.prank(farmer);
        project.submitMilestoneProof("milestone1-proof");
        assertTrue(project.milestoneProofsSubmitted(0));

        // Admin releases funds for milestone 1
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(PROJECT_ADMIN_PRIVATE_KEY, keccak256("milestone1"));
        bytes memory sig = abi.encodePacked(r, s, v + 27);

        vm.prank(projectAdmin);
        project.releaseMilestoneFunds(sig);

        // Milestone 2 proof and payout
        vm.prank(farmer);
        project.submitMilestoneProof("milestone2-proof");
        assertTrue(project.milestoneProofsSubmitted(1));

        (uint8 v2, bytes32 r2, bytes32 s2) = vm.sign(PROJECT_ADMIN_PRIVATE_KEY, keccak256("milestone2"));
        bytes memory sig2 = abi.encodePacked(r2, s2, v2 + 27);

        vm.prank(projectAdmin);
        project.releaseMilestoneFunds(sig2);

        assertEq(mUSDC.balanceOf(farmer), 400 * 1e18 + 600 * 1e18);
        assertEq(project.currentMilestoneIndex(), 2);
        assertEq(uint256(project.projectState()), uint256(ProjectEscrow.ProjectState.Completed));

        // Farmer deposits returns (owner mints and farmer pays to project)
        uint256 totalExpectedReturns = (FUNDING_GOAL * EXPECTED_ROI) / 100 + FUNDING_GOAL;
        vm.prank(owner);
        mUSDC.mint(farmer, totalExpectedReturns);
        vm.startPrank(farmer);
        mUSDC.approve(address(project), totalExpectedReturns);
        project.payReturns(totalExpectedReturns);
        vm.stopPrank();

        assertEq(project.totalReturnsDeposited(), totalExpectedReturns);

        // Investor1 claim
        vm.startPrank(investor1);
        uint256 before = mUSDC.balanceOf(investor1);
        project.claimReturns();
        uint256 expectedClaim = (500 * 1e18 * totalExpectedReturns) / FUNDING_GOAL;
        assertEq(mUSDC.balanceOf(investor1), before + expectedClaim);
        assertEq(project.returnsBalances(investor1), 0);
        vm.stopPrank();
    }
}
