import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast, Toaster } from "react-hot-toast";

/**
 * Beautiful, responsive Login Page with dark mode compatibility and micro-animations.
 */
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    const res = await login(email, password);
    setIsSubmitting(false);

    if (res.success) {
      toast.success("Welcome back!");
      navigate("/");
    } else {
      toast.error(res.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-50 px-4 py-8 text-slate-900 transition-colors duration-200 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 dark:text-slate-100 sm:px-6 lg:px-8">
      <Toaster />
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-800 md:grid-cols-2">
          <div className="hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 p-8 text-white md:flex md:flex-col md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">Startup CRM</p>
              <h2 className="mt-6 text-3xl font-semibold leading-tight">Manage leads with clarity and speed.</h2>
              <p className="mt-4 max-w-sm text-sm text-blue-50/90">Track opportunities, keep your pipeline moving, and stay on top of every customer conversation.</p>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/10 p-4 text-sm backdrop-blur-sm">
              <p className="font-medium">Trusted by modern teams</p>
              <p className="mt-1 text-blue-100">Clean reporting, fast updates, simple onboarding.</p>
            </div>
          </div>

          <div className="px-6 py-8 sm:px-8 lg:px-10">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">Welcome back</h1>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 sm:text-base">
                Sign in to continue your workspace
              </p>
            </div>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:ring-blue-500/30"
                    placeholder="name@company.com"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:ring-blue-500/30"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full justify-center rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Signing in..." : "Sign in"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-300">
              New here?{' '}
              <Link
                to="/register"
                className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
