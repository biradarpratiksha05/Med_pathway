import React, { useState } from 'react';
import { Calendar, MessageCircle, Upload } from 'lucide-react';
import ChatBot from './components/ChatBot';
import MedicationSchedule from './components/MedicationSchedule';
import MedicationCalendar from './components/MedicationCalendar';
import DietPlan from './components/DietPlan';
import Navbar from './components/Navbar';
import { UserProfile, Notification, Disease } from './types';

function App() {
  const [showChat, setShowChat] = useState(false);

  const diseases: Disease[] = [
    { name: 'Diabetes', color: '#FFA500' },
    { name: 'Hypertension', color: '#FF4444' },
    { name: 'Cholesterol', color: '#4CAF50' }
  ];

  const profile: UserProfile = {
    name: "Elon Musk",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    streak: 7,
    lastCheckIn: new Date(),
    language: 'en-US',
    diseases: diseases,
    medicationHistory: [
      {
        date: new Date(),
        medications: [
          { medication: { name: 'Metformin', dosage: '500mg', frequency: 'Once daily', timing: ['Morning'], instructions: 'Take with breakfast', disease: diseases[0] }, taken: true, takenAt: new Date() },
          { medication: { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', timing: ['Morning'], instructions: 'Take with or without food', disease: diseases[1] }, taken: true, takenAt: new Date() }
        ]
      }
    ]
  };

  const notifications: Notification[] = [
    {
      id: '1',
      title: 'Medication Reminder',
      message: 'Time to take your morning medications',
      time: new Date(),
      read: false,
      disease: diseases[0]
    },
    {
      id: '2',
      title: 'Achievement Unlocked',
      message: "Congratulations! You've maintained a 7-day streak",
      time: new Date(),
      read: true
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8F7FA]">
      <Navbar profile={profile} notifications={notifications} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <div className="card p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center text-primary">
                <Upload className="w-6 h-6 mr-2" />
                Upload Prescription
              </h2>
              <div className="border-2 border-dashed border-primary/20 rounded-xl p-6 text-center">
                <p className="text-text-secondary">
                  Drag and drop your prescription or discharge summary here
                </p>
                <button className="btn-primary mt-4">
                  Upload File
                </button>
              </div>
            </div>

            <MedicationSchedule />
            <DietPlan diseases={diseases} />
          </div>

          <div className="space-y-8">
            <MedicationCalendar 
              medicationHistory={profile.medicationHistory}
              streak={profile.streak}
            />
            <ChatBot />
          </div>
        </div>
      </main>

      <button
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-4 right-4 p-4 bg-primary text-white rounded-full shadow-lg hover:bg-primary-dark transition-colors"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    </div>
  );
}

export default App;