// components/GymRecordItem.tsx
'use client';

import { useState } from 'react';
import { GymRecordForUI } from '@/types/GymRecord';
import deleteGymRecord from '@/app/actions/deleteGymRecord';

const GymRecordItem = ({ record }: { record: GymRecordForUI }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteRecord = async (recordId: string) => {
    setIsLoading(true);
    await deleteGymRecord(recordId);
    setIsLoading(false);
  };

  return (
  <li className="p-[2px] rounded-2xl bg-gradient-to-r from-[#3F8A00] via-[#89C60E] to-[#DFF79A]">
    <div
      className="flex justify-between items-center p-5 rounded-2xl shadow-md transition 
        bg-white dark:bg-gray-800"
    >
      {/* Record details */}
      <div className="flex flex-col">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {new Date(record.date).toLocaleDateString()}
        </span>
        <span className="text-lg font-bold text-gray-800 dark:text-gray-100">
          {record.workoutType}
        </span>
        <span className="text-sm text-gray-600 dark:text-gray-300">
          Weight: {record.weight} kg
        </span>
      </div>

      {/* Delete button */}
      <button
        onClick={() => handleDeleteRecord(record.id)}
        className="bg-red-500 hover:bg-red-600 text-white rounded-full w-9 h-9 flex items-center justify-center 
          transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
        aria-label="Delete record"
        disabled={isLoading}
      >
        {isLoading ? (
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        ) : (
          '✖'
        )}
      </button>
    </div>
  </li>
);

};

export default GymRecordItem;
