// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract EMRContract is ERC721, Ownable {
    struct EMR {
        address doctor;
        address patient;
        string emrData; // Store EMR data (could be encrypted)
    }

    mapping(uint256 => EMR) public emrs; // Mapping from token ID to EMR data
    uint256 public tokenCounter;

    event EMRCreated(uint256 tokenId, address patient, string emrData);

    constructor() ERC721("EMRNFT", "EMR") {
        tokenCounter = 0;
    }

    function createEMR(address patient, string memory emrData) external onlyOwner returns (uint256) {
        tokenCounter++;
        uint256 tokenId = tokenCounter;

        emrs[tokenId] = EMR({
            doctor: msg.sender,
            patient: patient,
            emrData: emrData
        });

        _mint(patient, tokenId);
        
        emit EMRCreated(tokenId, patient, emrData);
        
        return tokenId;
    }
}