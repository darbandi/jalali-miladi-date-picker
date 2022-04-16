import React from "react";
import { useCalendarDispatch, useCalendarState } from "./calendarContext";
import TimePicker from "./TimePicker";
import Layout from "./Layout";

const Range = () => {
  const calendarState = useCalendarState();
  const calendarDispatch=useCalendarDispatch();

  const changeSingleDateTimeHandler=(hour,minute)=>{
    calendarDispatch({
      type: "setSelectedDate",
      value: {
        ...calendarState.selectedDate,
        minute:minute,
        hour:hour,
      },
    });
  }

  const changeFromDateTimeHandler=(hour,minute)=>{
    calendarDispatch({
      type: "setSelectedDate",
      value: {
        ...calendarState.selectedDate,
        fromMinute:minute,
        fromHour:hour,
      },
    });
  }

  const changeToDateTimeHandler=(hour,minute)=>{
    calendarDispatch({
      type: "setSelectedDate",
      value: {
        ...calendarState.selectedDate,
        toMinute:minute,
        toHour:hour,
      },
    });
  }

  console.log("Range 4");
  return (
    <Layout>
      {calendarState?.rangePicker && (
        <div className="range-section">
          {
            (!calendarState?.timePicker || !calendarState?.selectedDate?.from) ?
              <bdi>{calendarState?.selectedDate?.from || "- - -"}</bdi> 
            : <TimePicker 
                date={calendarState?.selectedDate?.from || "- - -"}
                hour={calendarState?.selectedDate?.fromHour}
                minute={calendarState?.selectedDate?.fromMinute}
                onChange={changeFromDateTimeHandler}
              />
          }
          <span className="text">
            {calendarState?.type === "jalali" ? "تا" : "to"}
          </span>
          {
            (!calendarState?.timePicker || !calendarState?.selectedDate?.to) ?
              <bdi>{calendarState?.selectedDate?.to || "- - -"}</bdi>
            : <TimePicker 
                date={calendarState?.selectedDate?.to || "- - -"}
                hour={calendarState?.selectedDate?.toHour}
                minute={calendarState?.selectedDate?.toMinute}
                onChange={changeToDateTimeHandler}
              />
          }
        </div>
      )}
      {
        !calendarState?.rangePicker && calendarState?.timePicker && (
          <div className="range-section">
            <TimePicker 
              date={calendarState?.selectedDate?.date}
              hour={calendarState?.selectedDate?.hour}
              minute={calendarState?.selectedDate?.minute}
              onChange={changeSingleDateTimeHandler}
            />
          </div>
        )
      }
    </Layout>
  );
};

export default Range;
