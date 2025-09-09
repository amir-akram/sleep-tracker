"use client";

import React from "react";

interface AttendanceCalendarProps {
  records: { date: string }[];
}

const AttendanceCalendar: React.FC<AttendanceCalendarProps> = ({ records }) => {
  const workoutDays = records.map((r) => r.date);

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0-indexed

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay(); // weekday of 1st day

  const days = Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1));

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-lg w-full max-w-sm mx-auto">
      <h3 className="text-lg font-bold text-center mb-4 bg-gradient-to-r from-[#3F8A00] via-[#89C60E] to-[#DFF79A] bg-clip-text text-transparent">
        {now.toLocaleString("default", { month: "long" })} {year} 
      </h3>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-1 text-center mb-1">
        {weekdays.map((day, idx) => (
          <span
            key={`${day}-${idx}`}
            className="text-xs font-medium text-gray-500 dark:text-gray-400 w-5"
          >
            {day}
          </span>
        ))}
      </div>

      {/* Calendar cells */}
      <div className="grid grid-cols-7 gap-1 justify-center">
        {/* Empty cells for alignment */}
        {Array.from({ length: firstDay }).map((_, idx) => (
          <div key={`empty-${idx}`} className="w-5 h-5"></div>
        ))}

        {days.map((day) => {
          const dateString = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, "0")}-${String(day.getDate()).padStart(2, "0")}`;
          const hasWorkout = workoutDays.includes(dateString);
          const isToday = day.toDateString() === new Date().toDateString();

          // ✅ Sunday lighter shade
          const isSunday = day.getDay() === 0;

          const bgColor = isSunday
            ? "bg-gray-300 dark:bg-gray-600"
            : hasWorkout
            ? "bg-gradient-to-r from-[#3F8A00] via-[#89C60E] to-[#DFF79A]"
            : "bg-gray-200 dark:bg-gray-700";

          return (
            <div
              key={dateString}
              title={dateString}
              className={`w-5 h-5 rounded-sm transition-colors ${bgColor} ${
                isToday ? "ring-2 ring-yellow-400" : ""
              } hover:scale-110`}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default AttendanceCalendar;
