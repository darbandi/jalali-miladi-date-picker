import React, { useState, useEffect } from "react";
import { weekNames } from "./utils";
import { useCalendarState } from "./calendarContext";
import Layout from "./Layout";

const Weeks = () => {
  const calendarState = useCalendarState();
  return (
    <Layout>
      <div className="weeks-name-section">
        {weekNames.map((item, index) => (
          <span key={item.en} className="week">
            {calendarState?.type === "jalali" ? item.fa : item.en}
          </span>
        ))}
      </div>
    </Layout>
  );
};

export default Weeks;
