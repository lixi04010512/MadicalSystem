//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract InsuranceContract_lixi{

 //医院EOA
 address private hospital_lixi;
 
 //保险公司EOA
 address private insuranceCorp_lixi;
 
 //病历信息
 struct MedicalRecord_lixi {
  string symptom;	//症状
  string cause;		//病因
  uint day;		    //住院天数
  uint money;		//住院花费
  bool exist;     
 }
 
 //病人信息
 struct Patient_lixi {
  string name;	    //姓名
  string addr;	    //家庭地址
  uint recordCnt;   //病历总量
  mapping(uint => MedicalRecord_lixi) records; //病历
  string[] medicineName; //药名
  uint[] medicinePrice;//药钱
  bool exist;
  bool buy;//保险
  bool pay;//缴费
  bool claim;//理赔
 }
 //药的信息
 struct Medicine_lixi{
     string medicineName;
     uint medicinePrice;
     uint amount;
     bool exist;
 }
 
 //存储所有病人基本信息
 mapping(address => Patient_lixi) private patientData_lixi;
 
 //药的信息
 mapping(string => Medicine_lixi) private medicineData_lixi;

 
 //记录合约主持人(保险公司)
 constructor (address _insurance)  {
     insuranceCorp_lixi=_insurance;
 }
 
 //只有保险公司才可执行 
 modifier onlyInsuranceCorp_lixi() {
   require(msg.sender == insuranceCorp_lixi,
   "only insuranceCorp can do this");
    _;
 }
 
 //只有医院才可执行 
 modifier onlyHospital_lixi() {
   require(msg.sender == hospital_lixi,
   "only hospital can do this");
    _;
 }
  
 //只有医院和保险公司才可执行 
 modifier onlyHospitalAndInsuranceCorp_lixi() {
   require(msg.sender == hospital_lixi || msg.sender == insuranceCorp_lixi,
   "only hospital and insuranceCorp can do this");
    _;
 }

 //设置医院EOA
 function setHospital(address _hospital) public onlyInsuranceCorp_lixi {
  hospital_lixi = _hospital;
 }

