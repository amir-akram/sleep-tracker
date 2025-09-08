"use client";

import React, { useEffect, useState } from "react";
import { getGymStreak } from "../actions/getStreak";

interface Record {
  date: string;
  weight: number;
}

interface HighlightsProps {
  records: Record[];
}

const Highlights: React.FC<HighlightsProps> = ({ records }) => {
  const [streak, setStreak] = useState<{ currentStreak: number; longestStreak: number }>({
    currentStreak: 0,
    longestStreak: 0,
  });
  const [loadingStreak, setLoadingStreak] = useState(true);

  // 🔥 Run whenever records change
  useEffect(() => {
  const fetchStreak = async () => {
    try {
      setLoadingStreak(true);
      const result = await getGymStreak();
      setStreak(result);
    } catch (error) {
      console.error("Failed to fetch gym streak:", error);
    } finally {
      setLoadingStreak(false);
    }
  };

  if (records && records.length > 0) {
    fetchStreak();
  } else {
    // if no records left, reset streak
    setStreak({ currentStreak: 0, longestStreak: 0 });
  }
}, [records.length]); // ✅ only track count, avoids dependency size mismatch
 

  if (!records || records.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center">
        <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-[#3F8A00] via-[#89C60E] to-[#DFF79A] bg-clip-text text-transparent">
          No Records Yet
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Start logging your workouts to see highlights here!
        </p>
      </div>
    );
  }

  const currentWeight = records[records.length - 1].weight;

  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();
  const monthName = now.toLocaleString("default", { month: "long" });

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const workoutDaysThisMonth = records.filter((r) => {
    const d = new Date(r.date);
    return d.getMonth() === month && d.getFullYear() === year;
  }).length;

  const attendance = Math.round((workoutDaysThisMonth / daysInMonth) * 100);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
      {/* Title */}
      <h3 className="text-xl font-bold mb-4 text-center bg-gradient-to-r from-[#3F8A00] via-[#89C60E] to-[#DFF79A] bg-clip-text text-transparent">
        {monthName} Highlights
      </h3>

      {/* 2x2 Grid */}
      <div className="grid grid-cols-2 gap-y-6 text-gray-700 dark:text-gray-300">
        {/* Current Weight */}
        <div className="flex flex-col items-center transition-transform duration-200 hover:scale-110">
          <p className="text-xs text-gray-500 dark:text-gray-400">Current Weight</p>
          <span className="font-semibold text-lg">{currentWeight} kg</span>
        </div>

        {/* Attendance */}
        <div className="flex flex-col items-center transition-transform duration-200 hover:scale-110">
          <p className="text-xs text-gray-500 dark:text-gray-400">Attendance</p>
          <span className="font-semibold text-lg">{attendance}%</span>
        </div>

        {/* Current Streak */}
        <div className="flex flex-col items-center transition-transform duration-200 hover:scale-110">
          <p className="text-xs text-gray-500 dark:text-gray-400">Streak</p>
          {loadingStreak ? (
            <span className="italic text-gray-400">Loading…</span>
          ) : (
            <span className="font-semibold text-lg text-[#89C60E] flex items-center gap-1">
              {streak.currentStreak} 🔥
            </span>
          )}
        </div>

        {/* Longest Streak */}
        <div className="flex flex-col items-center transition-transform duration-200 hover:scale-110">
          <p className="text-xs text-gray-500 dark:text-gray-400">Longest Streak</p>
          {loadingStreak ? (
            <span className="italic text-gray-400">Loading…</span>
          ) : (
            <span className="font-semibold text-lg text-[#3F8A00] flex items-center gap-1">
              {streak.longestStreak} 🏆
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Highlights;
