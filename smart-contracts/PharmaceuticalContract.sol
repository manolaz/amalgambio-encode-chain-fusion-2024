// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract PharmaceuticalContract is Ownable {
    struct Drug {
        string name;
        uint256 price;
    }

    mapping(string => Drug) public drugs; // Mapping from drug name to Drug data

    event DrugAdded(string name, uint256 price);

    function addDrug(string memory name, uint256 price) external onlyOwner {
        drugs[name] = Drug({
            name: name,
            price: price
        });

        emit DrugAdded(name, price);
    }

    function getDrugPrice(string memory name) external view returns (uint256) {
        return drugs[name].price;
    }
}