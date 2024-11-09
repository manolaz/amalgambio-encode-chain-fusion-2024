# Amalgam DApp Overview

## Introduction

Amalgam is a decentralized application designed to streamline the management of Electronic Medical Records (EMRs) using blockchain technology. This DApp allows patients to purchase insurance, enables doctors to create EMR NFTs, and facilitates payments from insurance companies to hospitals for treatment events and drug plans. The architecture includes multiple smart contracts to manage interactions between patients, doctors, insurance companies, hospitals, and pharmaceutical companies.

## Features

- **Secure Data Sharing**: Utilizes advanced encryption techniques and proxy re-encryption to ensure that EMR data remains confidential during sharing between authorized users.
- **Chain Abstraction**: Implements Particle Network's chain abstraction technology to simplify interactions across multiple blockchains, allowing seamless access to EMR data without the need for managing multiple wallets or chains.
- **User-Friendly Interface**: Designed with a focus on user experience, enabling healthcare professionals to easily access and share patient records while maintaining compliance with privacy regulations.
- **Insurance Management**: Patients can purchase insurance policies directly through the DApp.
- **EMR as NFTs**: Doctors can create EMRs as NFTs, providing proof of patient diagnoses and treatments.
- **Insurance Payments**: Insurance companies can pay hospitals for treatment claims.
- **Pharmaceutical Integration**: Pharmaceutical companies can provide drug information and pricing.

## Technology Stack

- **Blockchain**: Built on a robust blockchain framework that supports decentralized storage and secure transactions.
- **LightProtocol**: Utilized for handling encrypted data sharing, ensuring that only authorized parties can decrypt and access sensitive information.
- **Particle Network**: Leverages account-level chain abstraction to enable smooth interactions between different blockchains, enhancing the DApp's scalability and usability.

## Supported Networks

- Base
- arbitrum
- Linea Sepolia
- Polygon Amoy Testnet
- Story Protocol Testnet
- Ethereum
- Solana with KLASTER

## Getting Started

To set up the Amalgam DApp locally, follow these steps:

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   Create a `.env` file in the root directory and add your blockchain node URLs and other necessary configurations.

3. **Run the DApp**

   ```bash
   npm start
   ```

4. **Access the DApp**
   Open your browser and navigate to `http://localhost:3000` to start using the Amalgam DApp.

## Use Cases

- **Healthcare Providers**: Securely share patient records with specialists while maintaining patient confidentiality.
- **Patients**: Control access to their medical records and grant permissions to healthcare providers as needed.

## Smart Contracts

The DApp consists of multiple smart contracts that facilitate various functionalities:

- InsuranceContract: Manages insurance policies and payments.
- EMRContract: Handles creation of EMR NFTs.
- HospitalContract: Manages hospital claims and payments.
- PharmaceuticalContract: Manages drug prescriptions and payments.

## Workflow Diagram

```plaintext
+----------------+          +---------------------+
|                |          |                     |
|    Patients     +--------->  Insurance Company   |
|                |          |                     |
+----------------+          +---------------------+
         |                           ^
         |                           |
         |                           |
         v                           |
+----------------+                   |
|                |                   |
|     Doctors    +-------------------+
|                |                   |
+----------------+                   |
         |                           |
         |                           |
         v                           |
+----------------+                   |
|                |                   |
|    EMR NFT     +-------------------+
|                |                   |
+----------------+                   |
         |                           |
         v                           |
+----------------+                   |
|                |                   |
|    Hospitals    +<-----------------+
|                |                   |
+----------------+                   |
         ^                           |
         |                           |
         |                           v
         +---------------------+  +---------------------+
                               |  |                     |
                               |  | Pharmaceutical Co.  |
                               |  |                     |
                               +--+---------------------+


```

## Conclusion

Amalgam aims to revolutionize the way EMR data is shared in the healthcare sector by leveraging blockchain technology for enhanced security and interoperability. Join us in building a future where patient data is shared securely and efficiently across medical institutions.

## Acknowledgments

Special thanks to Encode Club, Particle Network, and all participants of the Blockchain Hackathon for their support and inspiration in developing this project.
