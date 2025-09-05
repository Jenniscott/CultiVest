// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

// This is an interface for the official ENS Public Resolver contract
interface PublicResolver {
    function setAddr(bytes32 node, address a) external;
    function addr(bytes32 node) external view returns (address);
}
