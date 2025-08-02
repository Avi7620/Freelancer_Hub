import React, { useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FutureDatePicker = ({ selectedDate, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2 bg-gray-100 border-r border-gray-300"
        >
          <CalendarIcon className="w-5 h-5 text-gray-600" />
        </button>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => {
            onChange(date);
            setIsOpen(false);
          }}
          minDate={new Date()} // Only allows future dates
          filterDate={(date) => {
            // Optional: Filter out weekends if needed
            // return date.getDay() !== 0 && date.getDay() !== 6;
            return true;
          }}
          onCalendarClose={() => setIsOpen(false)}
          open={isOpen}
          className="w-full px-4 py-2 focus:outline-none"
          placeholderText="Select a future date"
          dateFormat="MMMM d, yyyy"
          showPopperArrow={false}
          popperPlacement="bottom-start"
        />
      </div>
    </div>
  );
};

export default FutureDatePicker;