//查询保险公司地址
function getInsurance() public view returns(address){
    return insuranceCorp_lixi;
}

 //查询医院地址  
 function getHospital() public view returns(address) {
  return hospital_lixi;
 }
 

 //添加一笔病人信息
 function insPatient(address patientAddr, string memory name,string memory addr) public onlyHospital_lixi {
  require(!isPatientExist(patientAddr), "patient data already exist");
		 
   patientData_lixi[patientAddr].name = name; 
   patientData_lixi[patientAddr].addr = addr;
   patientData_lixi[patientAddr].recordCnt = 0;
   patientData_lixi[patientAddr].exist = true;
   
   emit InsPatientEvnt("insPatient", patientAddr);
 }
 
 //查询病人信息是否存在
 function isPatientExist(address patientAddr) public view returns(bool) {
   return patientData_lixi[patientAddr].exist;
 }
 
 //查询病人的姓名
 function searchPatient(address addr) public view returns(string memory name){
    return patientData_lixi[addr].name;
 }


 //查询病人的离院信息
 function searchOutPatient(address addr,uint index) public view returns
    (string memory symptom,string memory casue,uint day,uint money,bool,bool){
    return(patientData_lixi[addr].records[index].symptom,patientData_lixi[addr].records[index].cause,
    patientData_lixi[addr].records[index].day,patientData_lixi[addr].records[index].money,
    patientData_lixi[addr].pay,patientData_lixi[addr].claim);
 }

 //添加病人事件
 event InsPatientEvnt(string indexed eventType, address patientAddr);
 
 //添加一笔离院申请
 function insRecord(address patientAddr, string memory symptom, string memory cause, uint day) public onlyHospital_lixi returns(uint){
   require(isPatientExist(patientAddr), 
		 "patient data not exist");
   
   //病历序号加1   
   patientData_lixi[patientAddr].recordCnt+=1;
   uint inx = patientData_lixi[patientAddr].recordCnt;
   
   //计算费用
   uint money=day*10**5;
   for(uint i=0;i<patientData_lixi[patientAddr].medicinePrice.length;i++){
       money +=patientData_lixi[patientAddr].medicinePrice[i]*10**5;
   }
   

   //新离院信息
   MedicalRecord_lixi memory record = MedicalRecord_lixi({
	 symptom: symptom,	//症状
	 cause: cause,		//病因
	 day: day,			//住院天数
	 money: money,		//住院花费	 
	 exist: true		//确认信息存在
   });
	
   //添加病历到病人记录中
   patientData_lixi[patientAddr].records[inx] = record;
	
   //触发离院事件
   emit InsRecordEvnt("insRecord", patientAddr, inx, day, money);
   
   //返回病历序号
   return inx; 
 }
 
 //离院申请事件
 event InsRecordEvnt(string indexed eventType, address patientAddr, uint recordID, uint day, uint money);
 

 //查询离院申请信息——病因
 function queryRecordCause(address patientAddr, uint recordID) public onlyHospitalAndInsuranceCorp_lixi view returns(string memory){
   require(isPatientExist(patientAddr), 
		 "patient data not exist");

   require(patientData_lixi[patientAddr].records[recordID].exist, 
		 "medical record not exist");
   	
   return patientData_lixi[patientAddr].records[recordID].symptom;
 }
 
 //查询离院申请信息——住院天数
 function queryRecordDays(address patientAddr, uint recordID) public onlyHospitalAndInsuranceCorp_lixi view returns(uint){
   require(isPatientExist(patientAddr), 
		 "patient data not exist");

   require(patientData_lixi[patientAddr].records[recordID].exist, 
		 "medical record not exist");
   	
   return patientData_lixi[patientAddr].records[recordID].day;
 }
 

 //查询离院申请信息——住院费用
 function queryRecordMoney(address patientAddr, uint recordID) public onlyHospitalAndInsuranceCorp_lixi view returns(uint){
   require(isPatientExist(patientAddr), 
		 "patient data not exist");

   require(patientData_lixi[patientAddr].records[recordID].exist, 
		 "medical record not exist");
   	
   return patientData_lixi[patientAddr].records[recordID].money;
 }
 

 //添加医院的药库存
 function addMedicine(string memory medicineName,uint medicinePrice,uint amount) public onlyHospital_lixi{
     medicineData_lixi[medicineName].medicineName=medicineName;
     medicineData_lixi[medicineName].medicinePrice=medicinePrice;
     medicineData_lixi[medicineName].amount=amount;
     medicineData_lixi[medicineName].exist=true;
 }
 
 //医生开药

 function EnterMedicine(address patientAddr,string memory name,uint number) public onlyHospital_lixi {
      require(isPatientExist(patientAddr), "patient data not exist");
      require(medicineData_lixi[name].exist == true);
      require(medicineData_lixi[name].amount>=number);
      medicineData_lixi[name].amount=medicineData_lixi[name].amount-number;
      patientData_lixi[patientAddr].medicineName.push(name);
      patientData_lixi[patientAddr].medicinePrice.push(medicineData_lixi[name].medicinePrice *number*10**5);
      
 }

  //查询药的库存
 function searchMedicine(string memory name) public view returns(uint number){
    number=medicineData_lixi[name].amount;
    return number;
 }
 
 //查询医生开的药
 function GiveMedicine(address patientAddr) public view  returns(string[] memory,uint[]memory) {
    require(isPatientExist(patientAddr), "patient data not exist");
    return (patientData_lixi[patientAddr].medicineName,patientData_lixi[patientAddr].medicinePrice);
 }
 

 //购买理赔保险
 function BuyInsurance(address addr) public {
     
     patientData_lixi[addr].buy =true;
 }

 //查看是否买了保险
 function searchInsurance(address addr) public view returns (bool){
    if (patientData_lixi[addr].buy == true){
      return true;
    }else{
    return false;
    }
 }

 //缴费
 function Paymoney(address addr) public {
    patientData_lixi[addr].pay=true;
 }

 //保险公司理赔60%
 function claim(address addr,uint record) public view onlyInsuranceCorp_lixi returns(uint money){
   require(patientData_lixi[addr].buy == true);
    money = patientData_lixi[addr].records[record].money*6/10*10*53;
    return money;
  }

 //保险公司理赔
 function backMoney(address addr) public onlyInsuranceCorp_lixi{
   patientData_lixi[addr].claim=true;
 }
  
}
