// app/actions/deleteGymRecord.ts
'use server';

import { db } from '@/lib/db';
import { checkUser } from '@/lib/checkUser';
import { revalidatePath } from 'next/cache';

async function deleteGymRecord(recordId: string): Promise<{
  message?: string;
  error?: string;
}> {
  try {
    const user = await checkUser();
    if (!user) return { error: 'User not found' };

    const userId = user.id;

    // deleteMany so we can include the userId ownership check
    const result = await db.gymRecord.deleteMany({
      where: { id: recordId, userId },
    });

    // Revalidate the homepage/paths that show records (adjust path if needed)
    revalidatePath('/');

    if (result.count === 0) {
      return { error: 'Record not found or not owned by user' };
    }

    return { message: 'Gym record deleted successfully' };
  } catch (error) {
    console.error('Error deleting gym record:', error);
    return { error: 'Database error' };
  }
}

export default deleteGymRecord;
