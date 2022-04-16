import React from "react";
import { useCalendarState } from "./calendarContext";

const Layout = ({ children }) => {
  const calendarState = useCalendarState();
  return (
    <div
      style={{ direction: calendarState?.type === "jalali" ? "rtl" : "ltr" }}
    >
      {children}
    </div>
  );
};

export default Layout;
