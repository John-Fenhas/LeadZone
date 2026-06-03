import { Link } from "react-router-dom";

export default function HeroSection({ onSignUp, onSignIn }) {
  return (
    <section className="relative min-h-screen flex items-center pt-20 md:pt-16">
      <div className="relative w-11/12 md:w-5/6 mx-auto px-8 lg:px-12 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide uppercase text-slate-300 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-6">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(52,211,153,0.6)]" />
            Real Estate Lead CRM
          </p>

          <h1 className="text-3xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight mb-6 text-white">
            Turn Property <br />
            Leads Into <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-cyan-300">
              Closed Deals
            </span>
          </h1>

          <p className="text-slate-300 max-w-xl mb-10 text-base md:text-lg leading-relaxed">
            Lead Zone helps real estate agents capture, organize, and follow up
            with leads faster — without spreadsheets or missed opportunities.
          </p>

          <div className="flex flex-col items-center sm:flex-row gap-4">
            <Link to="/auth/signup">
              <button
                onClick={onSignUp}
                className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-xl font-semibold transition shadow-[0_10px_30px_rgba(79,70,229,0.35)] cursor-pointer text-nowrap"
              >
                Start Free
              </button>
            </Link>

            <Link to="/auth/login">
              <button
                onClick={onSignIn}
                className="w-full sm:w-auto px-8 py-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-slate-200 font-semibold transition cursor-pointer"
              >
                Sign In
              </button>
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-3 md:gap-6 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <span className="text-slate-500">Setup:</span>
              <span className="text-slate-200 font-medium">2 minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-500">Follow-ups:</span>
              <span className="text-slate-200 font-medium">Faster</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-500">Workflow:</span>
              <span className="text-slate-200 font-medium">
                No spreadsheets
              </span>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 rounded-3xl bg-linear-to-r from-indigo-500/10 to-cyan-500/10 blur-xl sm:blur-2xl" />

          <div className="relative bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl backdrop-blur-xl p-4 sm:p-6">
            <div className="flex justify-between items-center mb-4 sm:mb-5 text-xs sm:text-sm text-slate-300">
              <span className="font-medium">New Leads</span>
              <span className="text-emerald-300 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 sm:px-3 rounded-full whitespace-nowrap">
                +12 today
              </span>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <div className="flex justify-between items-center bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-xs">
                <span className="font-semibold text-white">John Smith</span>
                <span className="text-indigo-300 font-medium text-[0.68rem]">
                  New
                </span>
              </div>
              <div className="flex justify-between items-center bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-xs">
                <span className="font-semibold text-white">Sarah Ahmed</span>
                <span className="text-indigo-300 font-medium text-[0.68rem]">
                  Follow-up
                </span>
              </div>
              <div className="flex justify-between items-center bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-xs">
                <span className="font-semibold text-white">Michael Lee</span>
                <span className="text-indigo-300 font-medium text-[0.68rem]">
                  Viewing Booked
                </span>
              </div>
            </div>

            <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-white/10 text-[10px] sm:text-xs text-slate-400">
              Assign leads • Add notes • Track status • Close deals ✅
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
