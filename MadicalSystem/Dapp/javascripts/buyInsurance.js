const web3 = new Web3(Web3.givenProvider);

var myContract = new web3.eth.Contract(abi, a);
var myContract1 = new web3.eth.Contract(abi1,b);

//获取保险公司地址
var insurance_address;
	myContract.methods.getInsurance().call().then(
		function(result){
			insurance_address=result;
   }
)

//确认购买保险理赔
$("#confirmAdd").click(function(){
	var addr =$("#addr").val();
	myContract.methods.BuyInsurance(addr).send({
		from:addr,
	    gasPrice: '100000000',
	    gas: 1000000
	});
    myContract1.methods.transfer(insurance_address,100000000).send({
        from:addr,
        gasPrice: '100000000',
        gas: 1000000
    });
    window.location="./insurance.html";
})