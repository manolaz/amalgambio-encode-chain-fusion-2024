// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract InsuranceContract is Ownable {
    struct Policy {
        address patient;
        uint256 premium;
        bool isActive;
    }

    mapping(address => Policy) public policies;

    event PolicyPurchased(address indexed patient, uint256 premium);
    
    function purchasePolicy(uint256 premium) external payable {
        require(msg.value == premium, "Incorrect payment amount");
        require(!policies[msg.sender].isActive, "Policy already active");

        policies[msg.sender] = Policy({
            patient: msg.sender,
            premium: premium,
            isActive: true
        });

        emit PolicyPurchased(msg.sender, premium);
    }

    function payForTreatment(address hospital, uint256 amount) external onlyOwner {
        // Logic to pay hospital for treatment
        payable(hospital).transfer(amount);
    }
}