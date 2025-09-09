// app/actions/getGymRecords.ts
'use server';

import { db } from '@/lib/db';
import { checkUser } from '@/lib/checkUser';

export type GymRecordForUI = {
  id: string;
  userId: string;
  workoutType: string;
  weight: number;
  date: string; // ISO date (yyyy-mm-dd)
  createdAt: string; // ISO datetime
};


async function getGymRecords(): Promise<{
  records?: GymRecordForUI[];
  error?: string;
}> {
  try {
    const user = await checkUser();
    if (!user) return { error: 'User not found' };

    // NOTE: use the same user identifier your other server code expects
    const userId = user.id;

    const records = await db.gymRecord.findMany({
      where: { userId },
      orderBy: { date: 'asc' },
    });

    const formattedRecords: GymRecordForUI[] = records.map((r) => ({
      id: r.id,
      userId: r.userId,
      workoutType: r.workoutType,
      weight: r.weight,
      date: r.date.toISOString().split('T')[0], // keep YYYY-MM-DD for UI
      createdAt: r.createdAt.toISOString(),
    }));

    return { records: formattedRecords };
  } catch (error) {
    console.error('Error fetching gym records:', error);
    return { error: 'Database error' };
  }
}

export default getGymRecords;
