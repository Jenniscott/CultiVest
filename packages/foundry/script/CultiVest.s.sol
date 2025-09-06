// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import {ProjectEscrow, FarmingProjectFactory, FarmerRegistry} from "../contracts/CultiVest.sol";
import { MockUSD } from "../contracts/MockUSD.sol";
import { ENSTools } from "../contracts/ENSTools.sol";

contract DeployCultiVest is Script {
    function run() external {
        // The address of the ENS name owner.
        // Replace this with your own address or multisig for real deployment.
        address ensOwner = vm.envAddress("ENS_OWNER");
        address projectAdmin = vm.envAddress("PROJECT_ADMIN");
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);

        // Deploy the mock USD token
        MockUSD mUSD = new MockUSD(1000000 * 1e18);
        console.log("MockUSD deployed at:", address(mUSD));

        // Deploy the FarmerRegistry
        FarmerRegistry registry = new FarmerRegistry(msg.sender);
        console.log("FarmerRegistry deployed at:", address(registry));

        // Deploy the FarmingProjectFactory
        FarmingProjectFactory factory = new FarmingProjectFactory(address(registry), projectAdmin);
        console.log("FarmingProjectFactory deployed at:", address(factory));

        // Deploy ENSTools for later ENS management
        ENSTools ensTools = new ENSTools();
        console.log("ENSTools deployed at:", address(ensTools));
        console.log("To register ENS domain, the ENS_OWNER must call:");
        console.log("ensTools.registerAndSetAddr(ensOwner, factoryAddress, 'cultivest')");

        vm.stopBroadcast();
    }
}
