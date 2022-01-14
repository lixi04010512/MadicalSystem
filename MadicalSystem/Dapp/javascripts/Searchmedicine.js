const web3 = new Web3(Web3.givenProvider);

var myContract = new web3.eth.Contract(abi, a);
var myContract1 = new web3.eth.Contract(abi1,b);

//获取医院地址
var HospitalAddress;
myContract.methods.getHospital().call().then(
    function(result){
      HospitalAddress=result;
	  $("#Hospitaladdress").html(result);
    }
)

//查询药的库存
$("#confirmOut").click(function(){
	var name=$("#name").val();
	myContract.methods.searchMedicine(name).call().then(
		function(result){
			alert(name+"剩余库存为"+result);
			$("#name").val("");
		}
	);
})