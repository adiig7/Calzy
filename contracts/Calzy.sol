//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.10;

contract Calzy{
    uint rate;
    address owner;

    struct Appointment{
        string title;
        address attendee;
        uint startTime;
        uint endTime;
        uint amountPaid;
    }

    Appointment[] appointments;

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

    function getAppointments() public view returns (Appointment[] memory){
        return appointments;
    }

    function addAppointment(string memory title, uint startTime, uint endTime) public{
        Appointment memory appointment;
        appointment.title = title;
        appointment.startTime = startTime;
        appointment.endTime = endTime;
        appointment.amountPaid = ((endTime-startTime)/60)*rate;

        appointments.push(appointment);
    }
}