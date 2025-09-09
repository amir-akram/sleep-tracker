import { currentUser } from '@clerk/nextjs/server';
import { db } from '@/lib/db';

export const checkUser = async () => {
  const clerkUser = await currentUser();

  // 🚨 No Clerk user logged in
  if (!clerkUser) {
    return null;
  }

  // ✅ Try to find user in DB by Clerk ID
  let user = await db.user.findUnique({
    where: {
      clerkUserId: clerkUser.id,
    },
  });

  if (user) {
    return user; // already exists
  }

  // ✅ Create new user if not found
  user = await db.user.create({
    data: {
      clerkUserId: clerkUser.id,
      name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || 'New User',
      imageUrl: clerkUser.imageUrl,
      email: clerkUser.emailAddresses?.[0]?.emailAddress || '',
    },
  });

  return user;
};
