import React from 'react';
import { MapPin, ArrowRight, Building, Sparkles, Compass } from 'lucide-react';
import { LOCATIONS } from '../data/properties';

export default function LocationsView({ onSelectLocation, onOpenInquiry }) {
  return (
    <div className="locations-page">
      <div className="container">
        {/* Header */}
        <div className="locations-page-header">
          <div className="eyebrow">Strategic Micro-Markets</div>
          <h1 className="locations-page-title">Prime Real Estate Regions</h1>
          <p className="locations-page-desc">
            Explore our footprint across key growth corridors in Delhi NCR and North India, known for rapid infrastructure appreciation, luxury living, and corporate headquarters.
          </p>
        </div>

        {/* Detailed Grid */}
        <div className="locations-page-grid">
          {LOCATIONS.map((loc) => (
            <div key={loc.id} className="loc-full-card">
              <div className="loc-card-img-wrap">
                <img src={loc.image} alt={loc.name} className="loc-card-img" />
                <div className="loc-card-overlay"></div>
                <div className="loc-tag-badge">
                  <span>{loc.propertyCount} Verified Listings</span>
                </div>
              </div>

              <div className="loc-card-content">
                <div className="loc-card-title-row">
                  <div>
                    <h2 className="loc-card-name">{loc.name}</h2>
                    <span className="loc-card-state">{loc.state}</span>
                  </div>
                  <span className="loc-badge-mini">Prime Belt</span>
                </div>

                <p className="loc-card-tagline">{loc.tagline}</p>

                <div className="loc-card-hubs">
                  <span className="hubs-label">Key Growth Corridors:</span>
                  <div className="hubs-pills-wrap">
                    {loc.popularFor.map((hub, idx) => (
                      <span key={idx} className="hub-pill">{hub}</span>
                    ))}
                  </div>
                </div>

                <div className="loc-card-footer">
                  <button 
                    type="button" 
                    className="btn btn-gold btn-sm"
                    onClick={() => onSelectLocation(loc.name)}
                  >
                    <span>Browse Properties in {loc.name}</span>
                    <ArrowRight size={15} />
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-outline btn-sm"
                    onClick={() => onOpenInquiry({ location: loc.name })}
                  >
                    <span>Request Brief</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .locations-page {
          padding: 50px 0 100px;
          background-color: var(--bg-cream-primary);
        }

        .locations-page-header {
          text-align: center;
          max-width: 760px;
          margin: 0 auto 50px;
        }

        .locations-page-title {
          font-family: var(--font-display);
          font-size: 2.8rem;
          font-weight: 700;
          color: var(--text-charcoal-primary);
          margin-bottom: 12px;
        }

        .locations-page-desc {
          font-size: 1.1rem;
          color: var(--text-muted-warm);
          line-height: 1.6;
        }

        .locations-page-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
        }

        @media (min-width: 768px) {
          .locations-page-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .loc-full-card {
          background: var(--bg-cream-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          overflow: hidden;
          box-shadow: var(--shadow-subtle);
          display: flex;
          flex-direction: column;
          transition: all var(--transition-smooth);
        }

        .loc-full-card:hover {
          border-color: var(--gold-primary);
          box-shadow: var(--shadow-medium);
          transform: translateY(-4px);
        }

        .loc-card-img-wrap {
          position: relative;
          height: 240px;
          overflow: hidden;
        }

        .loc-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .loc-full-card:hover .loc-card-img {
          transform: scale(1.06);
        }

        .loc-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.55) 100%);
        }

        .loc-tag-badge {
          position: absolute;
          top: 16px;
          right: 16px;
          background: rgba(18, 19, 21, 0.8);
          backdrop-filter: blur(6px);
          color: #FAF7F2;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 5px 12px;
          border-radius: var(--radius-xs);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .loc-card-content {
          padding: 28px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .loc-card-title-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .loc-card-name {
          font-family: var(--font-display);
          font-size: 1.65rem;
          font-weight: 700;
          color: var(--text-charcoal-primary);
        }

        .loc-card-state {
          font-size: 0.8rem;
          color: var(--gold-dark);
          font-weight: 600;
        }

        .loc-badge-mini {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          background: var(--gold-tint-10);
          color: var(--gold-dark);
          padding: 3px 8px;
          border-radius: 4px;
        }

        .loc-card-tagline {
          font-size: 0.9rem;
          color: var(--text-muted-warm);
          margin-bottom: 18px;
          line-height: 1.5;
        }

        .loc-card-hubs {
          margin-bottom: 24px;
        }

        .hubs-label {
          display: block;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-muted-light);
          margin-bottom: 8px;
        }

        .hubs-pills-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .hub-pill {
          font-size: 0.75rem;
          background: var(--bg-cream-light);
          border: 1px solid var(--border-subtle);
          color: var(--text-charcoal-secondary);
          padding: 4px 10px;
          border-radius: 4px;
        }

        .loc-card-footer {
          margin-top: auto;
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          padding-top: 18px;
          border-top: 1px solid var(--border-subtle);
        }
      `}</style>
    </div>
  );
}
