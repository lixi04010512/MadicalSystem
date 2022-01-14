const web3 = new Web3(Web3.givenProvider);

var myContract = new web3.eth.Contract(abi, a);
var myContract1 = new web3.eth.Contract(abi1,b);

var HospitalAddress;
myContract.methods.getHospital().call().then(
    function(result){
      HospitalAddress=result;
    }
)

$("#confirmEnter").click(function(){
    var PatientAddress=$("#address").val();
    var name =$("#name").val();
    var number=$("#number").val();
    myContract.methods.EnterMedicine(PatientAddress,name,number).send({
         from:HospitalAddress,
         gasPrice: '100000000',
         gas: 1000000
    });
    
	window.location="./hospital.html";
 })
 