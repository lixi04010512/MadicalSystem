const web3 = new Web3(Web3.givenProvider);

var myContract = new web3.eth.Contract(abi, a);
var myContract1 = new web3.eth.Contract(abi1,b);

var HospitalAddress;
myContract.methods.getHospital().call().then(
    function(result){
      HospitalAddress=result;
    }
)

//缴费
var money;
$("#confirmEnter").click(function(){
	var addr=$("#addr").val();
	var record =$("#record").val();
	myContract.methods.searchOutPatient(addr,record).call().then(
		function(result){
		money=result[3];
	});
	myContract1.methods.transfer(HospitalAddress,money).send({
	   from:addr,
	   gasPrice: '100000000',
	   gas: 1000000
	});
	myContract.methods.Paymoney(addr).send({
	 from:addr,
	 gasPrice: '100000000',
	 gas: 1000000
	});
    window.location="./patientPage.html";
})