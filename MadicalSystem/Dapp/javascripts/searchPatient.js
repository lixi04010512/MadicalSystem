const web3 = new Web3(Web3.givenProvider);

var myContract = new web3.eth.Contract(abi, a);
var myContract1 = new web3.eth.Contract(abi1,b);

$("#confirm").click(function(){
    var addr =$("#addr").val();
    var record =$("#record").val();
    myContract.methods.searchPatient(addr).call().then(
		function(result){
			$("#name").html(result);
		}
	);
	$("#address").html(addr);
	myContract.methods.GiveMedicine(addr).call().then(
		function(result){
			$("#resultMedicine").html(Array.from(new Set(result[0])).toString());
		}
	);
    myContract.methods.queryRecordCause(addr,record).call().then(
        function(result){
          $("#symptom").html(result);
        }
    );
    myContract.methods.queryRecordDays(addr,record).call().then(
        function(result){
          $("#day").html(result);
        }
    );
    myContract.methods.queryRecordMoney(addr,record).call().then(
        function(result){
         $("#money").html(result);
        }
    );
    myContract.methods.searchOutPatient(addr,record).call().then(
		function(result){
      if(result[4] ==true){
        $("#payMoney").html("是");
      }else{
        $("#payMoney").html("否");
      }
		}
	)
 })