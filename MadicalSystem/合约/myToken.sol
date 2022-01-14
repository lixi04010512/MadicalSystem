
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

 

 import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";     //<-能科学上网的用这个

 //import "http://47.99.87.207:8080/token/ERC20/ERC20.sol";     //<-不能科学上网的用这个

contract MyToken is ERC20 {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
       
        _mint(msg.sender, 100 * 10**uint(decimals()));
    }
   
}