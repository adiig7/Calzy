import React from 'react';
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
]

const Calendar = () => {
  const saveAppointment = (data) => {
    console.log("Appointment saved");
    console.log(data);
  }
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