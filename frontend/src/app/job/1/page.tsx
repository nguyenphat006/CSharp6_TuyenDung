"use client";

import Header from "@/components/layout/UserComponents/Header/Header";
import Footer from "@/components/layout/UserComponents/Footer/Footer";
import Search from "@/components/layout/UserComponents/SearchComponents/Search";
import ViecLamIT from "@/components/layout/UserComponents/viec-lam-it/viec-lam-it";

export default function ViecLamITPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow bg-white">
        <Search />
        <ViecLamIT />
      </main>
      <Footer />
    </div>
  );
}
