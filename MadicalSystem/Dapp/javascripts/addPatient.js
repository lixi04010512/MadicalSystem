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
    var name=$("#name").val();
    var PatientAddress=$("#address").val();
    var addr=$("#addr").val();
    myContract.methods.insPatient(PatientAddress,name,addr).send({
              from:HospitalAddress,
              gasPrice: '100000000',
              gas: 1000000
          });
	window.location="./hospital.html";
  })