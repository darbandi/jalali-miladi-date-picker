import React from "react";
import "./App.css";
import DatePicker from "./calendar/DatePicker";
import jmoment from "moment-jalaali";
import moment from "moment";


function App() {
  const format = "YYYY-MM-DD";
  const preSelected = moment().add(-26, "days").add(5,"hours").format(format);
  const start = moment().add(7, "days").format(format);
  const end = moment().add(-7, "days").format(format);

  return (
    <div className="App">
      <DatePicker
        preSelected={preSelected}
        format={format}
        type={"jalali"} // "miladi" | "jalali"
        rangePicker={false} // true | false
        // disableDate={{ start: start, end: end }}
        timePicker={true} //true | false
      />
      <DatePicker
        // preSelected={preSelected}
        format={format}
        type={"jalali"} // "miladi" | "jalali"
        rangePicker={false} // true | false
        // disableDate={{ start: start, end: end }}
      />
      <DatePicker
        // preSelected={preSelected}
        format={format}
        type={"jalali"} // "miladi" | "jalali"
        rangePicker={false} // true | false
        disableDate={{ start: start, end: end }}
      />
      <DatePicker
        preSelected={preSelected}
        format={format}
        type={"jalali"} // "miladi" | "jalali"
        // rangePicker={false} // true | false
        // disableDate={{ start: start, end: end }}
      />
      <DatePicker
        // preSelected={preSelected}
        format={format}
        type={"jalali"} // "miladi" | "jalali"
        rangePicker={true} // true | false
        disableDate={{ start: start, end: end }}
      />
      <DatePicker
        // preSelected={preSelected}
        format={format}
        type={"jalali"} // "miladi" | "jalali"
        rangePicker={true} // true | false
        disableDate={{ start: start, end: end }}
        timePicker={true} //true | false
      />
      <DatePicker
        // preSelected={preSelected}
        format={format}
        type={"miladi"} // "miladi" | "jalali"
        rangePicker={false} // true | false
        disableDate={{ start: start, end: end }}
      />
      <DatePicker
        // preSelected={preSelected}
        format={format}
        type={"miladi"} // "miladi" | "jalali"
        rangePicker={false} // true | false
        disableDate={{ start: start, end: end }}
        timePicker={true} //true | false
      />
    </div>
  );
}

export default App;
