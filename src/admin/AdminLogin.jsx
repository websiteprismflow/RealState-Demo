import React, { useState } from 'react';
import { Lock, Mail, Eye, EyeOff, ArrowRight, ShieldCheck, ArrowLeft, Sparkles, AlertCircle } from 'lucide-react';

export default function AdminLogin({ onLoginSuccess, onBackToSite }) {
  const [email, setEmail] = useState('admin@gmail.com');
  const [password, setPassword] = useState('admin');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.');
      return;
    }

    setIsLoading(true);

    // Prototype UI authentication validation
    setTimeout(() => {
      setIsLoading(false);
      if (email.trim().toLowerCase() === 'admin@gmail.com' && password === 'admin') {
        onLoginSuccess();
      } else {
        setError('Invalid credentials. For this prototype, use admin@gmail.com / admin');
      }
    }, 400);
  };

  return (
    <div className="admin-login-screen">
      <div className="admin-login-container animate-fade-in">
        {/* Back to Website Button */}
        <button 
          type="button" 
          className="admin-back-link"
          onClick={onBackToSite}
        >
          <ArrowLeft size={16} />
          <span>Return to Customer Website</span>
        </button>

        <div className="login-card">
          {/* Brand Monogram */}
          <div className="login-brand-header">
            <div className="login-brand-icon">
              <span className="brand-monogram">A</span>
            </div>
            <h1 className="login-brand-title">AURELIA</h1>
            <span className="login-brand-sub">ESTATES & ADVISORY • ADMIN SUITE</span>
          </div>

          <div className="login-divider"></div>

          <h2 className="login-title">Admin Login</h2>
          <p className="login-desc">
            Enter administrator credentials to access the lead engine and inventory management console.
          </p>

          {/* Prototype credentials hint box */}
          <div className="demo-credentials-box">
            <div className="demo-badge">Prototype Access</div>
            <div className="demo-creds-row">
              <span>Email: <strong>admin@gmail.com</strong></span>
              <span>Password: <strong>admin</strong></span>
            </div>
          </div>

          {error && (
            <div className="login-error-alert animate-fade-in">
              <AlertCircle size={17} className="error-icon" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="login-form-group">
              <label className="login-label">Admin Email</label>
              <div className="login-input-wrap">
                <Mail size={18} className="login-input-icon" />
                <input 
                  type="email" 
                  className="login-input"
                  placeholder="admin@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="login-form-group">
              <label className="login-label">Password</label>
              <div className="login-input-wrap">
                <Lock size={18} className="login-input-icon" />
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  className="login-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button 
                  type="button" 
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-gold btn-lg w-full login-submit-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Login to Console</span>
                  <ArrowRight size={17} />
                </>
              )}
            </button>
          </form>

          <div className="login-footer-disclaimer">
            <ShieldCheck size={15} className="text-gold" />
            <span>Prototype Authentication Layer • Supabase Auth in Phase 2</span>
          </div>
        </div>
      </div>

      <style>{`
        .admin-login-screen {
          min-height: 100vh;
          background: #FAF7F2;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          position: relative;
        }

        .admin-login-container {
          width: 100%;
          max-width: 480px;
        }

        .admin-back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-charcoal-secondary);
          margin-bottom: 20px;
          transition: color var(--transition-fast);
        }

        .admin-back-link:hover {
          color: var(--gold-dark);
        }

        .login-card {
          background: #FFFFFF;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-lg);
          padding: 40px 36px;
          box-shadow: 0 16px 40px rgba(28, 25, 20, 0.08);
        }

        .login-brand-header {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .login-brand-icon {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-sm);
          background: var(--gold-gradient);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 12px;
          box-shadow: var(--shadow-gold);
        }

        .login-brand-title {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          color: var(--text-charcoal-primary);
        }

        .login-brand-sub {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          color: var(--gold-dark);
          text-transform: uppercase;
        }

        .login-divider {
          width: 100%;
          height: 1px;
          background: var(--border-subtle);
          margin: 22px 0 20px;
        }

        .login-title {
          font-family: var(--font-display);
          font-size: 1.7rem;
          font-weight: 700;
          color: var(--text-charcoal-primary);
          margin-bottom: 6px;
        }

        .login-desc {
          font-size: 0.88rem;
          color: var(--text-muted-warm);
          line-height: 1.5;
          margin-bottom: 20px;
        }

        .demo-credentials-box {
          background: var(--gold-tint-10);
          border: 1px solid var(--gold-border);
          border-radius: var(--radius-sm);
          padding: 12px 16px;
          margin-bottom: 22px;
        }

        .demo-badge {
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--gold-dark);
          margin-bottom: 4px;
        }

        .demo-creds-row {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          font-size: 0.82rem;
          color: var(--text-charcoal-primary);
        }

        .login-error-alert {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #FFEBEE;
          border: 1px solid #FFCDD2;
          color: #C62828;
          padding: 10px 14px;
          border-radius: var(--radius-xs);
          font-size: 0.82rem;
          font-weight: 600;
          margin-bottom: 20px;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .login-form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .login-label {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-charcoal-secondary);
        }

        .login-input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }

        .login-input-icon {
          position: absolute;
          left: 14px;
          color: var(--text-muted-light);
          pointer-events: none;
        }

        .login-input {
          width: 100%;
          padding: 12px 42px 12px 42px;
          font-size: 0.92rem;
          background: var(--bg-cream-light);
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-sm);
          outline: none;
          transition: all var(--transition-fast);
        }

        .login-input:focus {
          border-color: var(--gold-primary);
          background: #FFFFFF;
          box-shadow: 0 0 0 3px var(--gold-tint-20);
        }

        .password-toggle-btn {
          position: absolute;
          right: 14px;
          color: var(--text-muted-light);
          display: flex;
          align-items: center;
        }

        .login-submit-btn {
          margin-top: 8px;
        }

        .login-footer-disclaimer {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-size: 0.72rem;
          color: var(--text-muted-light);
          margin-top: 24px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
