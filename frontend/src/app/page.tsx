import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden bg-slate-900">
      {/* Background aesthetic gradients */}
      <div className="absolute top-0 left-[-10%] w-[500px] h-[500px] bg-blue-600/30 rounded-full mix-blend-screen filter blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/30 rounded-full mix-blend-screen filter blur-[120px] pointer-events-none"></div>
      <div className="absolute top-[30%] left-[30%] w-[400px] h-[400px] bg-teal-500/20 rounded-full mix-blend-screen filter blur-[100px] pointer-events-none"></div>

      <div className="z-10 text-center px-6 w-full max-w-5xl mx-auto flex flex-col items-center">
        <div className="glass-dark p-12 md:p-16 rounded-3xl shadow-2xl border border-white/10 max-w-4xl w-full">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 drop-shadow-sm">
            QueueLess
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
            Skip the wait. Join lines instantly from your phone, or manage your business queues with elegant ease.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full px-4">
            <Link 
              href="/businesses" 
              className="px-8 py-4 bg-white text-slate-900 font-bold rounded-full hover:bg-slate-100 hover:-translate-y-1 transition-all duration-300 shadow-xl hover:shadow-2xl w-full sm:w-auto text-lg items-center justify-center flex"
            >
              Join a Queue
            </Link>
            <Link 
              href="/admin/login" 
              className="px-8 py-4 bg-primary-600 text-white font-bold rounded-full hover:bg-primary-500 hover:-translate-y-1 transition-all duration-300 shadow-xl hover:shadow-primary-500/30 w-full sm:w-auto text-lg border border-primary-400/50 items-center justify-center flex"
            >
              Business Login
            </Link>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 text-slate-500 text-sm">
        Powered by Next.js & FastAPI
      </div>
    </div>
  );
}
