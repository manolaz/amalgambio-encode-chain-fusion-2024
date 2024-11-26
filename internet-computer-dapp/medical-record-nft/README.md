# Medical Record NFT Sharing DApp

## Overview

This decentralized application (dApp) provides a secure and privacy-preserving method for sharing medical records using the Internet Computer's NFT-like mechanism.

## Key Features

- Create encrypted medical record entries
- Granular access control for medical records
- Secure access request and approval system
- Decentralized and tamper-resistant storage

## Core Components

- `types.mo`: Defines data structures for medical records and access requests
- `medical_records_nft.mo`: Main canister with core functionality

### Main Functions

- `createMedicalRecord()`: Create a new medical record
- `requestRecordAccess()`: Request access to a specific medical record
- `processAccessRequest()`: Approve or reject access requests
- `getMedicalRecord()`: Retrieve a medical record with access control

## Security Considerations

- Records are encrypted before storage
- Access is strictly controlled by the record owner
- Uses Principal-based authentication
- Immutable and transparent record of access requests

## Deployment

1. Compile the Motoko files
2. Deploy the canister to the Internet Computer network
3. Initialize with appropriate access controls

## Future Improvements

- Add more granular encryption
- Implement multi-signature access approval
- Create additional metadata management
- Add event logging for access attempts
