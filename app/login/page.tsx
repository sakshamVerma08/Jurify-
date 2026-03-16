"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Scale, ArrowRight, Eye, EyeOff } from "lucide-react";

interface LoginFormData {
  email: string;
  password: string;
}

type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;
type Mode = "signin" | "signup";

export default function Login() {
  const router = useRouter();

  const [mode, setMode] = useState<Mode>("signin");
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (mode === "signin") {
      await authClient.signIn.email(
        {
          email: formData.email,
          password: formData.password,
          rememberMe: true,
          callbackURL: "/profile",
        },
        {
          onSuccess: () => {
            setLoading(false);
            router.push("/profile");
          },
          onError: (ctx) => {
            setError(ctx.error.message);
            setLoading(false);
          },
        }
      );
    } else {
      await authClient.signUp.email(
        {
          email: formData.email,
          password: formData.password,
          name: formData.email.split("@")[0],
          callbackURL: "/profile",
        },
        {
          onSuccess: () => {
            setLoading(false);
            setSuccess("Account created! Signing you in...");
            router.push("/profile");
          },
          onError: (ctx) => {
            setError(ctx.error.message);
            setLoading(false);
          },
        }
      );
    }
  };

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/profile",
    });
  };

  const handleChange = (e: InputChangeEvent) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=DM+Sans:wght@300;400;500&display=swap');

        .login-root {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          background-color: #0e0e10;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          position: relative;
          overflow: hidden;
        }

        .bg-glow {
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
        }
        .bg-glow-1 {
          top: -200px;
          left: -200px;
          background: radial-gradient(circle, rgba(180,140,80,0.07) 0%, transparent 70%);
        }
        .bg-glow-2 {
          bottom: -200px;
          right: -200px;
          background: radial-gradient(circle, rgba(100,120,200,0.06) 0%, transparent 70%);
        }

        .card {
          position: relative;
          width: 100%;
          max-width: 420px;
          background: #16161a;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 2.5rem 2.25rem;
          box-shadow: 0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03);
        }

        .logo-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 0.5rem;
        }
        .logo-icon {
          color: #c9a84c;
          display: flex;
        }
        .logo-wordmark {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.6rem;
          font-weight: 500;
          color: #f0ece4;
          letter-spacing: 0.02em;
        }

        .mode-tabs {
          display: flex;
          background: #1e1e24;
          border-radius: 8px;
          padding: 3px;
          margin: 1.75rem 0 1.5rem;
          gap: 3px;
        }
        .mode-tab {
          flex: 1;
          padding: 0.5rem;
          border: none;
          border-radius: 6px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s ease;
          background: transparent;
          color: #666;
        }
        .mode-tab.active {
          background: #2a2a32;
          color: #f0ece4;
          box-shadow: 0 1px 4px rgba(0,0,0,0.4);
        }
        .mode-tab:hover:not(.active) {
          color: #999;
        }

        .field-group {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
        }
        .field-wrap {
          position: relative;
        }
        .field-label {
          display: block;
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #666;
          margin-bottom: 0.4rem;
        }
        .field-input {
          width: 100%;
          background: #1e1e24;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 8px;
          padding: 0.7rem 0.9rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          color: #f0ece4;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          box-sizing: border-box;
        }
        .field-input::placeholder {
          color: #3a3a44;
        }
        .field-input:focus {
          border-color: rgba(201,168,76,0.4);
          box-shadow: 0 0 0 3px rgba(201,168,76,0.07);
        }
        .field-input.has-toggle {
          padding-right: 2.6rem;
        }
        .toggle-btn {
          position: absolute;
          right: 0.75rem;
          bottom: 0.7rem;
          background: none;
          border: none;
          color: #4a4a56;
          cursor: pointer;
          padding: 0;
          display: flex;
          align-items: center;
          transition: color 0.15s;
        }
        .toggle-btn:hover {
          color: #888;
        }

        .feedback {
          font-size: 0.78rem;
          text-align: center;
          margin-bottom: 1rem;
          padding: 0.55rem 0.75rem;
          border-radius: 7px;
        }
        .feedback.error {
          color: #f87171;
          background: rgba(248,113,113,0.07);
          border: 1px solid rgba(248,113,113,0.15);
        }
        .feedback.success {
          color: #6ee7b7;
          background: rgba(110,231,183,0.07);
          border: 1px solid rgba(110,231,183,0.15);
        }

        .btn-primary {
          width: 100%;
          background: #c9a84c;
          color: #0e0e10;
          border: none;
          border-radius: 8px;
          padding: 0.8rem 1rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background 0.2s ease, transform 0.1s ease, opacity 0.2s;
        }
        .btn-primary:hover:not(:disabled) {
          background: #d4b560;
        }
        .btn-primary:active:not(:disabled) {
          transform: scale(0.99);
        }
        .btn-primary:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .divider {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin: 1.25rem 0;
        }
        .divider-line {
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.06);
        }
        .divider-text {
          font-size: 0.7rem;
          color: #3a3a44;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .btn-google {
          width: 100%;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 8px;
          padding: 0.75rem 1rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          color: #aaa;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
        }
        .btn-google:hover {
          border-color: rgba(255,255,255,0.18);
          color: #f0ece4;
          background: rgba(255,255,255,0.02);
        }
        .google-icon {
          width: 16px;
          height: 16px;
          flex-shrink: 0;
        }

        .footer-note {
          text-align: center;
          margin-top: 1.5rem;
          font-size: 0.72rem;
          color: #3a3a44;
          line-height: 1.5;
        }
        .footer-link {
          color: #c9a84c;
          text-decoration: none;
          opacity: 0.8;
          transition: opacity 0.15s;
        }
        .footer-link:hover {
          opacity: 1;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .card { animation: fadeUp 0.35s ease both; }
      `}</style>

      <div className="login-root">
        <div className="bg-glow bg-glow-1" />
        <div className="bg-glow bg-glow-2" />

        <div className="card">
          {/* Logo */}
          <div className="logo-row">
            <span className="logo-icon"><Scale size={22} /></span>
            <span className="logo-wordmark">Lexis</span>
          </div>

          {/* Mode tabs */}
          <div className="mode-tabs">
            <button
              className={`mode-tab ${mode === "signin" ? "active" : ""}`}
              onClick={() => { setMode("signin"); setError(null); }}
            >
              Sign In
            </button>
            <button
              className={`mode-tab ${mode === "signup" ? "active" : ""}`}
              onClick={() => { setMode("signup"); setError(null); }}
            >
              Register
            </button>
          </div>

          {/* Feedback */}
          {error && <div className="feedback error">{error}</div>}
          {success && <div className="feedback success">{success}</div>}

          {/* Fields */}
          <div className="field-group">
            <div>
              <label className="field-label">Email</label>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className="field-input"
                autoComplete="email"
              />
            </div>

            <div>
              <label className="field-label">Password</label>
              <div className="field-wrap">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  className="field-input has-toggle"
                  autoComplete={mode === "signup" ? "new-password" : "current-password"}
                />
                <button
                  type="button"
                  className="toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>

          {/* Primary CTA */}
          <button onClick={handleSubmit} disabled={loading} className="btn-primary">
            {loading
              ? (mode === "signin" ? "Signing in…" : "Creating account…")
              : (mode === "signin" ? "Sign In" : "Create Account")}
            {!loading && <ArrowRight size={15} />}
          </button>

          {/* Divider */}
          <div className="divider">
            <div className="divider-line" />
            <span className="divider-text">or</span>
            <div className="divider-line" />
          </div>

          {/* Google */}
          <button onClick={handleGoogleLogin} className="btn-google">
            <svg className="google-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          {/* Footer */}
          <p className="footer-note">
            By continuing, you agree to our{" "}
            <a href="/terms" className="footer-link">Terms</a>
            {" "}and{" "}
            <a href="/privacy" className="footer-link">Privacy Policy</a>
          </p>
        </div>
      </div>
    </>
  );
}