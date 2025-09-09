import React from "react";
import ProgressGraph from "./ProgressGraph";

interface Record {
  date: string;
  weight: number;
  workoutType: string;
}

interface GymRecordChartProps {
  records: Record[];
}

const GymRecordChart: React.FC<GymRecordChartProps> = ({ records }) => {
  if (!records || records.length === 0) {
    return (
      <div className="bg-gray-100 dark:bg-gray-900 flex items-center justify-center py-10 px-4">
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 w-full max-w-2xl text-center">
          <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#3F8A00] via-[#89C60E] to-[#DFF79A] bg-clip-text text-transparent">
            No Gym Records Found
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Start tracking your workouts to see your progress here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800  rounded-2xl shadow-lg w-full">
      <ProgressGraph records={records} />
    </div>
  );
};

export default GymRecordChart;
