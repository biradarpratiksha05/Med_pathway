export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  timing: string[];
  instructions: string;
  disease: Disease;
  taken?: boolean;
  takenAt?: Date;
}

export interface Disease {
  name: string;
  color: string;
}

export interface Schedule {
  time: string;
  medications: Medication[];
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface MedicationHistory {
  date: Date;
  medications: {
    medication: Medication;
    taken: boolean;
    takenAt?: Date;
  }[];
}

export interface UserProfile {
  name: string;
  avatar: string;
  streak: number;
  lastCheckIn: Date;
  language: string;
  diseases: Disease[];
  medicationHistory: MedicationHistory[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: Date;
  read: boolean;
  disease?: Disease;
}