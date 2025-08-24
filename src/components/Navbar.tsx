import React, { useState } from 'react';
import { Bell, User, Calendar as CalendarIcon, LogOut } from 'lucide-react';
import Calendar from 'react-calendar';
import { UserProfile, Notification } from '../types';

interface NavbarProps {
  profile: UserProfile;
  notifications: Notification[];
}

export default function Navbar({ profile, notifications }: NavbarProps) {
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const unreadNotifications = notifications.filter(n => !n.read).length;

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Bell className="w-8 h-8 text-blue-500" />
            <span className="ml-2 text-xl font-semibold">MedAssist</span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setShowCalendar(!showCalendar)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <CalendarIcon className="w-6 h-6 text-gray-600" />
              </button>
              {showCalendar && (
                <div className="absolute right-0 mt-2 z-50">
                  <Calendar
                    className="bg-white rounded-lg shadow-xl p-4"
                    tileClassName={({ date }) => {
                      const dateStr = date.toISOString().split('T')[0];
                      return 'hover:bg-blue-100 rounded-full';
                    }}
                  />
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-full hover:bg-gray-100 relative"
              >
                <Bell className="w-6 h-6 text-gray-600" />
                {unreadNotifications > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadNotifications}
                  </span>
                )}
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-50">
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">Notifications</h3>
                    <div className="space-y-2">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-2 rounded ${
                            notification.read ? 'bg-gray-50' : 'bg-blue-50'
                          }`}
                        >
                          <h4 className="font-medium">{notification.title}</h4>
                          <p className="text-sm text-gray-600">
                            {notification.message}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100"
              >
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex items-center">
                  <span className="text-sm font-medium">{profile.name}</span>
                  <div className="ml-2 flex items-center space-x-1">
                    <span className="text-sm font-bold text-blue-500">
                      {profile.streak}
                    </span>
                    <span className="text-xs text-gray-500">days</span>
                  </div>
                </div>
              </button>
              {showProfile && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-50">
                  <div className="p-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <img
                        src={profile.avatar}
                        alt={profile.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <h3 className="font-medium">{profile.name}</h3>
                        <p className="text-sm text-gray-500">
                          {profile.streak} day streak
                        </p>
                      </div>
                    </div>
                    <button className="flex items-center space-x-2 w-full p-2 text-red-600 hover:bg-red-50 rounded">
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}