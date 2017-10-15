var NoCoPay = artifacts.require('NoCoPay')
var BaseRegistry = artifacts.require('BaseRegistry')
// var StringUtils = artifacts.require('StringUtils')

module.exports = function(deployer) {
deployer.deploy(BaseRegistry)
// deployer.deploy(StringUtils)
deployer.deploy(NoCoPay)
deployer.link(BaseRegistry,NoCoPay)

};
