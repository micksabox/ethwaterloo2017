var NoCoPay = artifacts.require('NoCoPay')
var BaseRegistry = artifacts.require('BaseRegistry')

module.exports = function(deployer) {
deployer.deploy(BaseRegistry)
deployer.deploy(NoCoPay)
deployer.link(BaseRegistry,NoCoPay)
};
