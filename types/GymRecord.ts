// types/GymRecord.ts
export interface GymRecord {
  id: string;
  date: string | number | Date;  // raw from DB
  workoutType: string;
  weight: number;
  userId: string;
  createdAt: Date;
}

// ✅ UI-friendly version
export interface GymRecordForUI {
  id: string;
  date: string;         // always normalized to string
  workoutType: string;
  weight: number;
}
