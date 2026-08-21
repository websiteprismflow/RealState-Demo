import React from 'react';
import { ArrowRight, Compass, ShieldCheck, Clock, Users } from 'lucide-react';

export default function PrimaryLeadCTA({ onOpenInquiry }) {
  return (
    <section className="primary-cta-section" id="lead-cta">
      <div className="container">
        <div className="cta-card-luxury">
          {/* Subtle Decorative Pattern */}
          <div className="cta-bg-glow"></div>

          <div className="cta-inner-content">
            <div className="eyebrow eyebrow-no-line cta-eyebrow">
              <Compass size={14} />
              <span>Personalized Property Matchmaking</span>
            </div>

            <h2 className="cta-headline">
              Can't Find What You're Looking For?
            </h2>

            <p className="cta-subtext">
              Tell us what you need and our property experts will scour offline off-market inventory, upcoming developer launches, and private mandates to find your ideal property.
            </p>

            <div className="cta-btn-wrap">
              <button 
                type="button" 
                className="btn btn-gold btn-lg cta-main-btn"
                onClick={() => onOpenInquiry(null)}
              >
                <span>Tell Us Your Requirements</span>
                <ArrowRight size={18} />
              </button>
            </div>

            {/* Quick Guarantees */}
            <div className="cta-features-row">
              <div className="cta-feature-item">
                <ShieldCheck size={16} className="text-gold" />
                <span>100% Confidential & Free Advisory</span>
              </div>
              <div className="cta-feature-item">
                <Clock size={16} className="text-gold" />
                <span>Response within 2 Business Hours</span>
              </div>
              <div className="cta-feature-item">
                <Users size={16} className="text-gold" />
                <span>Direct Access to Senior Partners</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .primary-cta-section {
          padding: 60px 0 100px;
          background-color: var(--bg-cream-primary);
        }

        .cta-card-luxury {
          position: relative;
          background: linear-gradient(
            135deg,
            #1A1B1E 0%,
            #23252A 50%,
            #17181A 100%
          );
          border: 1px solid rgba(197, 160, 89, 0.4);
          border-radius: var(--radius-lg);
          padding: 60px 28px;
          text-align: center;
          overflow: hidden;
          box-shadow: 0 24px 60px rgba(18, 19, 21, 0.25);
        }

        @media (min-width: 768px) {
          .cta-card-luxury {
            padding: 80px 48px;
          }
        }

        .cta-bg-glow {
          position: absolute;
          top: -50%;
          left: 50%;
          transform: translateX(-50%);
          width: 600px;
          height: 300px;
          background: radial-gradient(circle, rgba(197, 160, 89, 0.22) 0%, rgba(197, 160, 89, 0) 70%);
          filter: blur(40px);
          pointer-events: none;
        }

        .cta-inner-content {
          position: relative;
          z-index: 5;
          max-width: 760px;
          margin: 0 auto;
        }

        .cta-eyebrow {
          color: var(--gold-light);
          margin-bottom: 16px;
        }

        .cta-headline {
          font-family: var(--font-display);
          font-size: 2.35rem;
          font-weight: 700;
          color: #FFFFFF;
          line-height: 1.2;
          margin-bottom: 18px;
        }

        @media (min-width: 768px) {
          .cta-headline {
            font-size: 3.2rem;
          }
        }

        .cta-subtext {
          font-size: 1.1rem;
          line-height: 1.65;
          color: #D6D0C5;
          margin-bottom: 36px;
        }

        .cta-btn-wrap {
          margin-bottom: 36px;
        }

        .cta-main-btn {
          box-shadow: 0 10px 30px rgba(197, 160, 89, 0.4);
        }

        .cta-features-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 16px 32px;
          padding-top: 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.12);
        }

        .cta-feature-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          font-weight: 500;
          color: #E2DDD5;
        }
      `}</style>
    </section>
  );
}
