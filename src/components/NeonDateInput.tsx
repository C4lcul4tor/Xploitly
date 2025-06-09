import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../datepicker-neon.css"; // Your custom neon style

const NeonDateInput = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div className="relative w-full">
      <DatePicker
  selected={selectedDate}
  onChange={(date) => setSelectedDate(date)}
  dateFormat="yyyy-MM-dd"
  showMonthDropdown
  showYearDropdown
  dropdownMode="select"
  placeholderText="Select your birthdate"
  className="input-field w-full text-white bg-[#111827] border border-cyan-600 shadow-[0_0_10px_#00ffff99] focus:outline-none"
/>

      {/* Hidden input to pass date to backend */}
      {selectedDate && (
        <input
          type="hidden"
          name="birthdate"
          value={selectedDate.toISOString().split("T")[0]} // YYYY-MM-DD
        />
      )}
    </div>
  );
};

export default NeonDateInput;
