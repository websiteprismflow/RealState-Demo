import React from 'react';
import { ShieldAlert, X, Check } from 'lucide-react';

export default function DemoNoticeModal({ 
  isOpen, 
  onClose, 
  title = "Demo Showcase Notice", 
  message = "This is a demo showcase, so no changes or deletions are saved." 
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose} style={{ zIndex: 1100 }}>
      <div 
        className="demo-notice-card animate-scale-up"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button className="modal-close-btn" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>

        <div className="demo-icon-wrap">
          <ShieldAlert size={36} className="text-gold" />
        </div>

        <div className="demo-pill-badge">
          <span>PORTFOLIO SHOWCASE MODE</span>
        </div>

        <h3 className="demo-notice-title">{title}</h3>
        
        <p className="demo-notice-msg">
          {message}
        </p>

        <p className="demo-notice-sub">
          All property listings, client dossiers, and database records remain protected in read-only showcase mode.
        </p>

        <div className="demo-notice-actions">
          <button 
            type="button" 
            className="btn btn-gold btn-md w-full"
            onClick={onClose}
          >
            <Check size={16} />
            <span>Understood</span>
          </button>
        </div>
      </div>

      <style>{`
        .demo-notice-card {
          background: #FFFFFF;
          border: 1px solid rgba(197, 160, 89, 0.4);
          border-radius: var(--radius-lg);
          width: 100%;
          max-width: 480px;
          padding: 36px 32px;
          text-align: center;
          position: relative;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.35);
        }

        .demo-icon-wrap {
          width: 68px;
          height: 68px;
          border-radius: 50%;
          background: rgba(197, 160, 89, 0.12);
          border: 1px solid rgba(197, 160, 89, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
        }

        .demo-pill-badge {
          display: inline-block;
          font-family: var(--font-sans);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--color-gold-dark);
          background: rgba(197, 160, 89, 0.15);
          padding: 4px 12px;
          border-radius: 20px;
          margin-bottom: 12px;
        }

        .demo-notice-title {
          font-family: var(--font-display);
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--text-charcoal-primary);
          margin-bottom: 10px;
        }

        .demo-notice-msg {
          font-size: 0.96rem;
          font-weight: 600;
          color: var(--text-charcoal-secondary);
          line-height: 1.5;
          margin-bottom: 8px;
        }

        .demo-notice-sub {
          font-size: 0.84rem;
          color: var(--text-muted-dark);
          line-height: 1.4;
          margin-bottom: 24px;
        }

        .demo-notice-actions {
          display: flex;
          justify-content: center;
        }
      `}</style>
    </div>
  );
}
