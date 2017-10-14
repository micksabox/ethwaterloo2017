# Healthcare App @ ethwaterloo2017

## Development

```
npm install -g truffle // Version 3.0.5+ required.
npm install -g ethereumjs-testrpc
```
Project bootstrapped with Truffle box
https://github.com/truffle-box/react-uport-box

Start developing with
`
npm run start
`

## Mechanism Design

As per the talks at the conference, its important to architect from a mechanism design perspective. This means identifying a few things about our dApp.

### Design Goals

Reduction of Costs for Insurance-Provider-Patient Ecosystem.

### Design Challenges

#### Privacy Preservation
We are assuming that patients are ok with releasing their data to providers

### Interest Group Incentives

**Patients**
+ Pay less co-pay
- Sacrifice privacy (give more data)
+ Revieve more accurate diagnosis for walk-in clinics, healthcare while travelling

**Care Providers**
+ Less insurance premiums
- Pay more percentage of co-pay
+ Less litigation costs
+ More operational efficiency (less duplicated tests)

**Medical Malpractice Insurance Providers**
+ Less exposure to risk
+ Less operating costs

**Patients Insurance**
+ Less risk
+ Less operating costs

## System Architecture

### Data Storage
Data storage is handled off-chain on a mechanism like Storj, or possibly in future, IPFS.

### Data Types
Data stored will strictly be files, since these can be hashed and be transferred from provider to provider. Critically, the integrity of these files can be compared at any point in future history by re-hashing the data and comparing the one stored on chain.

### Medical Transaction Structure
- Doctors public key
- Patients public key
- Hash of file

Together, the hash of these three produce a signature which proves that the patient provided authorization for the file to a provider
