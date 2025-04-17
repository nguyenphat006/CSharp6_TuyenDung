"use client";

import Header from "@/components/layout/UserComponents/Header/Header";
import Footer from "@/components/layout/UserComponents/Footer/Footer";
import Profile from "@/components/layout/UserComponents/ProfileComponents/Profile";

export default function ViecLamITPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow bg-white">
        <Profile />
      </main>
      <Footer />
    </div>
  );
}
