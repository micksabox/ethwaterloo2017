pragma solidity ^0.4.11;

import "./BaseRegistry.sol";

contract NoCoPay is BaseRegistry {

  // STATE

  // relationship between Doctor, Patient and hash of medical data
  mapping (address => mapping (address => string)) public relationship;

  // Individual provider and patient relationships
  mapping( address => PatientList ) public providersToPatients;

  // Patient List for keeping track of provider and patient relationships
  struct PatientList {
    address[] patients;
    uint patientCount;
    string[] documentStorageReference;
  }

  // EVENTS

  // Fire an event each time a write happens
  event AssignProvider(address indexed _patient, address indexed _provider);
  event ProviderCheck(address indexed _doctor, address indexed _patient, string _providerHash);
  event AddRecord(address indexed _doctor, address indexed _patient, string _documentHash);

  function NoCoPay() {
    // constructor
  }

  // WRITE FUNCTIONS

  // Match a patient with their chosen provider
  function assignProvider( address _patient, address _provider ) {
    providersToPatients[_provider].patients.push(_patient);
    providersToPatients[_provider].patientCount += 1;
    AssignProvider(_patient, _provider);
  }

  // Add medical record once doctor has approved the documents. documentStorageReference is the key to pull from Storj
  function addRecord(address _doctor, address _patient, string _documentHash, string _documentStorageReference) {
    relationship[_doctor][_patient] = _documentHash;
    providersToPatients[_doctor].documentStorageReference.push(_documentStorageReference);
    AddRecord(_doctor, _patient, _documentHash);
    }

    // Doctor's request for lower insurance rates to provably show maching hashes
  function providerCheck (address _doctor, address _patient, string _providerHash) returns (bool success) {

        if (sha3(relationship[_doctor][_patient]) != sha3(_providerHash)) revert();
        ProviderCheck(_doctor, _patient, _providerHash);
        return true;
    }

    // READ FUNCTIONS

  function getPatientCount( address _provider ) constant returns (uint) {
    return providersToPatients[_provider].patientCount;
  }

  function getPatientAtIndex( address _provider, uint index ) constant returns (address){
    return providersToPatients[_provider].patients[index];
  }

  function getDocumentReferenceAtIndex(address _provider, uint index) constant returns (string) {
    return providersToPatients[_provider].documentStorageReference[index];
  }

  function getHash (address _doctor, address _patient) constant returns (string) {
    return relationship[_doctor][_patient];
  }

}
