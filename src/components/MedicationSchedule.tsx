import React, { useState } from 'react';
import { Clock, Pill, Check, X } from 'lucide-react';
import { Schedule, Disease } from '../types';
import { format } from 'date-fns';

const diseases: Disease[] = [
  { name: 'Diabetes', color: '#FFA500' },
  { name: 'Hypertension', color: '#FF4444' },
  { name: 'Cholesterol', color: '#4CAF50' }
];

const schedules: Schedule[] = [
  {
    time: '08:00 AM',
    medications: [
      {
        name: 'Metformin',
        dosage: '500mg',
        frequency: 'Once daily',
        timing: ['Morning'],
        instructions: 'Take with breakfast',
        disease: diseases[0],
      },
      {
        name: 'Lisinopril',
        dosage: '10mg',
        frequency: 'Once daily',
        timing: ['Morning'],
        instructions: 'Take with or without food',
        disease: diseases[1],
      }
    ],
  },
  {
    time: '02:00 PM',
    medications: [
      {
        name: 'Statin',
        dosage: '20mg',
        frequency: 'Once daily',
        timing: ['Afternoon'],
        instructions: 'Take with food',
        disease: diseases[2],
      }
    ],
  },
];

export default function MedicationSchedule() {
  const [takenMeds, setTakenMeds] = useState<Record<string, boolean>>({});

  const handleMedication = (medName: string, taken: boolean) => {
    setTakenMeds(prev => ({
      ...prev,
      [medName]: taken
    }));
  };

  return (
    <div className="card p-6">
      <h2 className="text-xl font-semibold mb-6 flex items-center text-primary">
        <Clock className="w-6 h-6 mr-2" />
        Today's Schedule ({format(new Date(), 'MMMM d, yyyy')})
      </h2>
      
      <div className="space-y-6">
        {schedules.map((schedule, index) => (
          <div key={index} className="card p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-medium text-primary">{schedule.time}</span>
            </div>
            
            {schedule.medications.map((med, medIndex) => (
              <div 
                key={medIndex} 
                className="flex items-start space-x-4 p-4 rounded-xl mb-3"
                style={{ backgroundColor: `${med.disease.color}10` }}
              >
                <div className="mt-1">
                  <Pill className="w-5 h-5" style={{ color: med.disease.color }} />
                </div>
                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-text-primary">{med.name}</h3>
                    <span 
                      className="text-xs px-3 py-1 rounded-full"
                      style={{ 
                        backgroundColor: med.disease.color,
                        color: 'white'
                      }}
                    >
                      {med.disease.name}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary mt-1">{med.dosage} - {med.instructions}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleMedication(med.name, true)}
                    className={`p-2 rounded-full transition-colors ${
                      takenMeds[med.name] === true 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-100 text-gray-500 hover:bg-green-100'
                    }`}
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleMedication(med.name, false)}
                    className={`p-2 rounded-full transition-colors ${
                      takenMeds[med.name] === false 
                        ? 'bg-red-500 text-white' 
                        : 'bg-gray-100 text-gray-500 hover:bg-red-100'
                    }`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}