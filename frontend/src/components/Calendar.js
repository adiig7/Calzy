import React from 'react';
import { useState, useEffect } from 'react';
import abi from "../abis/Calzy.json";

import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from "@devexpress/dx-react-scheduler";

import {
  Scheduler,
  WeekView,
  Appointments,
  AppointmentForm,
} from "@devexpress/dx-react-scheduler-material-ui";
import { ethers } from 'hardhat';

const schedulerData = [
  {
    startDate: '2022-07-18T09:45',
    endDate: '2022-07-18T10:45',
    title: 'Meeting with Dhrumi'
  },
  {
    startDate: '2022-07-19T09:45',
    endDate: '2022-07-19T10:45',
    title: 'Meeting with Dhrumi'
  }
];

const saveAppointment = (data) => {
  console.log("Appointment saved");
  console.log(data);
}

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const contractABI = abi.abi;
const provider = new ethers.providers.Web3Provider(window.ethereum);
const contract = new ethers.providers.Web3Provider(contractAddress, contractABI);
const Calendar = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [rate, setRate] = useState();

  // const getData =async () => {
  //   const rate = await contract.getRate();
  //   console.log(rate);
  // }

  // useEffect(() => {
  //   getData();
  // }, []);
  return (
    <div id="calendar">
      <Scheduler data={schedulerData}>
        <ViewState />
        <EditingState onCommitChanges={saveAppointment}/>
        <IntegratedEditing />
        <WeekView startDayHour={9} endDayHour={19} />
        <Appointments />
        <AppointmentForm />
      </Scheduler>
    </div>
  )
}

export default Calendar