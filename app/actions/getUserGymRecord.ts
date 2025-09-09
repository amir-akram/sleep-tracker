'use server';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';

async function getUserGymRecord(): Promise<{
  totalWorkouts?: number;
  uniqueDays?: number;
  startWeight?: number;
  endWeight?: number;
  weightDiff?: number;
  error?: string;
}> {
  const { userId } = await auth();
  if (!userId) return { error: 'User not found' };

  try {
    const records = await db.gymRecord.findMany({
      where: { userId },
      orderBy: { date: 'asc' },
    });

    if (records.length === 0) return { totalWorkouts: 0, uniqueDays: 0 };

    // Attendance: count unique days
    const uniqueDays = new Set(records.map(r => new Date(r.date).toDateString()));

    // Weight trend
    const startWeight = records[0].weight;
    const endWeight = records[records.length - 1].weight;
    const weightDiff = endWeight - startWeight;

    return {
      totalWorkouts: records.length,
      uniqueDays: uniqueDays.size,
      startWeight,
      endWeight,
      weightDiff,
    };
  } catch (error) {
    console.error('Error fetching gym record:', error);
    return { error: 'Database error' };
  }
}

export default getUserGymRecord;
