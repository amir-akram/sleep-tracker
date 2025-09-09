"use client";

import { useState } from "react";
import { getSleepAIInsights } from "@/app/actions/getSleepAIInsights";
import {
  InformationCircleIcon,
  LightBulbIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  MoonIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

interface AIInsight {
  id: string;
  type: "success" | "tip" | "warning" | "info";
  title: string;
  message: string;
  action?: string;
  confidence?: number;
}

const SleepAIInsights = ({ initialInsights }: { initialInsights: AIInsight[] }) => {
  const [insights, setInsights] = useState<AIInsight[]>(initialInsights);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const freshInsights = await getSleepAIInsights();
      setInsights(freshInsights);
    } catch {
      console.error("Failed to refresh insights");
    } finally {
      setIsRefreshing(false);
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <ExclamationTriangleIcon className="w-5 h-5 text-yellow-500" />;
      case "success":
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case "tip":
        return <LightBulbIcon className="w-5 h-5 text-emerald-500" />;
      case "info":
        return <InformationCircleIcon className="w-5 h-5 text-blue-500" />;
      default:
        return <MoonIcon className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <section className="max-w-7xl mx-auto mt-6 border-t border-gray-200 dark:border-gray-700 pt-12">
      <div className="max-w-7xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 max-w-7xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#3F8A00] via-[#89C60E] to-[#DFF79A] rounded-xl flex items-center justify-center shadow-lg">
              <MoonIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Sleep AI Insights
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Personalized recommendations powered by AI
              </p>
            </div>
          </div>

          {/* ✅ Refresh button */}
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium 
                       text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 
                       border border-gray-300 dark:border-gray-600 transition disabled:opacity-50"
          >
            <ArrowPathIcon className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        {/* Insights */}
        <div className="space-y-5">
          {insights.map((insight) => (
            <div
              key={insight.id}
              className="p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/40"
            >
              <div className="flex items-start gap-3">
                {getInsightIcon(insight.type)}
                <div className="flex-1">
                  <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                    {insight.title}
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">
                    {insight.message}
                  </p>
                  {insight.action && (
                    <p className="text-emerald-600 dark:text-emerald-400 text-xs font-medium">
                      {insight.action}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SleepAIInsights;
