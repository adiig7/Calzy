//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.10;

contract Calzy{
    uint rate;
    address owner;

    constructor(){
        owner = msg.sender;
    }

    function getRate() public view returns(uint){
        return rate;
    }

    function setRate(uint _rate) public{
        require(msg.sender == owner, "You are not the owner!");
        rate = _rate;
    }
}