import React, { useState, useEffect } from "react";
import "./DatePicker.scss";
import Days from "./Days";
import Weeks from "./Weeks";
import Months from "./Months";
import Range from "./Range";
import DisplayDate from "./DisplayDate";
import Footer from "./Footer";
import { CalendarProvider } from "./calendarContext";
import {
  getCurrentYear,
  getCurrentMonth,
  getCurrentDay,
  normalizeDate,
  getCurrentDate,
  getCurrentMinite,
  getCurrentHour,
} from "./utils";

import jmoment from "moment-jalaali";

const DatePicker = (props) => {
  console.log("DatePicker 1");

  const preSelectedDay =
    props?.preSelected &&
    parseInt(
      jmoment(props?.preSelected, props?.format).format(
        props?.type === "jalali" ? "jD" : "D"
      )
    );

  const preSelectedMonth =
    props?.preSelected &&
    parseInt(
      jmoment(props?.preSelected, props?.format).format(
        props?.type === "jalali" ? "jM" : "M"
      )
    );

  const preSelectedYear =
    props?.preSelected &&
    parseInt(
      jmoment(props?.preSelected, props?.format).format(
        props?.type === "jalali" ? "jYYYY" : "YYYY"
      )
    );

  const preSelectedHour=
    props?.preSelected &&
    parseInt(
      jmoment(props?.preSelected, props?.format).format("HH")
    );
  
  const preSelectedMinute=
    props?.preSelected &&
    parseInt(
      jmoment(props?.preSelected, props?.format).format("mm")
    );

  const currentDay = getCurrentDay(props?.type);
  const currentMonth = getCurrentMonth(props?.type);
  const currentYear = getCurrentYear(props?.type);
  const currentDate = getCurrentDate(props?.type);

  const currentHour= getCurrentHour();
  const currentMinute= getCurrentMinite();

  const day = preSelectedDay ? preSelectedDay : currentDay;
  const month = preSelectedMonth ? preSelectedMonth : currentMonth;
  const year = preSelectedYear ? preSelectedYear : currentYear;

  const hour=preSelectedHour ? preSelectedHour : currentHour;
  const minute = preSelectedMinute ? preSelectedMinute : currentMinute;

  return (
    <CalendarProvider
      values={{
        preSelected: props.preSelected,
        selectedDay: day,
        selectedMonth: month,
        selectedYear: year,
        timePicker: !!props.timePicker,
        selectedMinute : minute,
        selectedHour : hour,
        selectedDate: {
          minute:minute,
          fromMinute:minute,
          toMinute:minute,
          hour:hour,
          fromHour:hour,
          toHour:hour,
          day: day,
          month: month,
          year: year,
          date: normalizeDate(year, month, day),

        },
        format: props.format,
        type: props.type,
        disableDate: props.disableDate
          ? {
              start: props.disableDate?.start,
              end: props.disableDate?.end,
            }
          : null,
        rangePicker: props.rangePicker,
        currentDay,
        currentMonth,
        currentYear,
        currentDate,
      }}
    >
      <div className={["calendar", props?.type].join(" ")}>
        {/* show month of year and next or back handling */}
        <Months />
        {/* range date */}
        <Range />
        {/* week names : ش - ی - د - س - چ - پ - ج */}
        <Weeks />
        {/* days of month : 1, ..., (30 || 31) */}
        <Days />
        {/* go today button */}
        <Footer />
        {/* display selected date */}
        <DisplayDate />
      </div>
    </CalendarProvider>
  );
};

DatePicker.propTypes = {};

export default DatePicker;
