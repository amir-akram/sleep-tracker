// app/components/ProgressGraph.tsx
"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface Record {
  date: string;
  weight: number;
}

const ProgressGraph = ({ records }: { records: Record[] }) => {
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
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg w-full">
      <h3 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-[#3F8A00] via-[#89C60E] to-[#DFF79A] bg-clip-text text-transparent">
        Progress Over Time
      </h3>

      <ResponsiveContainer width="90%" height={320}>
        <AreaChart data={records}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

          {/* Date axis */}
          <XAxis
            dataKey="date"
            tickFormatter={(dateString) => {
              const d = new Date(dateString);
              const day = d.getDate();
              const month = d.getMonth() + 1; // JS months are 0-indexed
              return `${day}/${month}`;
            }}
          />

          <YAxis axisLine={false} tickLine={false} />

          {/* Tooltip */}
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              color: "#111827",
              fontSize: "0.9rem",
            }}
            labelStyle={{ fontWeight: "bold", color: "#111827" }}
          />

          <Legend />

          {/* Weight as green area */}
          <Area
            type="monotone"
            dataKey="weight"
            stroke="#3F8A00"
            fill="url(#colorWeight)"
            strokeWidth={2}
            name="Weight (kg)"
            animationDuration={1200}
          />

          {/* Gradient */}
          <defs>
            <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
              <stop offset="10%" stopColor="#3F8A00" stopOpacity={0.4} />
              <stop offset="90%" stopColor="#DFF79A" stopOpacity={0.05} />
            </linearGradient>
          </defs>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgressGraph;
