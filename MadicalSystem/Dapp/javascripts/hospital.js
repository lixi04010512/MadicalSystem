const web3 = new Web3(Web3.givenProvider);

var myContract = new web3.eth.Contract(abi, a);
var myContract1 = new web3.eth.Contract(abi1,b);

//获取医院地址
var HospitalAddress;
myContract.methods.getHospital().call().then(
    function(result){
      HospitalAddress=result;
	  $("#hospital_address").html(result);
    }
)
