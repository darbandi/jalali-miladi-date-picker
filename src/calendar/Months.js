import React, { useState, useEffect, useRef } from "react";
import { monthNames, getYearsList} from "./utils";
import { useCalendarState, useCalendarDispatch } from "./calendarContext";
import ActionBar from "./ActionBar";
import Layout from "./Layout";

const Months = () => {
  console.log("Months 2");

  const calendarState = useCalendarState();
  const calendarDispatch = useCalendarDispatch();

  const yearListRef = useRef(null);
  const yearRef = useRef(null);

  const [monthListVisible, setMonthListVisible] = useState(false);
  const [yearListVisible, setYearListVisible] = useState(false);

  const yearsList = getYearsList(calendarState?.type);
  /**
   * اسکرول کردن به سال جاری
   */
  useEffect(() => {
    if (yearListVisible) {
      yearListRef.current.scrollTo(0, yearRef.current.offsetTop - 100);
    }
  }, [yearListVisible, calendarState?.selectedYear]);

  return (
    <Layout>
      <div className="month-section">
        <ActionBar
          year={false}
          setMonthListVisible={setMonthListVisible}
          setYearListVisible={setYearListVisible}
        />
        {monthListVisible && !yearListVisible && (
          <div className="month-list">
            <div className="month-section">
              <ActionBar
                year={false}
                setMonthListVisible={setMonthListVisible}
                setYearListVisible={setYearListVisible}
              />
            </div>
            <ul>
              {monthNames?.map((item, index) => (
                <li
                  key={item.en}
                  className={
                    calendarState?.selectedMonth === index + 1 ? "active" : ""
                  }
                  onClick={() => {
                    calendarDispatch({
                      type: "setSelectedMonth",
                      value: index + 1,
                    });
                    setMonthListVisible(false);
                    setYearListVisible(false);
                  }}
                >
                  {calendarState?.type === "jalali" ? item.fa : item.en}
                </li>
              ))}
            </ul>
          </div>
        )}
        {yearListVisible && (
          <div className="year-list">
            <div className="year-section">
              <ActionBar
                year={true}
                setMonthListVisible={setMonthListVisible}
                setYearListVisible={setYearListVisible}
              />
            </div>
            <ul ref={yearListRef}>
              {yearsList?.map((name, index) => (
                <li
                  ref={calendarState?.selectedYear === name ? yearRef : null}
                  key={name}
                  className={
                    calendarState?.selectedYear === name ? "active" : ""
                  }
                  onClick={() => {
                    calendarDispatch({
                      type: "setSelectedYear",
                      value: name,
                    });
                    setMonthListVisible(false);
                    setYearListVisible(false);
                  }}
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Layout>
  );
};
export default Months;
