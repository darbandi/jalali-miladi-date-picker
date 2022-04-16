import React from "react";
import { useCalendarState, useCalendarDispatch } from "./calendarContext";
import { normalizeDate } from "./utils";
import Layout from "./Layout";
import jmoment from "moment-jalaali";

const Footer = () => {
  console.log("Range 6");
  const calendarState = useCalendarState();
  const calendarDispatch = useCalendarDispatch();

  const goToday = () => {
    calendarDispatch({
      type: "setSelectedMonth",
      value: +calendarState?.currentMonth,
    });
    calendarDispatch({
      type: "setSelectedYear",
      value: +calendarState?.currentYear,
    });
    calendarDispatch({
      type: "setSelectedDay",
      value: +calendarState?.currentDay,
    });
    calendarDispatch({
      type: "setSelectedDate",
      value: {
        ...calendarState.selectedDate,
        date: normalizeDate(
          calendarState?.currentYear,
          calendarState?.currentMonth,
          calendarState?.currentDay
        ),
        day: calendarState?.currentDay,
        month: calendarState?.currentMonth,
        year: calendarState?.currentYear,
      },
    });
  };

  const changeType = () => {
    const format =
      calendarState?.type === "jalali" ? "YYYY-MM-DD" : "jYYYY-jMM-jDD";
    const originFormat =
      calendarState?.type === "jalali" ? "jYYYY-jMM-jDD" : "YYYY-MM-DD";
    const dayFormat = calendarState?.type === "jalali" ? "D" : "jD";
    const monthFormat = calendarState?.type === "jalali" ? "M" : "jM";
    const yearFormat = calendarState?.type === "jalali" ? "YYYY" : "jYYYY";

    let date = normalizeDate(
      calendarState?.selectedDate?.year,
      calendarState?.selectedDate?.month,
      calendarState?.selectedDate?.day,
      format,
      calendarState?.type
    );

    let currentDate = normalizeDate(
      calendarState?.currentYear,
      calendarState?.currentMonth,
      calendarState?.currentDay,
      format,
      calendarState?.type
    );

    const day = jmoment(date, format).format(dayFormat);
    const month = jmoment(date, format).format(monthFormat);
    const year = jmoment(date, format).format(yearFormat);

    const currentDay = jmoment(currentDate, format).format(dayFormat);
    const currentMonth = jmoment(currentDate, format).format(monthFormat);
    const currentYear = jmoment(currentDate, format).format(yearFormat);

    const from = jmoment(
      calendarState?.selectedDate?.from,
      originFormat
    ).format(format);
    const to = jmoment(calendarState?.selectedDate?.to, originFormat).format(
      format
    );

    calendarDispatch({
      type: "setSelectedDay",
      value: +day,
    });

    calendarDispatch({
      type: "setSelectedMonth",
      value: +month,
    });
    calendarDispatch({
      type: "setSelectedYear",
      value: +year,
    });

    calendarDispatch({
      type: "setSelectedDate",
      value: {
        ...calendarState.selectedDate,
        day,
        month,
        year,
        date: date,
        from,
        to,
      },
    });

    calendarDispatch({
      type: "setCurrentDay",
      value: currentDay,
    });

    calendarDispatch({
      type: "setCurrentMonth",
      value: currentMonth,
    });
    calendarDispatch({
      type: "setCurrentYear",
      value: currentYear,
    });

    calendarDispatch({
      type: "setCurrentDate",
      value: currentDate,
    });

    calendarDispatch({
      type: "setType",
      value: calendarState?.type === "jalali" ? "miladi" : "jalali",
    });
  };

  return (
    <Layout>
      <div className="footer-section">
        <span className="today" onClick={goToday}>
          {calendarState?.type === "jalali" ? "امروز" : "today"}
        </span>

        <span onClick={changeType} className="type">
          {calendarState?.type === "jalali"
            ? "Gregorian"
            : "جلالی"}
        </span>
      </div>
    </Layout>
  );
};
export default Footer;
