"use server";

import { db } from "@/lib/db";
import { checkUser } from "@/lib/checkUser";

async function calculateStreak(dates: Date[]) {
  if (!dates || dates.length === 0) {
    return { currentStreak: 0, longestStreak: 0 };
  }

  let longest = 1;
  let current = 1;
  let temp = 1;

  // Longest streak
  for (let i = 1; i < dates.length; i++) {
    const prev = new Date(dates[i - 1]);
    const curr = new Date(dates[i]);
    const diff = (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24);

    if (diff === 1) {
      temp += 1;
      if (temp > longest) longest = temp;
    } else if (diff > 1) {
      temp = 1;
    }
  }

  // Current streak (up to latest record)
  current = 1;
  for (let i = dates.length - 1; i > 0; i--) {
    const prev = new Date(dates[i - 1]);
    const curr = new Date(dates[i]);
    const diff = (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24);

    if (diff === 1) {
      current += 1;
    } else {
      break;
    }
  }

  return { currentStreak: current, longestStreak: longest };
}

// ✅ Sleep streak (uses clerkUserId)
export async function getSleepStreak(userId: string) {
  try {
    const records = await db.record.findMany({
      where: { userId }, // clerkUserId
      orderBy: { date: "asc" },
      select: { date: true },
    });
    return calculateStreak(records.map((r) => r.date));
  } catch (error) {
    console.error("Error calculating sleep streak:", error);
    return { currentStreak: 0, longestStreak: 0 };
  }
}

// ✅ Gym streak (uses Clerk internal user.id)
export async function getGymStreak() {
  try {
    const user = await checkUser();
    if (!user) return { currentStreak: 0, longestStreak: 0 };

    const records = await db.gymRecord.findMany({
      where: { userId: user.id }, // 🟢 use Clerk user.id (same as getGymRecords)
      orderBy: { date: "asc" },
      select: { date: true },
    });

    return calculateStreak(records.map((r) => r.date));
  } catch (error) {
    console.error("Error calculating gym streak:", error);
    return { currentStreak: 0, longestStreak: 0 };
  }
}
