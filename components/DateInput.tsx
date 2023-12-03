import DatePicker from "react-date-picker";
import moment from "moment";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ClearIcon from "@mui/icons-material/Clear";

import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

interface DateInputProps {
  value: string;
  onChange: (value: any) => void;
}

export const DateInput = ({ value, onChange }: DateInputProps) => {
  return (
    <div>
      <div className="flex justify-between gap-3">
        <DatePicker
          onChange={(value) => {
            onChange(value ? moment(value?.toString()).format("YYYY MM DD") : "");
          }}
          className={""}
          value={value}
          calendarIcon={<CalendarMonthIcon />}
          clearIcon={<ClearIcon />}
          format={"y-MM-dd"}
        />
      </div>
    </div>
  );
};
