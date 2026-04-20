"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchAPI } from "@/lib/api";

export default function BusinessList() {
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAPI("/business/")
      .then(setBusinesses)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-slate-50 flex items-center justify-center font-semibold text-slate-500">Loading queues...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10 text-center">
          <Link href="/" className="text-primary-600 font-bold mb-4 inline-block hover:underline">← Home</Link>
          <h1 className="text-4xl font-extrabold text-slate-800">Available Queues</h1>
          <p className="text-slate-500 mt-2">Pick a location to securely join their virtual line.</p>
        </header>

        {businesses.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-3xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-700">No active businesses found!</h3>
            <p className="text-slate-500">Come back later when lines are open.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {businesses.map(b => (
              <div key={b.id} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-xl transition-shadow cursor-pointer flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">{b.name}</h2>
                  <p className="text-sm text-slate-400 mt-1">Est. {b.avg_service_time} min / person</p>
                </div>
                <Link href={`/queue/${b.id}`} className="mt-6 w-full py-3 bg-primary-50 text-primary-600 font-bold text-center rounded-xl hover:bg-primary-100 transition-colors">
                  Join Line
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
