const hospital = artifacts.require("InsuranceContract_lixi");

contract('test', async accounts =>{

    it("医疗理赔系统测试",async() =>{
        console.log(accounts);
        var Insurance ='0x95d87f7FE4E710A04D2149B374AD65324ED132fb';
        var Hospital ='0x8bccBf348cd6d7E9c7aa7F9382DD68066ef69aD4';
        var Patient ='0x1884dFfCE31E391bAe92AeF43F5f0fD37A399fA0';
        let instance =await hospital.deployed();
        
        //查询保险公司
        let getInsurance=await instance.getInsurance();
        assert.equal(getInsurance,Insurance,"错误！");

        //设置医院
        await instance.setHospital(Hospital,{from:Insurance});
        
        //查询医院
        let getHospital =await instance.getHospital();
        assert.equal(getHospital,Hospital,"错误！");

        //购买保险
        await instance.BuyInsurance(Patient);

        //查询是否购买保险
        let searchInsurance=await instance.searchInsurance(Patient);
        assert.equal(searchInsurance,true,"错误！")

        //添加病人
        await instance.insPatient(Patient,'熙','南昌',{from:Hospital});

        //病人是否存在
        let isPatientExist=await instance.isPatientExist(Patient);
        assert.equal(isPatientExist,true,"错误！");

         //查询病人姓名
        let searchPatient=await instance.searchPatient(Patient);
        assert.equal(searchPatient,'熙',"错误！");

         //添加药库
        let price=2;
        let amount=20;
        await instance.addMedicine('小柴胡',price,amount,{from:Hospital});

        //医生开药
        let number=2;
        await instance.EnterMedicine(Patient,'小柴胡',number,{from:Hospital});

       // 查看药的库存
        let searchMedicine=await instance.searchMedicine("小柴胡",{from:Hospital});
        assert.equal(searchMedicine,amount-number,"错误！")

        //患者离院
        await instance.insRecord(Patient,'身体发热','着凉',2,{from:Hospital});

        //缴费
        await instance.Paymoney(Patient);

        //查询病因
        let queryRecordCause=await instance.queryRecordCause(Patient,1,{from:Hospital});
        assert.equal(queryRecordCause,'身体发热',"错误！")
        
        //查询住院天数
        let queryRecordDays =await instance.queryRecordDays(Patient,1,{from:Hospital});
        assert.equal(queryRecordDays,2,"错误！");

    });
})