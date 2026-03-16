"use client";
import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { ArrowRight, Scale, Eye, EyeOff, Shield, Users, Briefcase } from "lucide-react";

interface RegisterFormData{

  name: string;
  email: string;
  password: string;
};

type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;
export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<boolean|string|null>("");

  const handleChange = (e: InputChangeEvent) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSignUp = async () => {
    setIsLoading(true);
    setError("");

    const { data, error } = await authClient.signUp.email(
      {
        email: formData.email,
        password: formData.password,
        name: formData.name,
        callbackURL: "/profile",
      },
      {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: () => {
          // redirect to /profile route
        },
        onError: (ctx) => {
          setError(ctx.error.message);
          setIsLoading(false);
        },
      }
    );  
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Crimson+Pro:ital,wght@0,300;0,400;1,300&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .register-root {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          font-family: 'Crimson Pro', Georgia, serif;
          background: #0a0a08;
        }

        /* ── Left Panel ── */
        .left-panel {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 3rem;
          background: #0d0d0b;
          border-right: 1px solid #2a2a22;
          overflow: hidden;
        }

        .left-panel::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 50% at 20% 80%, rgba(180,152,90,0.08) 0%, transparent 70%),
            radial-gradient(ellipse 40% 60% at 80% 20%, rgba(180,152,90,0.05) 0%, transparent 70%);
          pointer-events: none;
        }

        .left-watermark {
          position: absolute;
          bottom: -4rem;
          right: -4rem;
          width: 28rem;
          height: 28rem;
          border: 1px solid rgba(180,152,90,0.06);
          border-radius: 50%;
          pointer-events: none;
        }
        .left-watermark::before {
          content: '';
          position: absolute;
          inset: 2rem;
          border: 1px solid rgba(180,152,90,0.04);
          border-radius: 50%;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          position: relative;
          z-index: 1;
        }

        .brand-icon {
          width: 2.5rem;
          height: 2.5rem;
          background: linear-gradient(135deg, #b4985a, #8a7240);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0a0a08;
        }

        .brand-name {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.5rem;
          font-weight: 600;
          color: #e8e0cc;
          letter-spacing: 0.02em;
        }

        .brand-name span {
          color: #b4985a;
        }

        .left-content {
          position: relative;
          z-index: 1;
        }

        .left-tagline {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 2.8rem;
          font-weight: 500;
          color: #e8e0cc;
          line-height: 1.2;
          margin-bottom: 1.5rem;
          letter-spacing: -0.01em;
        }

        .left-tagline em {
          font-style: italic;
          color: #b4985a;
        }

        .left-desc {
          font-size: 1.05rem;
          color: #7a7260;
          line-height: 1.7;
          font-weight: 300;
          max-width: 30ch;
          margin-bottom: 3rem;
        }

        .stats-row {
          display: flex;
          gap: 2.5rem;
        }

        .stat {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .stat-number {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.8rem;
          font-weight: 600;
          color: #b4985a;
        }

        .stat-label {
          font-size: 0.8rem;
          color: #4a4535;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .trust-badges {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .trust-badge {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.82rem;
          color: #4a4535;
          letter-spacing: 0.04em;
        }

        .trust-badge svg {
          color: #b4985a;
          opacity: 0.7;
          flex-shrink: 0;
        }

        /* ── Right Panel ── */
        .right-panel {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3rem 4rem;
          background: #0a0a08;
        }

        .form-container {
          width: 100%;
          max-width: 400px;
        }

        .form-header {
          margin-bottom: 2.5rem;
        }

        .form-eyebrow {
          font-size: 0.72rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #b4985a;
          margin-bottom: 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .form-eyebrow::before {
          content: '';
          display: block;
          width: 1.5rem;
          height: 1px;
          background: #b4985a;
          opacity: 0.6;
        }

        .form-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 2rem;
          font-weight: 500;
          color: #e8e0cc;
          letter-spacing: -0.01em;
          line-height: 1.2;
          margin-bottom: 0.5rem;
        }

        .form-subtitle {
          font-size: 0.92rem;
          color: #4a4535;
          font-weight: 300;
        }

        .form-subtitle a {
          color: #b4985a;
          text-decoration: none;
          border-bottom: 1px solid rgba(180,152,90,0.3);
          transition: border-color 0.2s;
        }

        .form-subtitle a:hover {
          border-color: #b4985a;
        }

        /* Fields */
        .field {
          margin-bottom: 1.25rem;
        }

        .field label {
          display: block;
          font-size: 0.78rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #5a5242;
          margin-bottom: 0.5rem;
        }

        .input-wrap {
          position: relative;
        }

        .field input {
          width: 100%;
          padding: 0.85rem 1rem;
          background: #111109;
          border: 1px solid #2a2a22;
          border-radius: 6px;
          color: #e8e0cc;
          font-family: 'Crimson Pro', Georgia, serif;
          font-size: 1rem;
          font-weight: 300;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
          -webkit-appearance: none;
        }

        .field input::placeholder {
          color: #2e2d25;
        }

        .field input:focus {
          border-color: rgba(180,152,90,0.5);
          background: #131310;
        }

        .field input:focus + .focus-line {
          transform: scaleX(1);
        }

        .toggle-pw {
          position: absolute;
          right: 0.85rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: #3a3828;
          padding: 0.25rem;
          display: flex;
          align-items: center;
          transition: color 0.2s;
        }

        .toggle-pw:hover {
          color: #b4985a;
        }

        /* Divider */
        .divider {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin: 1.5rem 0;
        }

        .divider-line {
          flex: 1;
          height: 1px;
          background: #1e1e18;
        }

        .divider-text {
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #3a3828;
        }

        /* Submit */
        .submit-btn {
          width: 100%;
          padding: 0.9rem 1.5rem;
          background: linear-gradient(135deg, #b4985a, #8a7240);
          border: none;
          border-radius: 6px;
          color: #0a0a08;
          font-family: 'Crimson Pro', Georgia, serif;
          font-size: 1rem;
          font-weight: 400;
          letter-spacing: 0.05em;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: opacity 0.2s, transform 0.15s;
          margin-bottom: 1rem;
        }

        .submit-btn:hover:not(:disabled) {
          opacity: 0.9;
          transform: translateY(-1px);
        }

        .submit-btn:active:not(:disabled) {
          transform: translateY(0);
        }

        .submit-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .submit-btn .spinner {
          width: 1rem;
          height: 1rem;
          border: 2px solid rgba(10,10,8,0.3);
          border-top-color: #0a0a08;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* OAuth */
        .oauth-btn {
          width: 100%;
          padding: 0.85rem 1.5rem;
          background: transparent;
          border: 1px solid #2a2a22;
          border-radius: 6px;
          color: #7a7260;
          font-family: 'Crimson Pro', Georgia, serif;
          font-size: 0.95rem;
          font-weight: 300;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          transition: border-color 0.2s, color 0.2s;
          letter-spacing: 0.02em;
        }

        .oauth-btn:hover {
          border-color: #3a3828;
          color: #b4985a;
        }

        .oauth-btn svg {
          width: 1.1rem;
          height: 1.1rem;
          flex-shrink: 0;
        }

        /* Error */
        .error-msg {
          background: rgba(180,60,60,0.08);
          border: 1px solid rgba(180,60,60,0.2);
          border-radius: 6px;
          padding: 0.7rem 1rem;
          color: #c47070;
          font-size: 0.88rem;
          margin-bottom: 1.25rem;
          font-weight: 300;
        }

        /* Terms */
        .terms {
          font-size: 0.75rem;
          color: #3a3828;
          text-align: center;
          line-height: 1.6;
          margin-top: 1.25rem;
          font-weight: 300;
        }

        .terms a {
          color: #5a5242;
          text-decoration: none;
          border-bottom: 1px solid #2a2a22;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .register-root {
            grid-template-columns: 1fr;
          }
          .left-panel {
            display: none;
          }
          .right-panel {
            padding: 2rem 1.5rem;
          }
        }
      `}</style>

      <div className="register-root">

        {/* ── Left Panel ── */}
        <div className="left-panel">
          <div className="left-watermark" />

          <div className="brand">
            <div className="brand-icon">
              <Scale size={18} />
            </div>
            <div className="brand-name">Lex<span>Connect</span></div>
          </div>

          <div className="left-content">
            <h2 className="left-tagline">
              Where legal<br />
              minds <em>meet</em><br />
              & matters move.
            </h2>
            <p className="left-desc">
              A trusted network built exclusively for legal professionals — connecting expertise with opportunity.
            </p>
            <div className="stats-row">
              <div className="stat">
                <span className="stat-number">10K+</span>
                <span className="stat-label">Verified Lawyers</span>
              </div>
              <div className="stat">
                <span className="stat-number">3.2K</span>
                <span className="stat-label">Pro Bono Cases</span>
              </div>
              <div className="stat">
                <span className="stat-number">98%</span>
                <span className="stat-label">Satisfaction</span>
              </div>
            </div>
          </div>

          <div className="trust-badges">
            <div className="trust-badge">
              <Shield size={13} />
              Bar-verified professional profiles
            </div>
            <div className="trust-badge">
              <Users size={13} />
              Mentorship & peer networking
            </div>
            <div className="trust-badge">
              <Briefcase size={13} />
              Curated pro bono opportunities
            </div>
          </div>
        </div>

        {/* ── Right Panel ── */}
        <div className="right-panel">
          <div className="form-container">

            <div className="form-header">
              <div className="form-eyebrow">New Member</div>
              <h1 className="form-title">Create your account</h1>
              <p className="form-subtitle">
                Already a member? <a href="/login">Sign in here</a>
              </p>
            </div>

            {error && <div className="error-msg">{error}</div>}

            <div className="field">
              <label>Full Name</label>
              <div className="input-wrap">
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Priya Sharma"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                />
              </div>
            </div>

            <div className="field">
              <label>Email Address</label>
              <div className="input-wrap">
                <input
                  type="email"
                  name="email"
                  placeholder="you@lawfirm.com"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="field">
              <label>Password</label>
              <div className="input-wrap">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Min. 8 characters"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  style={{ paddingRight: "2.75rem" }}
                />
                <button
                  type="button"
                  className="toggle-pw"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button
              className="submit-btn"
              onClick={handleSignUp}
              disabled={isLoading || !formData.email || !formData.password || !formData.name}
            >
              {isLoading ? (
                <span className="spinner" />
              ) : (
                <>
                  Create Account
                  <ArrowRight size={15} />
                </>
              )}
            </button>

            <div className="divider">
              <div className="divider-line" />
              <span className="divider-text">or continue with</span>
              <div className="divider-line" />
            </div>

            <button className="oauth-btn" onClick={() => authClient.signIn.social({ provider: "github", callbackURL: "/profile" })}>
              {/* GitHub icon */}
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              Continue with GitHub
            </button>

            <p className="terms">
              By creating an account, you agree to our{" "}
              <a href="/terms">Terms of Service</a> and{" "}
              <a href="/privacy">Privacy Policy</a>
            </p>

          </div>
        </div>
      </div>
    </>
  );
}