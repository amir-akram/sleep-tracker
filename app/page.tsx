import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import Guest from "./components/Guest";
import AddNewRecord from "./components/AddNewRecord";
import RecordChart from "./components/RecordChart";
import AverageSleep from "./components/AverageSleep";
import BestWorstSleep from "./components/BestWorstSleep";
import RecordHistory from "./components/RecordHistory";
import SleepAIInsights from "./components/SleepAIInsights"; 
import { getSleepAIInsights } from "@/app/actions/getSleepAIInsights"; 
import { getSleepStreak } from "./actions/getStreak";

const HomePage = async () => {
  const user = await currentUser();
  if (!user) {
    return <Guest />;
  }

  // ✅ fetch insights server-side
  const insights = await getSleepAIInsights();
  const streak = await getSleepStreak(user.id);

  return (
    <main className="font-sans bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100 min-h-screen">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 pt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column */}
        <div className="space-y-6">
          {/* User Profile Card */}
          <div className="bg-white dark:bg-gray-800 mt-6 p-6 rounded-2xl shadow-lg flex flex-col sm:flex-row items-center sm:items-start gap-6 transition">
            
            {/* User Image */}
            <img
              src={user.imageUrl}
              alt={`${user.firstName}'s profile`}
              className="w-24 h-24 rounded-full border border-gray-300 dark:border-gray-600 shadow-md object-cover"
            />

            {/* User Details */}
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800 dark:text-white drop-shadow-lg">
                Welcome Back, {user.firstName}!
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                We’re excited to have you here again!  Keep coming back daily to maintain your streaks and unlock a clearer picture of your rest.
              </p>

              <div className="space-y-2 text-sm">
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Joined:</span>{" "}
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Last Active:</span>{" "}
                  {user.lastActiveAt
                    ? new Date(user.lastActiveAt).toLocaleString()
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* 🔥 Streaks & Stats Section */}
         <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
    <h3 className="text-lg font-semibold mb-2">Your Streak</h3>
    <div className="flex items-center justify-between text-sm">
      <p className="text-gray-700 dark:text-gray-300">
        <span className="font-semibold">Current Streak:</span>{" "}
        {streak.currentStreak} days 🔥
      </p>
      <p className="text-gray-700 dark:text-gray-300">
        <span className="font-semibold">Longest Streak:</span>{" "}
        {streak.longestStreak} days 🏆
      </p>
    </div>
  </div>


          {/* Add Sleep Record */}
          <AddNewRecord />
        </div>

        {/* Right Column */}
        <div className="space-y-1">
          <RecordChart />
          <AverageSleep />
          <BestWorstSleep />
        </div>
      </div>

      {/* ✅ Pass SSR insights into component */}
      <SleepAIInsights initialInsights={insights} />

      <RecordHistory />
    </main>
  );
};

export default HomePage;
