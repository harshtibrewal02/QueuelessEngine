"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchAPI } from "@/lib/api";
import Link from "next/link";
import { MapPin, Users, Clock } from "lucide-react";

export default function QueueViewer() {
  const { businessId } = useParams();
  const [business, setBusiness] = useState<any>(null);
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Joining Flow
  const [name, setName] = useState("");
  const [myTicket, setMyTicket] = useState<any>(null);
  const [joinLoading, setJoinLoading] = useState(false);

  const fetchStatus = async () => {
    try {
      const s = await fetchAPI(`/queue/status/${businessId}`);
      setStatus(s);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        const b = await fetchAPI(`/business/${businessId}`);
        setBusiness(b);
        await fetchStatus();
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    init();

    const interval = setInterval(fetchStatus, 3000);
    return () => clearInterval(interval);
  }, [businessId]);

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    setJoinLoading(true);
    try {
      const ticket = await fetchAPI(`/queue/join`, {
        method: "POST",
        body: JSON.stringify({ business_id: Number(businessId), customer_name: name })
      });
      setMyTicket(ticket);
      // Immediately refresh status after joining
      fetchStatus();
    } catch (err) {
      alert("Error joining queue: " + err);
    } finally {
      setJoinLoading(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-slate-50 p-10 flex text-center justify-center font-bold text-slate-400">Loading Queue...</div>;
  if (!business) return <div className="min-h-screen bg-slate-50 p-10 text-center font-bold text-red-500">Business Not Found</div>;

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 md:px-0">
      <div className="max-w-xl mx-auto">
        <Link href="/businesses" className="text-primary-600 font-bold text-sm mb-6 inline-block hover:underline">← Back to Places</Link>
        
        <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute top-0 w-full h-2 bg-gradient-to-r from-blue-500 to-primary-500"></div>
          
          <MapPin className="w-12 h-12 text-primary-500 mb-4" />
          <h1 className="text-3xl font-black text-slate-800 mb-2">{business.name}</h1>
          <p className="text-slate-500 mb-8 font-medium">Virtual Queue Room</p>

          <div className="w-full bg-slate-50 p-6 rounded-2xl flex justify-between items-center mb-8 border border-slate-100">
            <div className="text-center w-1/2 border-r border-slate-200">
              <p className="text-sm text-slate-500 font-bold uppercase tracking-wide">Waiting</p>
              <p className="text-4xl font-black text-indigo-600 mt-1">{status?.total_waiting || 0}</p>
            </div>
            <div className="text-center w-1/2">
              <p className="text-sm text-slate-500 font-bold uppercase tracking-wide">Serving</p>
              <p className="text-4xl font-black text-blue-600 mt-1">#{status?.currently_serving || "--"}</p>
            </div>
          </div>

          {!myTicket ? (
            <div className="w-full bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
              <h2 className="font-bold text-blue-900 mb-4 text-left">Join the line virtually:</h2>
              <form onSubmit={handleJoin} className="flex flex-col gap-3">
                <input 
                  required 
                  placeholder="Your Name (e.g. John)" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-400 font-medium"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <button 
                  disabled={joinLoading}
                  className="w-full py-4 bg-primary-600 hover:bg-primary-500 transition-colors text-white font-black rounded-xl shadow-md disabled:bg-slate-300"
                >
                  {joinLoading ? "Securing Spot..." : "Get Ticket"}
                </button>
              </form>
            </div>
          ) : (
            <div className="w-full bg-gradient-to-br from-indigo-600 to-purple-700 p-8 rounded-2xl text-white shadow-2xl relative overflow-hidden transform transition-all">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
              
              <p className="text-indigo-100 font-semibold mb-2 uppercase tracking-wide text-sm">Your Digital Ticket</p>
              <div className="text-7xl font-black mb-6 drop-shadow-md">#{myTicket.queue_number}</div>
              
              <div className="flex bg-black/20 p-4 rounded-xl justify-between items-center backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 opacity-80" />
                  <span className="font-medium text-sm">Est. Wait Time:</span>
                </div>
                <span className="font-bold text-lg">{myTicket.estimated_wait_time} min</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
