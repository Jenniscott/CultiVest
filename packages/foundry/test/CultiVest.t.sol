// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../contracts/CultiVest.sol";
import "../contracts/ENSTools.sol";
import "../contracts/PublicResolver.sol";
import "../contracts/MockUSD.sol";


contract FarmingProjectTest is Test {
    // Contracts under test
    FarmerRegistry registry;
    FarmingProjectFactory factory;
    ProjectEscrow project;
    MockUSD mUSD;

    // Actors
    address private farmer = address(0x1a);
    address private investor1 = address(0xb1);
    address private investor2 = address(0xb2);
    address private projectAdmin = address(0xad);
    address private owner = address(0xc0); // Using a specific address for the owner
    address private ensOwner = address(0xe0); // ENS owner address
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
        mUSD = new MockUSD(1000000 * 1e18); // Mint initial supply to the owner

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
        mUSD.mint(investor1, 500 * 1e18);
        vm.prank(owner);
        mUSD.mint(investor2, 500 * 1e18);
        
        // Approve tokens for investors
        vm.prank(investor1);
        mUSD.approve(address(factory), 500 * 1e18);
        vm.prank(investor2);
        mUSD.approve(address(factory), 500 * 1e18);
        
        vm.warp(START_TIME);
    }

    function testProjectCreationSuccess() public {
        vm.prank(farmer);
        factory.createProject(
            FUNDING_GOAL,
            milestoneAmounts,
            FUNDING_DEADLINE,
            FUNDING_DEADLINE + 1 weeks,
            address(mUSD),
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
            address(mUSD),
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
            address(mUSD),
            EXPECTED_ROI
        );

        address newProjectAddr = address(factory.deployedProjects(0));
        project = ProjectEscrow(newProjectAddr);

        vm.startPrank(investor1);
        mUSD.approve(address(project), 500 * 1e18);
        project.invest(500 * 1e18);
        vm.stopPrank();

        assertEq(project.totalPledged(), 500 * 1e18);
        assertEq(project.investors(investor1), 500 * 1e18);
        assertEq(mUSD.balanceOf(investor1), 0);
        assertEq(mUSD.balanceOf(newProjectAddr), 500 * 1e18);

        vm.startPrank(investor2);
        mUSD.approve(address(project), 500 * 1e18);
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
            address(mUSD),
            EXPECTED_ROI
        );
        address newProjectAddr = address(factory.deployedProjects(0));
        project = ProjectEscrow(newProjectAddr);

        // investor1 invests part
        vm.startPrank(investor1);
        mUSD.approve(address(project), 500 * 1e18);
        project.invest(500 * 1e18);
        vm.stopPrank();

        assertEq(project.totalPledged(), 500 * 1e18);

        // Warp past deadline
        vm.warp(FUNDING_DEADLINE + 1);

        // Trigger refund
        vm.prank(address(0xdead));
        project.refundInvestorsIfUnfunded();

        assertEq(uint256(project.projectState()), uint256(ProjectEscrow.ProjectState.Canceled));
        assertEq(mUSD.balanceOf(investor1), 500 * 1e18);
        assertEq(mUSD.balanceOf(address(project)), 0);
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

        assertEq(mUSD.balanceOf(farmer), 400 * 1e18 + 600 * 1e18);
        assertEq(project.currentMilestoneIndex(), 2);
        assertEq(uint256(project.projectState()), uint256(ProjectEscrow.ProjectState.Completed));

        // Farmer deposits returns (owner mints and farmer pays to project)
        uint256 totalExpectedReturns = (FUNDING_GOAL * EXPECTED_ROI) / 100 + FUNDING_GOAL;
        vm.prank(owner);
        mUSD.mint(farmer, totalExpectedReturns);
        vm.startPrank(farmer);
        mUSD.approve(address(project), totalExpectedReturns);
        project.payReturns(totalExpectedReturns);
        vm.stopPrank();

        assertEq(project.totalReturnsDeposited(), totalExpectedReturns);

        // Investor1 claim
        vm.startPrank(investor1);
        uint256 before = mUSD.balanceOf(investor1);
        project.claimReturns();
        uint256 expectedClaim = (500 * 1e18 * totalExpectedReturns) / FUNDING_GOAL;
        assertEq(mUSD.balanceOf(investor1), before + expectedClaim);
        assertEq(project.returnsBalances(investor1), 0);
        vm.stopPrank();
    }

    function testENSResolution() public {
        ENSTools ensTools = new ENSTools();
        vm.prank(ensOwner);
        ensTools.registerAndSetAddr(
            ensOwner,
            address(factory),
            "cultivest"
        );

        // Instantiate the official ENS Public Resolver
        PublicResolver resolver = PublicResolver(0x7E3697926955030E428807F9e05837648356c9AF);

        // Get the node hash for "cultivest.eth"
        bytes32 label = keccak256(bytes("cultivest"));
        bytes32 node = keccak256(abi.encodePacked(bytes32(0), label));
        
        // Assert that the resolved address matches the factory address
        assertEq(resolver.addr(node), address(factory));
    }
}
