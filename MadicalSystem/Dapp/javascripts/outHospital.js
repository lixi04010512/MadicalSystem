const web3 = new Web3(Web3.givenProvider);

var myContract = new web3.eth.Contract(abi, a);
var myContract1 = new web3.eth.Contract(abi1,b);

var HospitalAddress;
myContract.methods.getHospital().call().then(
    function(result){
      HospitalAddress=result;
    }
)

$("#confirmOut").click(function(){
   var address =$("#address").val();
   var symptom =$("#symptom").val();
   var cause =$("#cause").val();
   var day =$("#day").val();
   myContract.methods.insRecord(address,symptom,cause,day).send({
      from:HospitalAddress,
      gasPrice:'100000000',
      gas:1000000
   })
   window.location="./hospital.html";
})