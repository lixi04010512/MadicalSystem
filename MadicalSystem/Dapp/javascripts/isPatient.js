const web3 = new Web3(Web3.givenProvider);

var myContract = new web3.eth.Contract(abi, a);
var myContract1 = new web3.eth.Contract(abi1,b);


//获取医院地址
var HospitalAddress;
myContract.methods.getHospital().call().then(
    function(result){
      HospitalAddress=result;
	
    }
)

//查看患者是否存在
$("#confirmEnter").click(function(){
  var searchAddress =$("#address").val();
  myContract.methods.isPatientExist(searchAddress).call().then(
    function(result){
        if(result ==true){
            alert("该患者存在！");
        }else{
            alert("该患者不存在！")
        }
    }
  );
  $("#address").val("");
})	