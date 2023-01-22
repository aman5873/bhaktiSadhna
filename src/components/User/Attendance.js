import React, { useState, useEffect } from "react";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./css/attendance.css";

import { COLORS, FONTS } from "constants/theme";
import AppButton from "components/AppButton";

import { getAttendance, markTodayAttendance } from "./user_api/userFunctions";

export function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();
  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  return [year, month, day].join("-");
}

function Attendance() {
  const [date, setDate] = useState(new Date());
  const [attendanceObj, setAttendanceObj] = useState(null);

  const currentDate = new Date().toISOString().slice(0, 10);

  function getAttendanceData(date) {
    const data = {
      date: formatDate(date),
      punch_status: "",
    };
    getAttendance(data).then((res) => {
      if (res.status) {
        setAttendanceObj(res.data);
      } else {
        setAttendanceObj(null);
        window.alert(res.message);
      }
    });
  }

  function onClickMarkAttendance(date) {
    const data = {
      date: formatDate(date),
      punch_status: true,
    };
    markTodayAttendance(data).then((res) => {
      if (res.status) {
        setAttendanceObj(res.data);
      }
    });
  }
  useEffect(() => {
    getAttendanceData(date);
  }, [date]);

  console.log(attendanceObj);

  return (
    <div className="attendance-container">
      <h1 className="text-center">Attendance</h1>
      <div className="calendar-container">
        <Calendar onChange={setDate} value={date} />
      </div>

      {attendanceObj && (
        <div className="attendance-card">
          <p className="attendance-card-row">
            <span>Date</span> <span>:</span>
            <span>
              {date.toDateString().substring(3, date.toDateString().length)}
            </span>
          </p>
          <p className="attendance-card-row">
            <span>Attendance</span> <span>:</span>
            {attendanceObj.attendence_status === "P" ? (
              <span style={{ color: COLORS.greenThree }}>Present</span>
            ) : (
              <span style={{ color: COLORS.error }}>Abscent</span>
            )}
          </p>
          {formatDate(date) === currentDate &&
            attendanceObj.attendence_status === "A" && (
              <AppButton
                //   type={"outline"}
                label={"Mark Attendance"}
                style={{ width: "70%", height: "40px", margin: "auto" }}
                onClick={() => {
                  onClickMarkAttendance(date);
                }}
              />
            )}
        </div>
      )}
    </div>
  );
}

export default Attendance;
