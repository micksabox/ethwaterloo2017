import { Connect } from 'uport-connect'

export let uport = new Connect('TruffleBox')
export const web3 = uport.getWeb3()

import ABI from './contract_abi.json'

export const DEPLOYED_ADDRESS = '0xd55d0c9c881d007b5bb7497a91a10f0ae7b9a1a2'

export const getDoctorCount = ( callback ) => {

  var HealthcareContract = web3.eth.contract(ABI); 
  var healthcareInstance = HealthcareContract.at( DEPLOYED_ADDRESS );
  
  var doctorCount = healthcareInstance.numRecords( function(e, r){
    
    callback(  r.c[0] )
  } )
}

export const createSignature = ({ 
  patientPublicKey, 
  providerPublicKey, 
  dataHash, 
  dataFileReference
  }, callback ) => {

    console.log(patientPublicKey, providerPublicKey, dataHash, dataFileReference);
  var HealthcareContract = web3.eth.contract(ABI); 
  var healthcareInstance = HealthcareContract.at( DEPLOYED_ADDRESS );

  var transaction = healthcareInstance.addRecord( providerPublicKey, patientPublicKey, dataHash, dataFileReference, (e,r) => {
    
    callback( r )
  })
}

export const getDoctorAtIndex = ( index, callback ) => {
  var HealthcareContract = web3.eth.contract(ABI); 
  var healthcareInstance = HealthcareContract.at( DEPLOYED_ADDRESS );
  
  var doctors = healthcareInstance.getRecordAtIndex.call( index, function(e, r){
    console.log(r)

    callback(r)
  } )

}

export const addProvider = ( options, callback ) => {

  var HealthcareContract = web3.eth.contract(ABI); 
  var healthcareInstance = HealthcareContract.at( DEPLOYED_ADDRESS );

  healthcareInstance.register( options['address'], options['name'], options['specialty'], function(e, r){
    console.log("register", e, r)
  })
}

export const getPatientCountForDoctor = ( doctorAddress, callback ) => {
  var HealthcareContract = web3.eth.contract(ABI); 
  var healthcareInstance = HealthcareContract.at( DEPLOYED_ADDRESS );
  
  var patientCount = healthcareInstance.getPatientCount( doctorAddress, function(e, r){

    console.log("getPatientCount", e, r);
  })
  
}
