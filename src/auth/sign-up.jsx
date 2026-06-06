import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Link, useOutletContext } from "react-router-dom";
import CheckEmail from "./check-your-email";

export default function SignUp() {
  const [signUpFormData, setSignUpFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const passwordsMatch =
    signUpFormData.password === signUpFormData.confirmPassword &&
    signUpFormData.confirmPassword.length > 0;

  const passwordChecks = {
    minLength: signUpFormData.password.length >= 8,
    uppercase: /[A-Z]/.test(signUpFormData.password),
    lowercase: /[a-z]/.test(signUpFormData.password),
    number: /\d/.test(signUpFormData.password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(signUpFormData.password),
  };
  const passwordIsValid =
    passwordChecks.minLength &&
    passwordChecks.uppercase &&
    passwordChecks.lowercase &&
    passwordChecks.number &&
    passwordChecks.special;

  // sign up submit functions
  const { onSignUpSuccess } = useOutletContext();

  function getSnapshotFromState() {
    return {
      email: signUpFormData.email,
      password: signUpFormData.password,
      confirmPassword: signUpFormData.confirmPassword,
    };
  }

  async function submitBtn(e) {
    e.preventDefault();
    e.stopPropagation();

    if (!passwordsMatch) {
      setError("We couldn't sign you up, The passwords don't Match.");
      return;
    }
    if (!passwordIsValid) {
      setError(
        "We couldn't sign you up, Please meet all password requirements.",
      );
      return;
    }

    const snapShot = getSnapshotFromState();

    console.log(snapShot);

    const { data, signUpError } = await supabase.auth.signUp({
      email: snapShot.email,
      password: snapShot.password,
      options: {
        emailRedirectTo: "https://lead-zone.vercel.app/auth/setup-profile",
      },
    });

    if (signUpError) {
      console.error("signup error:", signUpError.message);
      return;
    }

    onSignUpSuccess();
  }

  return (
    <div className="flex items-center justify-center bg-slate-950">
      <div className="w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-xl rounded shadow-[0_20px_60px_rgba(0,0,0,0.55)] p-8">
        <h1 className="text-2xl font-semibold text-center mb-6 text-white">
          Create Account
        </h1>

        <form onSubmit={submitBtn} className="space-y-4">
          <div className="space-y-4">
            {/* <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="First name"
                  className="border border-slate-300 rounded px-3 py-2 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-600"
                  value={signUpFormData.firstName}
                  onChange={(e) =>
                    setSignUpFormData({ ...signUpFormData, firstName: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Last name"
                  className="border border-slate-300 rounded px-3 py-2 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-600"
                  value={signUpFormData.lastName}
                  onChange={(e) =>
                    setSignUpFormData({ ...signUpFormData, lastName: e.target.value })
                  }
                />
              </div>

              <input
                type="text"
                placeholder="Company"
                className="w-full border border-slate-300 rounded px-3 py-2 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-600"
                value={signUpFormData.companyName}
                onChange={(e) =>
                  setSignUpFormData({ ...signUpFormData, companyName: e.target.value })
                }
              /> */}

            <div>
              <label className="block text-sm mb-1 text-slate-200">Email</label>
              <input
                type="email"
                placeholder="email@example.com"
                className="w-full border border-white/10 rounded-xl px-3 py-2 bg-white/5 text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/60"
                value={signUpFormData.email}
                onChange={(e) =>
                  setSignUpFormData({
                    ...signUpFormData,
                    email: e.target.value,
                  })
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
                className={`w-full border rounded-xl px-3 py-2 bg-white/5 text-white placeholder:text-slate-400 outline-none focus:ring-2 border-white/10 focus:ring-indigo-500/30 focus:border-indigo-500/60`}
                value={signUpFormData.password}
                onChange={(e) =>
                  setSignUpFormData({
                    ...signUpFormData,
                    password: e.target.value,
                  })
                }
                required
              />
              {/*password UI validation*/}
              <div className="grid grid-cols-2  mt-2 text-xs space-y-1">
                <p
                  className={
                    passwordChecks.minLength
                      ? "text-green-400"
                      : "text-slate-400"
                  }
                >
                  ✓ At least 8 characters
                </p>

                <p
                  className={
                    passwordChecks.uppercase
                      ? "text-green-400"
                      : "text-slate-400"
                  }
                >
                  ✓ One uppercase letter
                </p>

                <p
                  className={
                    passwordChecks.lowercase
                      ? "text-green-400"
                      : "text-slate-400"
                  }
                >
                  ✓ One lowercase letter
                </p>

                <p
                  className={
                    passwordChecks.number ? "text-green-400" : "text-slate-400"
                  }
                >
                  ✓ One number
                </p>

                <p
                  className={
                    passwordChecks.special ? "text-green-400" : "text-slate-400"
                  }
                >
                  ✓ One special character
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm mb-1 text-slate-200">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className={`w-full border rounded-xl px-3 py-2 bg-white/5 text-white placeholder:text-slate-400 outline-none focus:ring-2
                    ${
                      !passwordsMatch && signUpFormData.confirmPassword
                        ? "border-red-500/60 focus:ring-red-500/30"
                        : "border-white/10 focus:ring-indigo-500/30 focus:border-indigo-500/60"
                    }
                  `}
                value={signUpFormData.confirmPassword}
                onChange={(e) =>
                  setSignUpFormData({
                    ...signUpFormData,
                    confirmPassword: e.target.value,
                  })
                }
                required
              />

              {!passwordsMatch && signUpFormData.confirmPassword && (
                <p className="text-sm text-red-400">Passwords do not match</p>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center">
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-xl transition cursor-pointer shadow-[0_10px_30px_rgba(79,70,229,0.35)] font-semibold mb-3"
            >
              Sign Up
            </button>
            {error ? (
              <span className="text-xs text-red-400 text-nowrap">{error}</span>
            ) : null}
          </div>
        </form>

        <div className="text-center mt-6 text-sm text-slate-300">
          Already have an account?
          <Link to="/auth/login">
            <button
              type="button"
              className="font-medium underline ml-1 cursor-pointer text-indigo-400 hover:text-indigo-300"
            >
              Sign in
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
