import jmoment from "moment-jalaali";

export const weekNames = [
  {
    en: "Mon",
    fa: "ش",
    fullNameEn: "Monday",
    indexFa: 2,
    indexEn: 0,
  },
  {
    en: "Tue",
    fa: "ی",
    fullNameEn: "Tuesday",
    indexFa: 3,
    indexEn: 1,
  },
  {
    en: "Wed",
    fa: "د",
    fullNameEn: "Wednesday",
    indexFa: 4,
    indexEn: 2,
  },
  {
    en: "Thu",
    fa: "س",
    fullNameEn: "Thursday",
    indexFa: 5,
    indexEn: 3,
  },
  {
    en: "Fri",
    fa: "چ",
    fullNameEn: "Friday",
    indexFa: 6,
    indexEn: 4,
  },
  {
    en: "Sat",
    fa: "پ",
    fullNameEn: "Saturday",
    indexFa: 0,
    indexEn: 5,
  },
  {
    en: "Sun",
    fa: "ج",
    fullNameEn: "Sunday",
    indexFa: 1,
    indexEn: 6,
  },
];

export const getWeekhNames = (index, type) => {
  if (type === "jalali") {
    return weekNames[index].fa;
  } else {
    return weekNames[index].en;
  }
};

export const monthNames = [
  { en: "January", fa: "فروردین" },
  { en: "February", fa: "اردیبهشت" },
  { en: "March", fa: "خرداد" },
  { en: "April", fa: "تیر" },
  { en: "May", fa: "مرداد" },
  { en: "June", fa: "شهریور" },
  { en: "July", fa: "مهر" },
  { en: "August", fa: "آبان" },
  { en: "September", fa: "آذر" },
  { en: "October", fa: "دی" },
  { en: "November", fa: "بهمن" },
  { en: "December", fa: "اسفند" },
];

export const hourList=Array.from({length: 24}, (_, i) => `${((i%24)<10)?"0":""}${i%24}`);
export const minuteList=Array.from({length: 60}, (_, i) => `${((i%60)<10)?"0":""}${i%60}`);

export const getActionBarTitles = (isYear, type) => {
  if (type === "jalali") {
    return {
      next: `${isYear ? "سال" : "ماه"} بعد >`,
      back: `< ${isYear ? "سال" : "ماه"} قبل`,
    };
  } else {
    return {
      next: `next >`,
      back: `< prev`,
    };
  }
};

export const getMonthNames = (index, type) => {
  if (type === "jalali") {
    return monthNames[index].fa;
  } else {
    return monthNames[index].en;
  }
};

export const getYearsList = (type) => {
  const yearsList = [];
  let min = 1350;
  let max = 1450;

  if (type !== "jalali") {
    min = 1970;
    max = 2070;
  }
  for (let index = min; index <= max; index++) {
    yearsList.push(index);
  }
  return yearsList;
};

export const getCurrentDay = (type) => {
  return parseInt(jmoment().format(type === "jalali" ? "jD" : "D"));
};
export const getCurrentMonth = (type) => {
  return parseInt(jmoment().format(type === "jalali" ? "jM" : "M"));
};
export const getCurrentYear = (type) => {
  return parseInt(jmoment().format(type === "jalali" ? "jYYYY" : "YYYY"));
};

export const getCurrentDate = (type) => {
  return jmoment().format(type === "jalali" ? "jYYYY-jMM-jDD" : "YYYY-MM-DD");
};

export const getCurrentHour = () => {
  return jmoment().format("HH");
}

export const getCurrentMinite=()=>{
  return jmoment().format("mm");
}

export const getCurrentTime=()=>{
  return jmoment().format("HH:mm");
}

export const getCurrentDateTime = (type) => {
  return jmoment().format(
    type === "jalali" ? "jYYYY-jMM-jDD HH:mm" : "YYYY-MM-DD HH:mm"
  );
};

export const getEndDayOfMonth = (date, type) => {
  return jmoment(date, type === "jalali" ? "jYYYY-jMM-jDD" : "YYYY-MM-DD")
    .endOf(type === "jalali" ? "jMonth" : "Month")
    .format(type === "jalali" ? "jD" : "D");
};

export const getEndDayNameOfMonth = (date, type) => {
  return jmoment(date, type === "jalali" ? "jYYYY-jMM-jDD" : "YYYY-MM-DD")
    .endOf(type === "jalali" ? "month" : "month")
    .format(type === "jalali" ? "dddd" : "dddd");
};

export const getStartDayNameOfMonth = (date, type) => {
  const cDate =
    type === "jalali"
      ? jmoment(date, "jYYYY-jMM-jDD").format("YYYY-MM-DD")
      : date;

  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  var d = new Date(cDate);
  var dayName = days[d.getDay()];
  return dayName;
};

export const getEmptyDaysOnFirstOfMonth = (date, type) => {
  // اسم لاتین اولین روز از ماه
  const startDayNameOfMonth = getStartDayNameOfMonth(date, type);

  const weekName = weekNames.find((x) => x.fullNameEn === startDayNameOfMonth);

  return type === "jalali" ? weekName.indexFa : weekName.indexEn;
};

export const getAllDaysInCurrentMonth = (selectedYear, selectedMonth, type) => {
  let arr = [];
  // simple of date
  const date = normalizeDate(selectedYear, selectedMonth, 1);

  // آخرین روز ماه که 29 یا 30 یا 31 روز است
  const endDayOfMonth = getEndDayOfMonth(date, type);

  /**
   * ایجاد تعداد روزهای ماه
   */
  for (let index = 1; index <= parseInt(endDayOfMonth); index++) {
    arr.push({
      id: index,
      value: index,
      date: normalizeDate(selectedYear, selectedMonth, index),
    });
  }

  // بدست آوردن تعداد روز های خالیه اول ماه
  const startSpaceOfDay = getEmptyDaysOnFirstOfMonth(date, type);

  /**
   * افزودن تعداد روزهای خالی به اول لیست ماه
   */
  for (let index = 0; index < startSpaceOfDay; index++) {
    arr.unshift({
      id: getRandomInt(99999),
      value: "",
      date: normalizeDate(selectedYear, selectedMonth, index),
    });
  }

  return arr;
};

export const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

export const normalizeDate = (year, month, day, format, type) => {
  const strDate = `${year}-${month < 10 ? "0" + month : month}-${
    day < 10 ? "0" + day : day
  }`;
  if (format) {
    return jmoment(
      strDate,
      type === "jalali" ? "jYYYY-jMM-jDD" : "YYYY-MM-DD"
    ).format(format);
  } else {
    return strDate;
  }
};

export const normalizeTime=(hour, minute)=>{
  return `${+hour<10?"0":""}${+hour}:${+minute<10?"0":""}${+minute}`;
}