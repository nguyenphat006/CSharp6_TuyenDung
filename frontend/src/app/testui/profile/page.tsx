"use client";

import React from 'react';
import Profile from '@/components/layout/UserComponents/ProfileComponents/Profile';

const ProfilePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-grow">
        <Profile />
      </main>
    </div>
  );
};

export default ProfilePage;
