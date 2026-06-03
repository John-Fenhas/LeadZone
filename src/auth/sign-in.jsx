import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Link, useOutletContext } from "react-router-dom";

export default function SignIn() {
  const [signInForm, setSignInForm] = useState({
    email: "",
    password: "",
  });

  const { onSignInSuccess } = useOutletContext();

  async function submitBtn(e) {
    e.preventDefault();
    e.stopPropagation();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: signInForm.email,
      password: signInForm.password,
    });
    if (error) {
      console.log("Sign in error:", error.message);
      return;
    }

    onSignInSuccess();
  }

  return (
    <div className="flex items-center justify-center bg-slate-950">
      <div className="w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-xl rounded shadow-[0_20px_60px_rgba(0,0,0,0.55)] p-8">
        <h1 className="text-2xl font-semibold text-center mb-6 text-white">
          Sign In
        </h1>

        <form onSubmit={submitBtn} className="space-y-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1 text-slate-200">Email</label>
              <input
                type="email"
                placeholder="email@example.com"
                className="w-full border border-white/10 rounded-xl px-3 py-2 bg-white/5 text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/60"
                value={signInForm.email}
                onChange={(e) =>
                  setSignInForm({ ...signInForm, email: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-1 text-slate-200">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full border border-white/10 rounded-xl px-3 py-2 bg-white/5 text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/60"
                value={signInForm.password}
                onChange={(e) =>
                  setSignInForm({ ...signInForm, password: e.target.value })
                }
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-xl transition cursor-pointer shadow-[0_10px_30px_rgba(79,70,229,0.35)] font-semibold"
          >
            Continue
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-slate-300">
          Don’t have an account?
          <Link to="/auth/signup">
            <button
              type="button"
              className="font-medium underline ml-1 cursor-pointer text-indigo-400 hover:text-indigo-300"
            >
              Sign up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
