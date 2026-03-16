"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Scale, ArrowRight, Eye, EyeOff, Briefcase, Users, BookOpen, Zap } from "lucide-react";

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
        @import url('https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500&family=Geist:wght@400;500;600&display=swap');

        * {
          box-sizing: border-box;
        }

        .auth-container {
          font-family: 'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          min-height: 100vh;
          background-color: #0a0a0a;
          display: flex;
          position: relative;
          overflow: hidden;
        }

        .bg-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
          z-index: 0;
        }
        .bg-glow-1 {
          width: 500px;
          height: 500px;
          top: -150px;
          left: -150px;
          background: radial-gradient(circle, rgba(201, 168, 76, 0.08) 0%, transparent 70%);
        }
        .bg-glow-2 {
          width: 400px;
          height: 400px;
          bottom: -100px;
          right: 5%;
          background: radial-gradient(circle, rgba(201, 168, 76, 0.05) 0%, transparent 70%);
        }

        .auth-wrapper {
          display: flex;
          width: 100%;
          position: relative;
          z-index: 1;
        }

        .form-section {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 2.5rem;
          background-color: #ffffff;
          min-height: 100vh;
        }

        .form-card {
          width: 100%;
          max-width: 380px;
        }

        .logo-section {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 2rem;
        }

        .logo-icon {
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #c9a84c;
        }

        .logo-text {
          font-size: 1.4rem;
          font-weight: 600;
          color: #0a0a0a;
          letter-spacing: -0.5px;
        }

        .auth-header {
          margin-bottom: 2rem;
        }

        .auth-title {
          font-size: 1.6rem;
          font-weight: 600;
          color: #0a0a0a;
          margin-bottom: 0.5rem;
        }

        .auth-subtitle {
          font-size: 0.9rem;
          color: #666;
          font-weight: 400;
        }

        .mode-tabs {
          display: flex;
          background: #f0f0f0;
          border-radius: 8px;
          padding: 4px;
          margin-bottom: 2rem;
          gap: 4px;
        }

        .mode-tab {
          flex: 1;
          padding: 0.65rem;
          border: none;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          cursor: pointer;
          background: transparent;
          color: #999;
          transition: all 0.2s ease;
          font-family: 'Geist', sans-serif;
        }

        .mode-tab.active {
          background: #ffffff;
          color: #0a0a0a;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
        }

        .mode-tab:hover:not(.active) {
          color: #666;
        }

        .field-group {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .field-wrap {
          position: relative;
          display: flex;
          flex-direction: column;
        }

        .field-label {
          display: block;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #666;
          margin-bottom: 0.5rem;
        }

        .field-input {
          width: 100%;
          background: #f9f9f9;
          border: 1.5px solid #e0e0e0;
          border-radius: 8px;
          padding: 0.85rem 0.95rem;
          font-family: 'Geist', sans-serif;
          font-size: 0.95rem;
          color: #0a0a0a;
          outline: none;
          transition: all 0.2s ease;
        }

        .field-input::placeholder {
          color: #bbb;
        }

        .field-input:focus {
          border-color: #c9a84c;
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(201, 168, 76, 0.1);
        }

        .field-input.has-toggle {
          padding-right: 2.8rem;
        }

        .toggle-btn {
          position: absolute;
          right: 0.95rem;
          top: 50%;
          transform: translateY(-50%);
          margin-top: 0.25rem;
          background: none;
          border: none;
          color: #999;
          cursor: pointer;
          padding: 0;
          display: flex;
          align-items: center;
          transition: color 0.2s;
        }

        .toggle-btn:hover {
          color: #666;
        }

        .feedback {
          font-size: 0.8rem;
          padding: 0.7rem 0.9rem;
          border-radius: 6px;
          margin-bottom: 1rem;
          border: 1px solid;
        }

        .feedback.error {
          color: #d32f2f;
          background: rgba(211, 47, 47, 0.08);
          border-color: rgba(211, 47, 47, 0.2);
        }

        .feedback.success {
          color: #388e3c;
          background: rgba(56, 142, 60, 0.08);
          border-color: rgba(56, 142, 60, 0.2);
        }

        .btn-primary {
          width: 100%;
          background: #c9a84c;
          color: #0a0a0a;
          border: none;
          border-radius: 8px;
          padding: 0.95rem 1rem;
          font-family: 'Geist', sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s ease;
        }

        .btn-primary:hover:not(:disabled) {
          background: #d4b560;
          box-shadow: 0 4px 12px rgba(201, 168, 76, 0.25);
        }

        .btn-primary:active:not(:disabled) {
          transform: scale(0.98);
        }

        .btn-primary:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .divider {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin: 1.5rem 0;
        }

        .divider-line {
          flex: 1;
          height: 1px;
          background: #e0e0e0;
        }

        .divider-text {
          font-size: 0.7rem;
          color: #999;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-weight: 500;
        }

        .btn-google {
          width: 100%;
          background: transparent;
          border: 1.5px solid #e0e0e0;
          border-radius: 8px;
          padding: 0.9rem 1rem;
          font-family: 'Geist', sans-serif;
          font-size: 0.9rem;
          color: #0a0a0a;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.2s ease;
          font-weight: 500;
        }

        .btn-google:hover {
          border-color: #c9a84c;
          background: #f9f9f9;
        }

        .google-icon {
          width: 18px;
          height: 18px;
          flex-shrink: 0;
        }

        .footer-note {
          text-align: center;
          margin-top: 1.5rem;
          font-size: 0.75rem;
          color: #999;
          line-height: 1.5;
        }

        .footer-link {
          color: #c9a84c;
          text-decoration: none;
          font-weight: 500;
          transition: opacity 0.2s;
        }

        .footer-link:hover {
          opacity: 0.8;
        }

        .promo-section {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
          padding: 3rem 2.5rem;
          color: #ffffff;
          position: relative;
          overflow: hidden;
        }

        .promo-content {
          max-width: 420px;
          z-index: 2;
        }

        .promo-badge {
          display: inline-block;
          background: rgba(201, 168, 76, 0.15);
          border: 1px solid rgba(201, 168, 76, 0.3);
          color: #c9a84c;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 1.5rem;
        }

        .promo-title {
          font-size: 2rem;
          font-weight: 600;
          margin-bottom: 1rem;
          line-height: 1.2;
          letter-spacing: -0.5px;
        }

        .promo-description {
          font-size: 1rem;
          color: #ccc;
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .promo-features {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .feature-item {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
        }

        .feature-icon {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(201, 168, 76, 0.1);
          border-radius: 8px;
          color: #c9a84c;
          flex-shrink: 0;
        }

        .feature-text {
          display: flex;
          flex-direction: column;
        }

        .feature-title {
          font-weight: 600;
          font-size: 0.95rem;
          margin-bottom: 0.2rem;
        }

        .feature-desc {
          font-size: 0.85rem;
          color: #aaa;
        }

        @media (max-width: 768px) {
          .auth-wrapper {
            flex-direction: column;
          }

          .form-section {
            min-height: auto;
            padding: 2rem 1.5rem;
          }

          .promo-section {
            min-height: 300px;
            padding: 2rem 1.5rem;
          }

          .promo-title {
            font-size: 1.5rem;
          }

          .auth-title {
            font-size: 1.3rem;
          }
        }

        @media (max-width: 480px) {
          .form-section {
            padding: 1.5rem 1rem;
          }

          .promo-section {
            padding: 1.5rem 1rem;
          }

          .form-card {
            max-width: 100%;
          }

          .promo-content {
            max-width: 100%;
          }

          .promo-title {
            font-size: 1.3rem;
          }

          .auth-title {
            font-size: 1.2rem;
          }

          .field-label {
            font-size: 0.7rem;
          }
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .form-section {
          animation: slideIn 0.4s ease-out;
        }
      `}</style>

      <div className="auth-container">
        <div className="bg-glow bg-glow-1" />
        <div className="bg-glow bg-glow-2" />

        <div className="auth-wrapper">
          {/* Form Section */}
          <div className="form-section">
            <div className="form-card">
              {/* Logo */}
              <div className="logo-section">
                <div className="logo-icon"><Scale size={24} /></div>
                <div className="logo-text">LexConnect</div>
              </div>

              {/* Header */}
              <div className="auth-header">
                <h1 className="auth-title">
                  {mode === "signin" ? "Welcome Back" : "Join LexConnect"}
                </h1>
                <p className="auth-subtitle">
                  {mode === "signin" 
                    ? "Sign in to your professional legal account" 
                    : "Create your legal professional account"}
                </p>
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
                <div className="field-wrap">
                  <label className="field-label">Email Address</label>
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

                <div className="field-wrap">
                  <label className="field-label">Password</label>
                  <div style={{ position: "relative" }}>
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
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Primary CTA */}
              <button onClick={handleSubmit} disabled={loading} className="btn-primary">
                {loading
                  ? (mode === "signin" ? "Signing in…" : "Creating account…")
                  : (mode === "signin" ? "Sign In" : "Create Account")}
                {!loading && <ArrowRight size={16} />}
              </button>

              {/* Divider */}
              <div className="divider">
                <div className="divider-line" />
                <span className="divider-text">or continue with</span>
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
                Google
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

          {/* Promo Section */}
          <div className="promo-section">
            <div className="promo-content">
              <div className="promo-badge">Professional Legal Network</div>
              
              <h2 className="promo-title">
                Connect, Grow & Serve Your Community
              </h2>
              
              <p className="promo-description">
                Join thousands of legal professionals finding meaningful pro bono opportunities, sharing expertise, and building lasting professional relationships.
              </p>

              <div className="promo-features">
                <div className="feature-item">
                  <div className="feature-icon">
                    <Briefcase size={20} />
                  </div>
                  <div className="feature-text">
                    <div className="feature-title">Pro Bono Cases</div>
                    <div className="feature-desc">Find meaningful cases aligned with your practice area</div>
                  </div>
                </div>

                <div className="feature-item">
                  <div className="feature-icon">
                    <Users size={20} />
                  </div>
                  <div className="feature-text">
                    <div className="feature-title">Professional Network</div>
                    <div className="feature-desc">Connect with peers and experienced mentors</div>
                  </div>
                </div>

                <div className="feature-item">
                  <div className="feature-icon">
                    <BookOpen size={20} />
                  </div>
                  <div className="feature-text">
                    <div className="feature-title">Share Insights</div>
                    <div className="feature-desc">Write and publish legal articles and knowledge</div>
                  </div>
                </div>

                <div className="feature-item">
                  <div className="feature-icon">
                    <Zap size={20} />
                  </div>
                  <div className="feature-text">
                    <div className="feature-title">AI Assistant</div>
                    <div className="feature-desc">Explain complex legal documents in plain English</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
