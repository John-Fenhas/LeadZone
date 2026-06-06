import { Link } from "react-router-dom";

export default function AuthHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/70 backdrop-blur-xl border-b border-white/10">
      <div className="w-full xl:max-w-5/6 mx-auto px-8 h-16 flex items-center justify-between">
        <Link to="/">
          <div className="text-lg font-bold tracking-tight text-white">
            Lead<span className="text-indigo-400">Zone</span>
          </div>
        </Link>

        <div className="w-[140px]" />
      </div>
    </header>
  );
}
