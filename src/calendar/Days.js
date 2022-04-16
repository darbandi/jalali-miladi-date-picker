import React, { useState, useEffect } from "react";
import jmoment from "moment-jalaali";
import { isUndefined, isEqual } from "lodash";
import { getAllDaysInCurrentMonth, normalizeDate, normalizeTime } from "./utils";
import { useCalendarState, useCalendarDispatch } from "./calendarContext";
import Layout from "./Layout";

const Days = () => {
  console.log("Days 3");

  const calendarState = useCalendarState();
  const calendarDispatch = useCalendarDispatch();

  const [selectedStartDate, setSelectedStartDate] = useState();
  const [selectedEndDate, setSelectedEndDate] = useState();
  const [allDaysInCurrentMonth, setAllDaysInCurrentMonth] = useState([]);

  /**
   * اگر در تغییر میلادی و شمسی رنج انتخاب شده بود مجددا اعمال گردد
   */
  useEffect(() => {
    if (!isEqual(calendarState?.selectedDate?.to, selectedEndDate)) {
      setSelectedStartDate(calendarState?.selectedDate?.from);
      setSelectedEndDate(calendarState?.selectedDate?.to);
    }
  }, [calendarState?.selectedDate?.to]);

  /**
   * آخرین روز غیر فعال
   */
  const disableStartDate =
    calendarState?.disableDate &&
    jmoment(calendarState?.disableDate?.start, calendarState?.format).format(
      calendarState?.type === "jalali" ? "jYYYY-jMM-jDD" : "YYYY-MM-DD"
    );

  /**
   * اولین روز غیر فعال
   */
  const disableEndDate =
    calendarState?.disableDate &&
    jmoment(calendarState?.disableDate?.end, calendarState?.format).format(
      calendarState?.type === "jalali" ? "jYYYY-jMM-jDD" : "YYYY-MM-DD"
    );

  /**
   * دریافت لیست روزهای ماه و سال انتخاب شده
   */
  useEffect(() => {
    let days = getAllDaysInCurrentMonth(
      calendarState?.selectedYear,
      calendarState?.selectedMonth,
      calendarState?.type
    );

    setAllDaysInCurrentMonth(days);
  }, [calendarState?.selectedMonth, calendarState?.selectedYear]);

  /**
   * گلیگ گردن روی روزها
   * @param {*} value
   * @param {*} date
   */
  const handelDayClick = (value, date) => {
    if (disableStartDate < date) return;
    if (disableEndDate > date) return;
    if (calendarState?.rangePicker && selectedStartDate && selectedEndDate) {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
      return;
    } else if (calendarState?.rangePicker && selectedStartDate) {
      if (selectedStartDate > date) {
        setSelectedStartDate(date);
        setSelectedEndDate(selectedStartDate);
        return;
      }
      if (selectedStartDate === date) {
        if(calendarState?.timePicker){
          setSelectedEndDate(date);
        } else {
          setSelectedStartDate(null);
          setSelectedEndDate(null);
        }
        return;
      }
      if (date <= selectedStartDate) return;
      setSelectedEndDate(date);
      return;
    } else if (calendarState?.rangePicker && selectedEndDate) {
      setSelectedStartDate(date);
      return;
    } else if (
      calendarState?.rangePicker &&
      !selectedStartDate &&
      !selectedEndDate
    ) {
      setSelectedStartDate(date);
      return;
    }
    if (value > 0) {
      calendarDispatch({
        type: "setSelectedDay",
        value: value,
      });
      /**
       * وقتی روز انتخاب می‌شود
       * کل تاریخ خروجی تغییر کند
       */
      calendarDispatch({
        type: "setSelectedDate",
        value: {
          ...calendarState.selectedDate,
          date: normalizeDate(
            calendarState?.selectedYear,
            calendarState?.selectedMonth,
            value
          ),
          datetime:normalizeDate(
            calendarState?.selectedYear,
            calendarState?.selectedMonth,
            value
          )+" "+normalizeTime(calendarState?.selectedDate?.hour || calendarState?.selectedHour,calendarState?.selectedDate?.minute || calendarState?.selectedMinute),
          day: value,
          month: calendarState?.selectedMonth,
          year: calendarState?.selectedYear,
        },
      });
    }
  };

  /**
   * رنج پیکر
   * وقتی تاریخ انتها انتخاب شده باشد
   * کل تاریخ خروجی تغییر کند
   */
  useEffect(() => {
    if (!isUndefined(selectedEndDate)) {
      calendarDispatch({
        type: "setSelectedDate",
        value: {
          ...calendarState.selectedDate,
          from: selectedStartDate,
          to: selectedEndDate,
        },
      });
    }
  }, [selectedEndDate]);

  return (
    <Layout>
      <div className="days-section">
        {allDaysInCurrentMonth.map(({ id, value, date }) => (
          <span
            key={id}
            onClick={() => {
              handelDayClick(value, date);
            }}
            className={[
              "day",
              (selectedStartDate === undefined && calendarState?.selectedDate?.date === date) ? "select" : "",
              (selectedStartDate !== selectedEndDate && calendarState?.selectedDate?.date === date) ? "select" : "",
              calendarState?.currentDate === date ? "active" : "",
              value <= 0 ? "empty" : "",
              disableStartDate < date ? "disable-start" : "",
              disableEndDate > date ? "disable-end" : "",
              (selectedStartDate !== selectedEndDate && date === selectedStartDate) ? "select-start" : "",
              (selectedStartDate !== selectedEndDate && date === selectedEndDate) ? "select-end" : "",
              (date === selectedStartDate && date === selectedEndDate) ? "select" : "",
              calendarState?.type,
              date > selectedStartDate && date < selectedEndDate
                ? "select-between"
                : "",
            ]
              .join(" ")
              .replace(/\s\s+/g, " ")
              .trim()}
          >
            {value}
          </span>
        ))}
      </div>
    </Layout>
  );
};
export default Days;
