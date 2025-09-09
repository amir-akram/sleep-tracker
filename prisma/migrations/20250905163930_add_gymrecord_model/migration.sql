-- CreateTable
CREATE TABLE "public"."GymRecord" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "workoutType" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GymRecord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "GymRecord_userId_idx" ON "public"."GymRecord"("userId");

-- AddForeignKey
ALTER TABLE "public"."GymRecord" ADD CONSTRAINT "GymRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
