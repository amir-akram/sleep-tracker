'use server';
import { db } from '@/lib/db';
import { checkUser } from '@/lib/checkUser';
import { revalidatePath } from 'next/cache';

interface GymData {
  workoutType: string;
  weight: number;
  date: string;
}

interface GymResult {
  data?: GymData;
  error?: string;
}

async function addGymRecord(formData: FormData): Promise<GymResult> {
  const workoutTypeValue = formData.get('workoutType');
  const weightValue = formData.get('weight');
  const dateValue = formData.get('date');

  if (!workoutTypeValue || !weightValue || !dateValue) {
    return { error: 'Workout type, weight, or date is missing' };
  }

  const workoutType: string = workoutTypeValue.toString();
  const weight: number = parseFloat(weightValue.toString());

  let date: string;
  try {
    date = new Date(dateValue.toString()).toISOString();
  } catch (error) {
    console.error('Invalid date format:', error);
    return { error: 'Invalid date format' };
  }

  // ✅ Ensure user exists in DB
  const user = await checkUser();
  if (!user) return { error: 'User not found in database' };
  const userId = user.id; // Use Prisma User ID

  try {
    // Check if a gym record for the same date already exists
    const existingRecord = await db.gymRecord.findFirst({
      where: { userId, date },
    });

    let gymData: GymData;

    if (existingRecord) {
      // Update existing record
      const updatedRecord = await db.gymRecord.update({
        where: { id: existingRecord.id },
        data: { workoutType, weight },
      });

      gymData = {
        workoutType: updatedRecord.workoutType,
        weight: updatedRecord.weight,
        date: updatedRecord.date.toISOString(),
      };
    } else {
      // Create new record
      const createdRecord = await db.gymRecord.create({
        data: { workoutType, weight, date, userId },
      });

      gymData = {
        workoutType: createdRecord.workoutType,
        weight: createdRecord.weight,
        date: createdRecord.date.toISOString(),
      };
    }

    revalidatePath('/');

    return { data: gymData };
  } catch (error) {
    console.error('Error adding gym record:', error);
    return { error: 'An unexpected error occurred while adding the gym record.' };
  }
}

export default addGymRecord;
