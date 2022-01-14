const web3 = new Web3(Web3.givenProvider);

var myContract = new web3.eth.Contract(abi, a);
var myContract1 = new web3.eth.Contract(abi1,b);

//获取医院地址
var HospitalAddress;
myContract.methods.getHospital().call().then(
    function(result){
      HospitalAddress=result;
	  $("#search-hospital").html(result);
    }
)

var addrPatient;
$("#signUp").click(function(){
	var addressPatient=$("#addressPatient").val();
	addrPatient=addressPatient;
	myContract.methods.searchPatient(addrPatient).call().then(
		function(result){
			$("#name").html(result);
		}
	);
	$("#addr").html(addrPatient);
	$("#Patientaddress").html(addrPatient);
	myContract.methods.searchInsurance(addrPatient).call().then(
		function(result){
			if(result ==true){
				$("#whetherBuy").html("是");
			}else{
				$("#whetherBuy").html("否");
			}
		}
	);
	myContract.methods.GiveMedicine(addrPatient).call().then(
		function(result){
		    $("#resultMedicine").html(Array.from(new Set(result[0])).toString());
		}
	);
})

$("#search").click(function(){
	var record =$("#record").val();
	myContract.methods.searchOutPatient(addrPatient,record).call().then(
		function(result){
			$("#symptom").html(result[0]);
			$("#cause").html(result[1]);
			$("#day").html(result[2]);
			$("#money").html(result[3]);
			if(result[4] ==true){
				$("#payMoney").html("是");
			}else{
				$("#payMoney").html("否");
			}
			if(result[5] ==true){
				$("#claim").html("是");
			}else{
				$("#claim").html("否");
			}
		}
	);
})


