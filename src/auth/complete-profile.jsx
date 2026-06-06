import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useAuth } from "../context/AuthProvider";
import { useOutletContext } from "react-router-dom";

export default function CompleteProfile() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
  });

  const { session, user, loading } = useAuth();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    console.log(user);
  }

  const { onProfileComplete } = useOutletContext();

  async function handleSubmit(e) {
    e.preventDefault();
    const { data, error } = await supabase
      .from("profiles")
      .update({
        first_name: formData.firstName,
        last_name: formData.lastName,
        company: formData.company,
      })
      .eq("id", user.id);

    onProfileComplete();
  }

  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <div className="text-2xl font-semibold tracking-tight text-white">
          Lead<span className="text-indigo-400 font-bold">Zone</span>
        </div>
      </div>

      <p className="text-xs text-slate-400 text-center mb-2">
        Step 2 of 2 · Account setup
      </p>

      <h1 className="text-2xl font-semibold text-center mb-2 text-white">
        Complete your profile
      </h1>

      <p className="text-sm text-slate-300 text-center mb-6">
        This helps us set up your workspace and personalize your experience.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full border border-white/10 rounded-xl px-3 py-2 bg-white/5 text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/60"
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-full border border-white/10 rounded-xl px-3 py-2 bg-white/5 text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/60"
          />
        </div>

        <input
          type="text"
          name="company"
          placeholder="Company (optional)"
          value={formData.company}
          onChange={handleChange}
          className="w-full border border-white/10 rounded-xl px-3 py-2 bg-white/5 text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/60"
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl py-2 font-semibold transition cursor-pointer shadow-[0_10px_30px_rgba(79,70,229,0.35)]"
        >
          Continue
        </button>
      </form>

      <p className="text-xs text-slate-400 text-center mt-4">
        You can update this information later.
      </p>
    </div>
  );
}
