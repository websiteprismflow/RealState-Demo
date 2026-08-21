import React from 'react';
import { Search, FileEdit, Sparkles, PhoneCall, ArrowRight } from 'lucide-react';

export default function HowItWorks({ onOpenInquiry }) {
  return (
    <section className="how-section" id="how-it-works">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="eyebrow">Seamless Experience</div>
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            A frictionless, client-centric journey designed to connect you with the right property without hassle.
          </p>
        </div>

        {/* 3 Steps Row */}
        <div className="steps-grid">
          {/* Step 01 */}
          <div className="step-card">
            <div className="step-number-tag">01</div>
            <div className="step-icon-wrap">
              <Search size={22} className="step-icon" />
            </div>
            <h3 className="step-title">Find</h3>
            <p className="step-desc">
              Browse curated luxury properties, plots, and commercial portfolios filtered by your location, budget, and lifestyle requirements.
            </p>
          </div>

          {/* Step 02 - HIGHLIGHTED FOR LEAD CONVERSION */}
          <div className="step-card step-card-highlighted">
            <div className="conversion-accent-badge">
              <Sparkles size={12} />
              <span>Primary Step</span>
            </div>
            <div className="step-number-tag step-num-highlight">02</div>
            <div className="step-icon-wrap step-icon-highlight">
              <FileEdit size={22} />
            </div>
            <h3 className="step-title">Tell Us What You Need</h3>
            <p className="step-desc">
              Fill out our brief inquiry form with your custom requirements, preferences, and timeline.
            </p>
            <button 
              type="button" 
              className="btn btn-gold btn-sm step-action-btn"
              onClick={() => onOpenInquiry(null)}
            >
              <span>Submit Your Requirements</span>
              <ArrowRight size={15} />
            </button>
          </div>

          {/* Step 03 */}
          <div className="step-card">
            <div className="step-number-tag">03</div>
            <div className="step-icon-wrap">
              <PhoneCall size={22} className="step-icon" />
            </div>
            <h3 className="step-title">Get Assistance</h3>
            <p className="step-desc">
              Our dedicated property advisory team reviews your criteria, conducts custom market scouting, and coordinates site visits.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .how-section {
          padding: 90px 0 95px;
          background-color: var(--bg-cream-primary);
        }

        .steps-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 28px;
          position: relative;
        }

        @media (min-width: 900px) {
          .steps-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .step-card {
          background: var(--bg-cream-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 40px 28px;
          position: relative;
          box-shadow: var(--shadow-subtle);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          transition: all var(--transition-smooth);
        }

        .step-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-medium);
        }

        /* Highlighted Step 02 */
        .step-card-highlighted {
          background: var(--bg-cream-card);
          border: 2px solid var(--gold-primary);
          box-shadow: 0 16px 36px rgba(197, 160, 89, 0.15);
          transform: scale(1.02);
        }

        .conversion-accent-badge {
          position: absolute;
          top: -12px;
          right: 24px;
          background: var(--gold-gradient);
          color: #FFFFFF;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 4px 12px;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          gap: 5px;
          box-shadow: var(--shadow-gold);
        }

        .step-number-tag {
          font-family: var(--font-display);
          font-size: 2.4rem;
          font-weight: 700;
          color: var(--border-medium);
          line-height: 1;
          margin-bottom: 18px;
        }

        .step-num-highlight {
          color: var(--gold-dark);
        }

        .step-icon-wrap {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-sm);
          background: var(--bg-cream-light);
          border: 1px solid var(--border-subtle);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }

        .step-icon {
          color: var(--gold-dark);
        }

        .step-icon-highlight {
          background: var(--gold-gradient);
          color: #FFFFFF;
          box-shadow: var(--shadow-gold);
          border: none;
        }

        .step-title {
          font-family: var(--font-display);
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--text-charcoal-primary);
          margin-bottom: 12px;
        }

        .step-desc {
          font-size: 0.9rem;
          line-height: 1.6;
          color: var(--text-muted-warm);
          margin-bottom: 20px;
        }

        .step-action-btn {
          margin-top: auto;
          width: 100%;
        }
      `}</style>
    </section>
  );
}
