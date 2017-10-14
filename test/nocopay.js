var NoCoPay = artifacts.require("./NoCoPay.sol");

contract("NoCoPay", function(accounts){
  
  it("should add a doctor in the registry", function(){

    var registry;

    return NoCoPay.deployed().then( function(instance){

      registry = instance;

      var account_one = accounts[0];
      var name = "Michael Nolivos";
      var specialty = "chiropractor";

      return instance.register( account_one, name, specialty );
    }).then( function(){

      return registry.numRecords.call()

    }).then( function( count ){

      assert.equal( count, 1 )
    })

  })
})