import React from 'react';
import { ArrowRight, TrendingUp, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { INVESTMENT_HIGHLIGHTS } from '../data/properties';

export default function InvestmentOpportunities({ onExploreInvestments, onOpenInquiry }) {
  return (
    <section className="investment-section" id="investments">
      <div className="container">
        {/* Section Header */}
        <div className="investment-header">
          <div>
            <div className="eyebrow">Strategic Wealth Creation</div>
            <h2 className="section-title">Explore Investment Opportunities</h2>
            <p className="section-subtitle-left">
              High-performing real estate assets tailored for private investors, family offices, and NRI portfolios seeking predictable yields and high capital growth.
            </p>
          </div>
          <button 
            type="button" 
            className="btn btn-gold btn-sm inv-top-cta"
            onClick={onExploreInvestments}
          >
            <span>Explore Investment Properties</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Editorial Investment Cards */}
        <div className="investment-grid">
          {INVESTMENT_HIGHLIGHTS.map((inv) => (
            <div key={inv.id} className="inv-editorial-card">
              <div className="inv-img-box">
                <img src={inv.image} alt={inv.title} className="inv-img" />
                <div className="inv-img-overlay"></div>
                <span className="inv-badge">{inv.badge}</span>
              </div>

              <div className="inv-body">
                <span className="inv-type-pill">{inv.type}</span>
                <h3 className="inv-card-title">{inv.title}</h3>
                <div className="inv-yield-box">
                  <TrendingUp size={16} className="inv-trend-icon" />
                  <span className="inv-yield-text">{inv.subtitle}</span>
                </div>
                <p className="inv-card-desc">{inv.description}</p>
                
                <div className="inv-btn-row">
                  <button 
                    type="button" 
                    className="inv-link-btn"
                    onClick={() => onOpenInquiry({ 
                      requirements: `I am interested in learning more about ${inv.title} with projected returns (${inv.subtitle}).` 
                    })}
                  >
                    <span>Request Investment Brief</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Advisory Banner */}
        <div className="investment-advisory-banner">
          <div className="advisory-banner-content">
            <div className="advisory-icon-wrap">
              <ShieldCheck size={28} />
            </div>
            <div>
              <h4 className="advisory-title">Looking for Bespoke Institutional Advisory?</h4>
              <p className="advisory-text">
                We structure customized acquisition mandates for land aggregation, commercial floor plates, and pre-leased assets above ₹10 Cr.
              </p>
            </div>
          </div>
          <button 
            type="button" 
            className="btn btn-dark btn-sm advisory-action-btn"
            onClick={() => onOpenInquiry({ purpose: 'Investment', budget: 'above-7cr' })}
          >
            <span>Consult Investment Desk</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>

      <style>{`
        .investment-section {
          padding: 90px 0 100px;
          background-color: var(--bg-cream-light);
          border-top: 1px solid var(--border-subtle);
          border-bottom: 1px solid var(--border-subtle);
        }

        .investment-header {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 48px;
        }

        @media (min-width: 768px) {
          .investment-header {
            flex-direction: row;
            align-items: flex-end;
            justify-content: space-between;
          }
        }

        .inv-top-cta {
          align-self: flex-start;
        }

        @media (min-width: 768px) {
          .inv-top-cta {
            align-self: auto;
          }
        }

        .investment-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 28px;
          margin-bottom: 44px;
        }

        @media (min-width: 992px) {
          .investment-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .inv-editorial-card {
          background: var(--bg-cream-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          overflow: hidden;
          box-shadow: var(--shadow-subtle);
          display: flex;
          flex-direction: column;
          transition: all var(--transition-smooth);
        }

        .inv-editorial-card:hover {
          border-color: var(--gold-primary);
          box-shadow: var(--shadow-medium);
          transform: translateY(-5px);
        }

        .inv-img-box {
          position: relative;
          height: 220px;
          overflow: hidden;
        }

        .inv-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .inv-editorial-card:hover .inv-img {
          transform: scale(1.06);
        }

        .inv-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 100%);
        }

        .inv-badge {
          position: absolute;
          top: 14px;
          right: 14px;
          background: var(--gold-gradient);
          color: #FFFFFF;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 4px 10px;
          border-radius: var(--radius-xs);
          box-shadow: var(--shadow-gold);
        }

        .inv-body {
          padding: 26px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .inv-type-pill {
          font-size: 0.72rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--gold-dark);
          margin-bottom: 8px;
        }

        .inv-card-title {
          font-family: var(--font-display);
          font-size: 1.35rem;
          font-weight: 700;
          color: var(--text-charcoal-primary);
          line-height: 1.25;
          margin-bottom: 10px;
        }

        .inv-yield-box {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--gold-tint-10);
          border-left: 3px solid var(--gold-primary);
          padding: 8px 12px;
          border-radius: 0 var(--radius-xs) var(--radius-xs) 0;
          margin-bottom: 14px;
        }

        .inv-trend-icon {
          color: var(--gold-dark);
          flex-shrink: 0;
        }

        .inv-yield-text {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--gold-dark);
        }

        .inv-card-desc {
          font-size: 0.88rem;
          line-height: 1.6;
          color: var(--text-muted-warm);
          margin-bottom: 20px;
        }

        .inv-btn-row {
          margin-top: auto;
          padding-top: 14px;
          border-top: 1px solid var(--border-subtle);
        }

        .inv-link-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--gold-dark);
          transition: transform var(--transition-fast), color var(--transition-fast);
        }

        .inv-link-btn:hover {
          color: #785818;
          transform: translateX(3px);
        }

        /* Advisory Banner */
        .investment-advisory-banner {
          background: var(--bg-cream-surface);
          border: 1px solid var(--gold-border);
          border-radius: var(--radius-md);
          padding: 24px 30px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          box-shadow: var(--shadow-subtle);
        }

        @media (min-width: 860px) {
          .investment-advisory-banner {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
        }

        .advisory-banner-content {
          display: flex;
          align-items: flex-start;
          gap: 18px;
        }

        .advisory-icon-wrap {
          width: 50px;
          height: 50px;
          border-radius: var(--radius-sm);
          background: var(--gold-gradient);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: var(--shadow-gold);
        }

        .advisory-title {
          font-family: var(--font-display);
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--text-charcoal-primary);
          margin-bottom: 4px;
        }

        .advisory-text {
          font-size: 0.88rem;
          color: var(--text-muted-warm);
          max-width: 600px;
        }

        .advisory-action-btn {
          align-self: flex-start;
        }

        @media (min-width: 860px) {
          .advisory-action-btn {
            align-self: auto;
          }
        }
      `}</style>
    </section>
  );
}
