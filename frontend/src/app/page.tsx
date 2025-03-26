"use client";

import Header from "@/components/layout/UserComponents/Header/Header";
import Footer from "@/components/layout/UserComponents/Footer/Footer";
import Search from "@/components/layout/UserComponents/SearchComponents/Search";
import CompanyList from "@/components/layout/UserComponents/company/CompanyList";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow bg-white">
        <Search />
        <CompanyList />
      </main>
      <Footer />
    </div>
  );
}
