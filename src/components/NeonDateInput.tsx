import { useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import "../datepicker-neon.css"

export default function NeonDateInput() {
  const [birthdate, setBirthdate] = useState<Date | null>(null)

  return (
    <div className="w-full">
      <label htmlFor="birthdate" className="block mb-2 text-cyan-400 text-sm">
        Select Your Birth Date
      </label>
   <DatePicker
  id="birthdate"
  selected={birthdate}
  onChange={(date) => setBirthdate(date)}
  dateFormat="MMMM d, yyyy"
  placeholderText="Click to choose"
  showMonthDropdown
  showYearDropdown
  dropdownMode="select"
  className="w-full px-4 py-3 rounded bg-[#1e1e3f] text-white border border-cyan-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-400"
/>
    </div>
  )
}
