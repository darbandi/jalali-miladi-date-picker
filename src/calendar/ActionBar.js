import React from "react";
import { useCalendarState, useCalendarDispatch } from "./calendarContext";
import { getMonthNames, getActionBarTitles } from "./utils";

const ActionBar = (props) => {
  console.log("ActionBar 7");
  const { year = false, setMonthListVisible, setYearListVisible } = props;
  const calendarState = useCalendarState();
  const calendarDispatch = useCalendarDispatch();

  /**
   * ماه قبل
   */
  const backMonth = () => {
    const num = calendarState?.selectedMonth - 1;
    if (num < 1) {
      calendarDispatch({
        type: "setSelectedMonth",
        value: 12,
      });
      calendarDispatch({
        type: "setSelectedYear",
        value: calendarState?.selectedYear - 1,
      });
    } else {
      calendarDispatch({
        type: "setSelectedMonth",
        value: num,
      });
    }
  };

  /**
   * ماه بعد
   */
  const nextMonth = () => {    
    const num = calendarState?.selectedMonth + 1;
    if (num > 12) {
      calendarDispatch({
        type: "setSelectedMonth",
        value: 1,
      });
      calendarDispatch({
        type: "setSelectedYear",
        value: calendarState?.selectedYear + 1,
      });
    } else {
      calendarDispatch({
        type: "setSelectedMonth",
        value: num,
      });
    }
  };

  return (
    <>
      <div
        className="back"
        onClick={
          year
            ? () => {
                calendarDispatch({
                  type: "setSelectedYear",
                  value: calendarState?.selectedYear - 1,
                });
              }
            : backMonth
        }
      >
        {getActionBarTitles(year, calendarState?.type).back}
      </div>
      <div className="month-text">
        <span
          onClick={() => {
            setMonthListVisible(true);
            setYearListVisible(false);
          }}
        >
          {getMonthNames(calendarState?.selectedMonth - 1, calendarState?.type)}
        </span>{" "}
        <span
          onClick={() => {
            setMonthListVisible(false);
            setYearListVisible(true);
          }}
        >
          {calendarState?.selectedYear}
        </span>
      </div>
      <div
        className="next"
        onClick={
          year
            ? () => {
                calendarDispatch({
                  type: "setSelectedYear",
                  value: calendarState?.selectedYear + 1,
                });
              }
            : nextMonth
        }
      >
        {getActionBarTitles(year, calendarState?.type).next}
      </div>
    </>
  );
};
export default ActionBar;
