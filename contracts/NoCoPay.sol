pragma solidity ^0.4.11;

import "./BaseRegistry.sol";

contract NoCoPay is BaseRegistry {

  struct PatientList {
    address[] patients;
    uint patientCount;
  }

  mapping (address => mapping (address => string)) public relationship;

  mapping( address => PatientList ) public providersToPatients;

  // mapping( uint => address ) public patients;

  function NoCoPay() {
    // constructor
  }

  function assignProvider( address _patient, address _provider ) {

    providersToPatients[_provider].patients.push(_patient);
    providersToPatients[_provider].patientCount += 1;
  }

  function getPatientCount( address _provider ) constant returns (uint) {
    return providersToPatients[_provider].patientCount;
  }

  function getPatientAtIndex( address _provider, uint index ) constant returns (address){
    return providersToPatients[_provider].patients[index];
  }

  function addRecord(address _doctor, address _patient, string _documentHash) {
    relationship[_doctor][_patient] = _documentHash;
    }

  function getHash (address _doctor, address _patient, string _documentHash) constant returns (string) {
    return relationship[_doctor][_patient];
  }



  function providerCheck (address _doctor, address _patient, string _providerHash) returns (bool success) {
      /*if (relationship[_doctor][_patient] != _providerHash) revert();
      return true;*/
  }


}
