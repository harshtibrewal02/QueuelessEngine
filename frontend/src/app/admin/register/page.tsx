"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { fetchAPI } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await fetchAPI("/auth/register", {
        method: "POST",
        body: JSON.stringify({ ...formData, role: "admin" })
      });

      // Automatically log them in after registration
      const loginData = new URLSearchParams();
      loginData.append("username", formData.email);
      loginData.append("password", formData.password);

      const res = await fetchAPI("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: loginData.toString()
      });

      localStorage.setItem("token", res.access_token);
      router.push("/admin/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 relative overflow-hidden py-12">
      <div className="absolute top-10 right-10 w-72 h-72 bg-purple-600/30 rounded-full mix-blend-screen filter blur-[100px] pointer-events-none"></div>
      
      <div className="glass-dark p-10 rounded-3xl shadow-2xl border border-white/10 w-full max-w-md z-10 mx-4">
        <div className="mb-8 text-center">
          <Link href="/" className="text-primary-400 font-bold mb-4 block hover:text-primary-300 transition-colors">← Back to Home</Link>
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-slate-400">Join QueueLess in 30 seconds.</p>
        </div>

        {error && <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-sm">{error}</div>}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Your Name</label>
            <input 
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all placeholder-slate-500"
              placeholder="Harsh"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Email Address</label>
            <p className="text-xs text-slate-500 mb-2">Must be @gmail.com, @yahoo.com, etc.</p>
            <input 
              type="email" 
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all placeholder-slate-500"
              placeholder="you@gmail.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Phone Number</label>
            <input 
              type="tel" 
              required
              minLength={10}
              maxLength={15}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all placeholder-slate-500"
              placeholder="1234567890"
              value={formData.phone_number}
              onChange={(e) => setFormData({...formData, phone_number: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
            <input 
              type="password" 
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all placeholder-slate-500"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 mt-2 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-primary-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Registering..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-slate-400 text-sm">
          Already have an account? <Link href="/admin/login" className="text-primary-400 hover:text-primary-300 font-medium">Login here</Link>
        </p>
      </div>
    </div>
  );
}
