import React, { useReducer, createContext, useContext } from "react";

let initialState = {
  selectedDay: null,
  selectedMonth: null,
  selectedYear: null,
  selectedDate: null,
  selectedMonthName: null,
  currentDay: null,
  currentMonth: null,
  currentYear: null,
  currentDate: null,
  format: null,
  disableDate: null,
  rangePicker: null,
  type: null,
  timePicker:null,
  selectedHour:null,
  selectedMinute:null,
  currentHour:null,
  currentMinute:null,
  currentDatetime:null,
};

const CalendarStateContext = createContext(undefined);
const CalendarDispatchContext = createContext(undefined);

const calendarReducer = (state, action) => {
  switch (action.type) {
    case "setSelectedDay":
      return { ...state, selectedDay: action.value };
    case "setSelectedMonth":
      return { ...state, selectedMonth: action.value };
    case "setSelectedYear":
      return { ...state, selectedYear: action.value };
    case "setSelectedHour":
      return {...state, selectedHour: action.value};
    case "setSelectedMinute":
      return {...state, selectedMinute:action.value};
    case "setCurrentDay":
      return { ...state, currentDay: action.value };
    case "setCurrentMonth":
      return { ...state, currentMonth: action.value };
    case "setCurrentYear":
      return { ...state, currentYear: action.value };
    case "setCurrentHour":
      return {...state, currentHour:action.value};
    case "setCurrentMinute":
      return {...state, currentMinute:action.value};
    case "setSelectedDate":
      return { ...state, selectedDate: action.value };
    case "setCurrentDate":
      return { ...state, currentDate: action.value };
    case "setSelectedMonthName":
      return { ...state, selectedMonthName: action.value };
    case "setType":
      return { ...state, type: action.value };
    default:
      throw new Error(`Unexpected action: ${action.type}`);
  }
};

const CalendarProvider = (props) => {
  initialState = { ...initialState, ...props.values };
  const [calendarState, DispatchCalendarState] = useReducer(
    calendarReducer,
    initialState
  );
  return (
    <CalendarStateContext.Provider value={calendarState}>
      <CalendarDispatchContext.Provider value={DispatchCalendarState}>
        {props.children}
      </CalendarDispatchContext.Provider>
    </CalendarStateContext.Provider>
  );
};

const useCalendarState = () => {
  const context = useContext(CalendarStateContext);
  if (context === undefined) {
    throw new Error("useCalendarState must be used within a CalendarProvider");
  }
  return context;
};

const useCalendarDispatch = () => {
  const context = useContext(CalendarDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useCalendarDispatch must be used within a CalendarProvider"
    );
  }
  return context;
};

export {
  CalendarProvider,
  useCalendarState,
  useCalendarDispatch,
  initialState,
};
