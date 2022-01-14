const web3 = new Web3(Web3.givenProvider);

var myContract = new web3.eth.Contract(abi, a);
var myContract1 = new web3.eth.Contract(abi1,b);

var HospitalAddress;
myContract.methods.getHospital().call().then(
    function(result){
      HospitalAddress=result;
    }
)

$("#confirmAdd").click(function(){
	var medicine=$("#name").val();
	var price =$("#price").val();
	var amount=$("#amount").val();
	myContract.methods.addMedicine(medicine,price,amount).send({
		from:HospitalAddress,
	    gasPrice: '100000000',
	    gas: 1000000
	});
    window.location="./hospital.html";
})