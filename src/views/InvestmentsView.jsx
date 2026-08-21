import React from 'react';
import { TrendingUp, ShieldCheck, PieChart, Landmark, ArrowRight, Building, CheckCircle2 } from 'lucide-react';
import { INVESTMENT_HIGHLIGHTS } from '../data/properties';

export default function InvestmentsView({ onOpenInquiry }) {
  const assetClasses = [
    {
      id: 'pre-leased',
      title: 'Pre-Leased Commercial & Grade-A Offices',
      yield: '8.0% - 9.5% Net Return',
      lockIn: '6 to 9 Years Leases with Fortune 500 Tenants',
      minInvestment: '₹ 2.50 Cr+',
      description: 'Acquire high-grade institutional office suites and high-street bank/retail properties delivering immediate rental income from day one with built-in periodic escalations.',
      points: [
        'Immediate cashflow with zero tenant vacancy period',
        'Tier-1 MNC tenants with long lease locks',
        'Escalation structure of 15% every 3 years',
        'Fully managed property maintenance'
      ]
    },
    {
      id: 'expressway-plots',
      title: 'Plotted Land Developments & Aerotropolis Belts',
      yield: '18% - 25% Projected Capital Appreciation',
      lockIn: 'Medium-Term (2-4 Years Horizon)',
      minInvestment: '₹ 85 Lakh+',
      description: 'Invest in DTCP/GMADA approved gated freehold plots along high-speed corridors (Dwarka Expressway, Yamuna Expressway, GT Road) slated for massive infrastructural boosts.',
      points: [
        '100% Freehold clear title registry',
        'Immediate construction approvals (Stilt + 4)',
        'Adjacent to upcoming international airport & metro lines',
        'High liquidity and rapid capital multiple'
      ]
    },
    {
      id: 'sky-villas',
      title: 'Prime Enclave Luxury Residences & Sky Villas',
      yield: 'Capital Preservation + 5% - 6% Rental Yield',
      lockIn: 'Long-Term Generational Wealth',
      minInvestment: '₹ 5.00 Cr+',
      description: 'Rare luxury inventory in supply-constrained micro-markets like Golf Course Road, Diplomatic South Delhi, and Sector 9 Chandigarh that outperform during all economic cycles.',
      points: [
        'Irreplaceable prime geographic locations',
        'High demand from expatriates, diplomats & CXOs',
        'Premium quality finishes with private amenities',
        'Significant long-term legacy value'
      ]
    }
  ];

  return (
    <div className="investments-page">
      <div className="container">
        {/* Header */}
        <div className="investments-page-header">
          <div className="eyebrow">Institutional & Private Wealth</div>
          <h1 className="investments-page-title">Strategic Real Estate Investments</h1>
          <p className="investments-page-desc">
            We assist family offices, High-Net-Worth Individuals, and NRI investors in structuring high-performing real estate portfolios with legal diligence and capital safety.
          </p>
        </div>

        {/* 3 Detailed Asset Class Deep-Dives */}
        <div className="asset-classes-list">
          {assetClasses.map((ac, idx) => (
            <div key={ac.id} className="asset-class-card">
              <div className="asset-card-header">
                <div className="asset-num-badge">0{idx + 1}</div>
                <div className="asset-title-block">
                  <h2 className="asset-title">{ac.title}</h2>
                  <div className="asset-meta-tags">
                    <span className="asset-yield-tag">{ac.yield}</span>
                    <span className="asset-min-tag">Ticket: {ac.minInvestment}</span>
                  </div>
                </div>
              </div>

              <p className="asset-desc">{ac.description}</p>

              <div className="asset-points-grid">
                {ac.points.map((pt, pIdx) => (
                  <div key={pIdx} className="asset-pt-item">
                    <CheckCircle2 size={16} className="text-gold" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>

              <div className="asset-card-cta">
                <button 
                  type="button" 
                  className="btn btn-gold btn-sm"
                  onClick={() => onOpenInquiry({
                    purpose: 'Investment',
                    requirements: `I would like to receive detailed investment opportunities and yield models for: ${ac.title}`
                  })}
                >
                  <span>Request Investment Teaser & Yield Model</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Private Consultation Section */}
        <div className="private-mandate-box">
          <div className="mandate-content">
            <h3 className="mandate-title">Book a Private Portfolio Consultation</h3>
            <p className="mandate-desc">
              Schedule a confidential 1-on-1 discussion with our Senior Real Estate Partners to map out acquisitions aligned with your risk profile and return targets.
            </p>
          </div>
          <button 
            type="button" 
            className="btn btn-dark btn-lg mandate-btn"
            onClick={() => onOpenInquiry({ purpose: 'Investment', budget: 'above-7cr' })}
          >
            <span>Schedule Consultation</span>
            <ArrowRight size={17} />
          </button>
        </div>
      </div>

      <style>{`
        .investments-page {
          padding: 50px 0 100px;
          background-color: var(--bg-cream-primary);
        }

        .investments-page-header {
          text-align: center;
          max-width: 780px;
          margin: 0 auto 50px;
        }

        .investments-page-title {
          font-family: var(--font-display);
          font-size: 2.8rem;
          font-weight: 700;
          color: var(--text-charcoal-primary);
          margin-bottom: 12px;
        }

        .investments-page-desc {
          font-size: 1.1rem;
          color: var(--text-muted-warm);
          line-height: 1.6;
        }

        .asset-classes-list {
          display: flex;
          flex-direction: column;
          gap: 32px;
          margin-bottom: 50px;
        }

        .asset-class-card {
          background: var(--bg-cream-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 36px 30px;
          box-shadow: var(--shadow-subtle);
          transition: all var(--transition-smooth);
        }

        .asset-class-card:hover {
          border-color: var(--gold-primary);
          box-shadow: var(--shadow-medium);
        }

        .asset-card-header {
          display: flex;
          align-items: flex-start;
          gap: 20px;
          margin-bottom: 18px;
        }

        .asset-num-badge {
          font-family: var(--font-display);
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--gold-dark);
          background: var(--gold-tint-10);
          border: 1px solid var(--gold-border);
          width: 54px;
          height: 54px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .asset-title {
          font-family: var(--font-display);
          font-size: 1.6rem;
          font-weight: 700;
          color: var(--text-charcoal-primary);
          margin-bottom: 8px;
        }

        .asset-meta-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .asset-yield-tag {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--gold-dark);
          background: var(--gold-tint-10);
          padding: 4px 10px;
          border-radius: 4px;
        }

        .asset-min-tag {
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--text-charcoal-secondary);
          background: var(--bg-cream-light);
          padding: 4px 10px;
          border-radius: 4px;
          border: 1px solid var(--border-subtle);
        }

        .asset-desc {
          font-size: 0.95rem;
          line-height: 1.65;
          color: var(--text-muted-warm);
          margin-bottom: 22px;
        }

        .asset-points-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 10px;
          margin-bottom: 26px;
          background: var(--bg-cream-light);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          padding: 18px 20px;
        }

        @media (min-width: 640px) {
          .asset-points-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .asset-pt-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.88rem;
          color: var(--text-charcoal-secondary);
        }

        .asset-card-cta {
          display: flex;
        }

        /* Mandate Box */
        .private-mandate-box {
          background: linear-gradient(135deg, #1C1E21 0%, #292B30 100%);
          border: 1px solid rgba(197, 160, 89, 0.4);
          border-radius: var(--radius-md);
          padding: 36px 32px;
          display: flex;
          flex-direction: column;
          gap: 24px;
          box-shadow: 0 20px 45px rgba(0,0,0,0.15);
        }

        @media (min-width: 800px) {
          .private-mandate-box {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
        }

        .mandate-title {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 700;
          color: #FFFFFF;
          margin-bottom: 6px;
        }

        .mandate-desc {
          font-size: 0.95rem;
          color: #D2CDC3;
          max-width: 580px;
        }

        .mandate-btn {
          align-self: flex-start;
          background: var(--gold-gradient);
          color: #FFFFFF;
          border: none;
        }

        @media (min-width: 800px) {
          .mandate-btn {
            align-self: auto;
          }
        }
      `}</style>
    </div>
  );
}
