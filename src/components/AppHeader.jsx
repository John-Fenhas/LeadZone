import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function AppHeader() {
  const navigate = useNavigate();

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("logout error:", error.message);
      return;
    }

    navigate("/");
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/70 backdrop-blur-xl border-b border-white/10">
      <div className="w-11/12 xl:max-w-5/6 mx-auto xl:px-10 h-16 flex items-center justify-between">
        <Link to="/dashboard">
          <div className="text-lg font-bold tracking-tight text-white">
            Lead<span className="text-indigo-400">Zone</span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="h-10 w-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition flex items-center justify-center cursor-pointer"
            onClick={() => navigate("/dashboard/profile")}
            aria-label="Profile"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.6}
              stroke="currentColor"
              className="w-5 h-5 text-slate-200"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 20.25a7.5 7.5 0 0 1 15 0"
              />
            </svg>
          </button>

          <button
            onClick={handleLogout}
            className="bg-white/5 text-slate-200 border border-white/10 hover:bg-white/10 hover:border-white/20 px-4 py-2 rounded-xl text-sm font-medium transition cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
