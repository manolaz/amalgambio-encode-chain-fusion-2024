// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract HospitalContract is Ownable {
    struct TreatmentClaim {
        address hospital;
        uint256 amount;
        bool isPaid;
    }

    mapping(uint256 => TreatmentClaim) public claims; // Mapping from claim ID to TreatmentClaim data
    uint256 public claimCounter;

    event ClaimSubmitted(uint256 claimId, address hospital, uint256 amount);

    function submitClaim(uint256 amount) external returns (uint256) {
        claimCounter++;
        
        claims[claimCounter] = TreatmentClaim({
            hospital: msg.sender,
            amount: amount,
            isPaid: false
        });

        emit ClaimSubmitted(claimCounter, msg.sender, amount);
        
        return claimCounter;
    }

    function payClaim(uint256 claimId) external onlyOwner {
        require(!claims[claimId].isPaid, "Claim already paid");
        
        claims[claimId].isPaid = true;
        
        payable(claims[claimId].hospital).transfer(claims[claimId].amount);
    }
}