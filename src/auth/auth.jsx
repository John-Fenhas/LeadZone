import { Outlet, useNavigate } from "react-router-dom";
import AuthHeader from "../components/AuthHeader";
import Footer from "../components/footer";

export default function Auth() {
  const navigate = useNavigate();

  function onSignUpSuccess() {
    navigate("/auth/check-your-email");
  }

  function onProfileComplete() {
    navigate("/dashboard");
  }
  function onSignInSuccess() {
    navigate("/dashboard");
  }

  return (
    <div className="relative mx-auto flex  max-w-6xl flex-col px-4 ">
      <AuthHeader />

      <main className="flex flex-1 items-center justify-center min-h-screen sm:py-16">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6 shadow-lg backdrop-blur-xl">
          <Outlet
            context={{
              onSignUpSuccess,
              onProfileComplete,
              onSignInSuccess,
            }}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
