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

### Interest Groups Incentives

**Patients**
- Pay less co-pay
- Sacrifice privacy (give more data)
- Revieve more accurate diagnosis

**Care Providers**
- Less insurance premiums
- Pay more percentage of co-pay
- Less litigation
- More operational efficiency (less duplicated tests)

**Medical Malpractice Insurance Providers**
- Less exposure to risk
- Less operating costs

**Patients Insurance**
- Less risk
- Less operating costs

## System Architecture
