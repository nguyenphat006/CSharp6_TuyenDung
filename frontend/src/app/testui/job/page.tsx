"use client";

import Job from "@/components/layout/UserComponents/Job/Job";

export default function JobPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-grow bg-white">
        <Job />
      </main>
    </div>
  );
}
