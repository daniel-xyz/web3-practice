// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract LotteryPortal {
    uint256 totalTickets;
    uint256 private seed;

    event TicketBought(address indexed from, uint256 timestamp, string message);

    struct Ticket {
        address owner;
        string message;
        uint256 timestamp;
    }

    Ticket[] tickets;

    constructor() payable {
        console.log("This contract is under construction");
        seed = (block.timestamp + block.difficulty) % 100;
    }

    function buyTicket(string memory _message) public {
        seed = (block.difficulty + block.timestamp + seed) % 100;
        console.log("Random # generated: %d", seed);

        if (seed <= 1) {
            console.log("%s won!", msg.sender);

            uint256 prizeAmount = 0.0001 ether;
            require(
                prizeAmount <= address(this).balance,
                "Trying to withdraw more money than the contract has."
            );
            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to withdraw money from contract.");
        }

        totalTickets += 1;
        console.log("%s has bought a lottery ticket!", msg.sender);

        tickets.push(Ticket(msg.sender, _message, block.timestamp));
        emit TicketBought(msg.sender, block.timestamp, _message);
    }

    function getAllTickets() public view returns (Ticket[] memory) {
        return tickets;
    }

    function getTotalTickets() public view returns (uint256) {
        console.log("%d lottery tickets have been sold!", totalTickets);
        return totalTickets;
    }
}