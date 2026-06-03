import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/70 backdrop-blur-xl border-b border-white/10">
      <div className="w-full md:w-5/6 mx-auto px-3 md:px-8 h-16 flex items-center justify-between">
        <Link to="/">
          <div className="text-normal md:text-lg font-bold tracking-tight text-white">
            Lead<span className="text-indigo-400">Zone</span>
          </div>
        </Link>

        <div className="flex items-center gap-3 md:gap-6">
          <Link to="/auth/login">
            <button className="bg-white/5 text-slate-200 border border-white/10 hover:bg-white/10 hover:border-white/20 md:px-4 md:py-2 px-3 py-1.5 rounded-xl text-xs md:text-sm font-medium transition cursor-pointer">
              Sign In
            </button>
          </Link>

          <Link to="/auth/signup">
            <button className="bg-indigo-600 hover:bg-indigo-500 text-white md:px-4 md:py-2 px-3 py-1.5 rounded-xl text-xs md:text-sm font-semibold transition cursor-pointer shadow-[0_10px_30px_rgba(79,70,229,0.35)]">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}
