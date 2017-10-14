pragma solidity ^0.4.11;

import "./BaseRegistry";

contract NoCoPay is BaseRegistry {

  mapping (address => mapping (address => string)) public relationship;

  function NoCoPay() {
    // constructor
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
