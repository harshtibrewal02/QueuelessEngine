"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchAPI } from "@/lib/api";
import { Users, Clock, PlayCircle, CircleCheck, Archive, LogOut } from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const [business, setBusiness] = useState<any>(null);
  const [queueStatus, setQueueStatus] = useState<any>(null);
  const [queueList, setQueueList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Business Creation Form State
  const [createData, setCreateData] = useState({ name: "", avg_service_time: 5, is_queue_open: true });

  const fetchDashboardData = async () => {
    try {
      const b = await fetchAPI("/business/my");
      setBusiness(b);
      const [status, list] = await Promise.all([
        fetchAPI(`/queue/status/${b.id}`),
        fetchAPI(`/queue/list/${b.id}`)
      ]);
      setQueueStatus(status);
      setQueueList(list);
    } catch (err: any) {
      if (err.message !== "No business registered") {
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(() => {
      if (business) fetchDashboardData();
    }, 3000); // Live poll every 3 seconds
    return () => clearInterval(interval);
  }, [business?.id]);

  const handleCreateBusiness = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetchAPI("/business/", {
        method: "POST",
        body: JSON.stringify(createData)
      });
      fetchDashboardData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleNextPatient = async () => {
    try {
      await fetchAPI(`/queue/next?business_id=${business.id}`, { method: "POST" });
      fetchDashboardData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleArchivePatient = async (entryId: number) => {
    try {
      await fetchAPI(`/queue/archive/${entryId}`, { method: "PUT" });
      fetchDashboardData();
    } catch (err) {
      console.error(err);
    }
  };

  const clearQueueDay = async () => {
    if (!confirm("Are you sure you want to archive all remaining patients?")) return;
    try {
      await fetchAPI(`/queue/clear?business_id=${business.id}`, { method: "DELETE" });
      fetchDashboardData();
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/admin/login");
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">Loading Dashboard...</div>;

  // View 1: Setup Required
  if (!business) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 relative">
        <div className="absolute top-[20%] left-[20%] w-[400px] h-[400px] bg-pink-500/20 rounded-full mix-blend-screen filter blur-[100px] pointer-events-none"></div>
        <div className="glass-dark p-10 rounded-2xl max-w-lg w-full z-10 mx-4 border border-white/10 shadow-2xl">
          <h1 className="text-3xl font-bold text-white mb-2">Create Your Business</h1>
          <p className="text-slate-400 mb-8">Before you can manage queues, configure your settings.</p>
          <form onSubmit={handleCreateBusiness} className="space-y-4">
            <div>
              <label className="block text-sm text-slate-300">Business Name</label>
              <input required className="w-full mt-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none" value={createData.name} onChange={e => setCreateData({...createData, name: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm text-slate-300">Avg Minutes Per Patient</label>
              <input type="number" required className="w-full mt-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none" value={createData.avg_service_time} onChange={e => setCreateData({...createData, avg_service_time: Number(e.target.value)})} />
            </div>
            <button className="w-full py-4 mt-6 bg-primary-600 font-bold text-white rounded-xl shadow-lg hover:shadow-primary-600/50 hover:bg-primary-500 transition-all">Launch Dashboard</button>
          </form>
        </div>
      </div>
    );
  }

  // View 2: Live Dashboard
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <nav className="bg-white shadow-sm border-b border-slate-200 px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">{business.name}</h1>
        <button onClick={logout} className="flex items-center text-sm font-semibold text-slate-500 hover:text-red-500 transition-colors">
          <LogOut className="w-4 h-4 mr-2" /> Logout
        </button>
      </nav>

      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Status Cards */}
        <div className="col-span-1 space-y-6">
          <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
            <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <h2 className="text-primary-100 font-medium mb-1">Now Serving</h2>
            <div className="text-6xl font-black mb-4">#{queueStatus?.currently_serving || "--"}</div>
            <button onClick={handleNextPatient} className="w-full py-4 bg-white text-primary-700 font-bold rounded-xl shadow-sm hover:scale-[1.02] transition-transform">
              Call Next Patient
            </button>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm font-medium">Currently Waiting</p>
              <p className="text-3xl font-bold text-slate-800">{queueStatus?.total_waiting}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <Users />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm font-medium">Est. Wait Time</p>
              <p className="text-3xl font-bold text-slate-800">{queueStatus?.estimated_wait_time} min</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
              <Clock />
            </div>
          </div>

          <button onClick={clearQueueDay} className="w-full py-4 bg-red-50 text-red-600 font-bold rounded-xl shadow-sm hover:bg-red-100 transition-colors border border-red-200">
            End of Day: Clear Queue
          </button>
        </div>

        {/* Live Patient List */}
        <div className="col-span-2 bg-white rounded-3xl shadow-sm border border-slate-100 p-8 flex flex-col h-[80vh]">
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center">Live Live Operations <span className="ml-3 inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse"></span></h2>
          
          <div className="flex-1 overflow-y-auto pr-4 space-y-3">
            {queueList.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-400">
                <Users className="w-12 h-12 mb-3 opacity-20" />
                <p>The queue is empty.</p>
              </div>
            ) : (
              queueList.map((entry) => (
                <div key={entry.id} className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${entry.status === 'serving' ? 'bg-primary-50 border-primary-200 shadow-sm' : entry.status === 'done' ? 'bg-slate-50 border-slate-200 opacity-60' : 'bg-white border-slate-200'} `}>
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${entry.status === 'serving' ? 'bg-primary-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                      #{entry.queue_number}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800">{entry.customer_name}</h3>
                      <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{entry.status}</p>
                    </div>
                  </div>
                  
                  {entry.status === 'done' && (
                    <button onClick={() => handleArchivePatient(entry.id)} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Archive completed patient">
                      <Archive className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
