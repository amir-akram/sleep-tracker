'use server';

import { checkUser } from '@/lib/checkUser';
import { db } from '@/lib/db';
import { generateSleepInsights, AIInsight, SleepRecord } from '@/lib/ai';

export async function getSleepAIInsights(): Promise<AIInsight[]> {
  try {
    const user = await checkUser();
    if (!user) throw new Error('User not authenticated');

    // Last 7 days only (since helper slices to 7 anyway)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const records = await db.record.findMany({
      where: {
        userId: user.clerkUserId,
        createdAt: { gte: sevenDaysAgo },
      },
      orderBy: { createdAt: 'desc' },
      take: 7,
    });

    if (records.length === 0) {
      return [
        {
          id: 'welcome-sleep-1',
          type: 'info',
          title: 'Welcome to Sleep Insights!',
          message:
            'Start logging your sleep quality and hours to unlock personalized AI insights.',
          action: 'Add your first sleep record',
          confidence: 1.0,
        },
        {
          id: 'welcome-sleep-2',
          type: 'tip',
          title: 'Track Daily',
          message:
            'For best results, try to log your sleep every day to help AI detect patterns.',
          action: 'Set a reminder',
          confidence: 1.0,
        },
      ];
    }

    // Convert to SleepRecord[]
    const sleepData: SleepRecord[] = records.map((r) => ({
      id: r.id,
      date: r.createdAt.toISOString(),
      quality: r.text, // using `text` field for quality
      hours: r.amount, // using `amount` field for hours
    }));

    return await generateSleepInsights(sleepData);
  } catch (error) {
    console.error('Error getting Sleep AI insights:', error);
    return [
      {
        id: 'error-sleep',
        type: 'warning',
        title: 'Sleep Insights Unavailable',
        message:
          "We're having trouble analyzing your sleep right now. Please try again later.",
        action: 'Retry',
        confidence: 0.5,
      },
    ];
  }
}
