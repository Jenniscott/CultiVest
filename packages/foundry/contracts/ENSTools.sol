// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import { ENS } from "./ENS.sol";
import { PublicResolver } from "./PublicResolver.sol";

// This contract provides a reusable tool for setting up an ENS domain on a public testnet
contract ENSTools is Script {
    // Official ENS contract addresses on Base Sepolia
    address private constant ENS_REGISTRY_ADDRESS = 0x47B08031D102a093D89B1D9051512fF666F076c8;
    address private constant ENS_PUBLIC_RESOLVER_ADDRESS = 0x7E3697926955030E428807F9e05837648356c9AF;

    function registerAndSetAddr(
        address ensOwner,
        address targetAddress,
        string memory domainName
    ) public {
        // Instantiate the official ENS contracts on Base Sepolia
        ENS ens = ENS(ENS_REGISTRY_ADDRESS);
        PublicResolver resolver = PublicResolver(ENS_PUBLIC_RESOLVER_ADDRESS);

        // Create the node hash for the domain name
        bytes32 label = keccak256(bytes(domainName));
        bytes32 node = keccak256(abi.encodePacked(bytes32(0), label));
        
        // This transaction must be broadcast by the `ensOwner` who already owns the name
        // on the testnet.
        vm.prank(ensOwner);
        ens.setResolver(node, address(resolver));

        // Set the address of the target contract as the resolved address for the domain
        vm.prank(ensOwner);
        resolver.setAddr(node, targetAddress);

        console.log("ENS domain '", domainName, ".eth' now points to ", targetAddress);
    }
}
