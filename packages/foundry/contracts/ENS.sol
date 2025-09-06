// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// This is an interface for the official ENS Registry contract
interface ENS {
    function setResolver(bytes32 node, address resolver) external;
}