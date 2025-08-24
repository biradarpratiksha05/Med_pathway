import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { format } from 'date-fns';
import { Check } from 'lucide-react';
import 'react-calendar/dist/Calendar.css';

interface MedicationCalendarProps {
  medicationHistory: {
    date: Date;
    medications: {
      taken: boolean;
      takenAt?: Date;
    }[];
  }[];
  streak: number;
}

export default function MedicationCalendar({ medicationHistory, streak }: MedicationCalendarProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getTileContent = ({ date }: { date: Date }) => {
    const dayHistory = medicationHistory.find(
      h => format(h.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );

    if (!dayHistory) return null;

    const allTaken = dayHistory.medications.every(m => m.taken);
    
    return allTaken ? (
      <div className="flex justify-center">
        <Check className="w-4 h-4 text-green-500" />
      </div>
    ) : null;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Medication Calendar</h2>
          <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
            <span className="font-bold">{streak}</span> Day Streak
          </div>
        </div>
      </div>
      
      <Calendar
        value={selectedDate}
        onChange={setSelectedDate}
        tileContent={getTileContent}
        className="w-full rounded-lg border-none"
      />
    </div>
  );
}