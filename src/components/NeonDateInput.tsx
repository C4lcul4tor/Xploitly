import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../datepicker-neon.css"; // your neon style

const NeonDateInput = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div className="relative">
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="yyyy-MM-dd"
        placeholderText="Select your birthdate"
        className="input-field"
        calendarClassName="neon-datepicker"
      />
      {/* This is the important part: hidden input included in form submission */}
      {selectedDate && (
        <input
          type="hidden"
          name="birthdate"
          value={selectedDate.toISOString().split("T")[0]} // yyyy-mm-dd
        />
      )}
    </div>
  );
};

export default NeonDateInput;
