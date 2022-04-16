import React from "react";
import { useCalendarState } from "./calendarContext";

const DisplayDate = () => {
  console.log("DisplayDate 5");
  const calendarState = useCalendarState();
  return (
    <>
      <h1 style={{ color: "black" }}>{calendarState?.selectedDate?.date}</h1>
    </>
  );
};

export default DisplayDate;
