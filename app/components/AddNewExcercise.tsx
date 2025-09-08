"use client";
import { useRef, useState, useEffect } from "react";
import addGymRecord from "../actions/addGymRecord";

const AddNewExercise = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const [workoutType, setWorkoutType] = useState("");
  const [weight, setWeight] = useState<number | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"success" | "error">("success");
  const [isLoading, setIsLoading] = useState(false);

  const clientAction = async (formData: FormData) => {
    setIsLoading(true);
    setAlertMessage(null);

    formData.set("weight", weight?.toString() ?? "");
    formData.set("workoutType", workoutType);

    const { error } = await addGymRecord(formData);

    if (error) {
      setAlertMessage(`❌ ${error}`);
      setAlertType("error");
    } else {
      setAlertMessage("✅ Exercise record added successfully!");
      setAlertType("success");
      formRef.current?.reset();
      setWeight(null);
      setWorkoutType("");
    }

    setIsLoading(false);
  };

  // ✅ Automatically clear alert after 3 seconds
  useEffect(() => {
    if (!alertMessage) return;
    const timer = setTimeout(() => setAlertMessage(null), 5000);
    return () => clearTimeout(timer); // cleanup if alert changes before timeout
  }, [alertMessage]);

  return (
    <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 w-full transition">
      <h3 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-[#3F8A00] via-[#89C60E] to-[#DFF79A] bg-clip-text text-transparent">
        Track Your Workout
      </h3>

      <form
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(formRef.current!);
          clientAction(formData);
        }}
        className="space-y-6"
      >
        {/* Date & Workout Type */}
        <div className="mt-4 flex flex-col md:flex-row md:space-x-4">
          <div className="flex-1">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Workout Date
            </label>
            <input
              type="date"
              name="date"
              id="date"
              required
              onFocus={(e) => e.target.showPicker()}
              className="block w-full border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>

          <div className="flex-1">
            <label htmlFor="workoutType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Workout Type
            </label>
            <select
              id="workoutType"
              name="workoutType"
              value={workoutType}
              onChange={(e) => setWorkoutType(e.target.value)}
              required
              className="block w-full border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="" disabled>Select type...</option>
              <option value="Chest">🏋️ Chest</option>
              <option value="Back">💪 Back</option>
              <option value="Biceps">🌀 Biceps</option>
              <option value="Triceps">🎯 Triceps</option>
              <option value="Shoulders">🏹 Shoulders</option>
              <option value="Legs">🦵 Legs</option>
              <option value="Cardio">❤️ Cardio</option>
            </select>
          </div>
        </div>

        {/* Weight */}
        <div>
          <label htmlFor="weight" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Current Weight (kg)<br/>
            <span className="text-xs text-gray-500 dark:text-gray-400">(Select between 40 and 120 in steps of 0.5)</span>
          </label>
          <input
            type="range"
            name="weight"
            id="weight"
            min="40"
            max="120"
            step="0.5"
            value={weight ?? 80}
            onChange={(e) => setWeight(parseFloat(e.target.value))}
            className="w-full cursor-pointer accent-[#89C60E]"
          />
          <div className="text-center text-gray-700 dark:text-gray-200 mt-2 font-medium">
            {weight !== null ? `${weight} kg` : "No weight selected"}
          </div>

          {weight !== null && (
            <>
              <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 mt-3 relative">
                <div
                  className="h-2 rounded-full transition-all"
                  style={{
                    width: `${((weight - 40) / (120 - 40)) * 100}%`,
                    backgroundColor: weight < 50 ? "#ef4444" : weight <= 100 ? "#22c55e" : "#f59e0b",
                  }}
                ></div>
              </div>
              <div className="text-center text-xs mt-1 text-gray-600 dark:text-gray-400">
                {weight < 50 ? "Low range" : weight <= 100 ? "Healthy range" : "High range"}
              </div>
            </>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-[#3F8A00] via-[#89C60E] to-[#DFF79A] hover:opacity-90 text-gray-900 px-4 py-2 rounded-lg font-medium shadow-md transition flex items-center justify-center cursor-pointer disabled:opacity-70"
        >
          {isLoading ? (
            <svg
              className="animate-spin h-5 w-5 text-gray-900"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
          ) : (
            "Add Exercise"
          )}
        </button>
      </form>

      {/* Alert */}
      {alertMessage && (
        <div
          className={`mt-4 p-3 rounded-lg text-sm border ${
            alertType === "success"
              ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 border-green-300 dark:border-green-700"
              : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 border-red-300 dark:border-red-700"
          }`}
        >
          {alertMessage}
        </div>
      )}
    </div>
  );
};

export default AddNewExercise;
