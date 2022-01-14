const web3 = new Web3(Web3.givenProvider);

var myContract = new web3.eth.Contract(abi, a);
var myContract1 = new web3.eth.Contract(abi1,b);


//获取保险公司地址
var insurance_address;
	myContract.methods.getInsurance().call().then(
		function(result){
			insurance_address=result;
           $("#insurance_addesss").html(result);
		}
)

//保险公司设置医院地址
$("#set").click(function(){
	var HospitalAddress=$("#address").val();
	myContract.methods.setHospital(HospitalAddress).send({
		 from:insurance_address,
		 gasPrice:'100000000',
		 gas:1000000
	});
	window.location="./insurance.html";
})

