const hospital = artifacts.require("InsuranceContract_lixi");

module.exports =function(deployer,network,accounts){
    deployer.deploy(hospital,'0x95d87f7FE4E710A04D2149B374AD65324ED132fb');
}