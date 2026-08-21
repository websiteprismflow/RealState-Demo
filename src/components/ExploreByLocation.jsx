import React from 'react';
import { MapPin, ArrowRight, Compass } from 'lucide-react';
import { LOCATIONS } from '../data/properties';

export default function ExploreByLocation({ onSelectLocation }) {
  return (
    <section className="locations-section" id="locations">
      <div className="container">
        {/* Section Header */}
        <div className="locations-header-wrap">
          <div>
            <div className="eyebrow">Strategic Micro-Markets</div>
            <h2 className="section-title">Explore by Location</h2>
            <p className="section-subtitle-left">
              Discover verified opportunities across North India's premier luxury corridors and high-growth investment nodes.
            </p>
          </div>
          <button 
            type="button" 
            className="btn btn-outline btn-sm loc-header-cta"
            onClick={() => onSelectLocation(null)}
          >
            <Compass size={16} />
            <span>View All Regions</span>
          </button>
        </div>

        {/* Locations Grid */}
        <div className="locations-grid">
          {LOCATIONS.map((loc) => (
            <div 
              key={loc.id} 
              className="location-card"
              onClick={() => onSelectLocation(loc.name)}
              role="button"
              tabIndex={0}
            >
              <div className="loc-img-box">
                <img src={loc.image} alt={loc.name} className="loc-img" />
                <div className="loc-overlay"></div>
                <div className="loc-count-badge">
                  <span>{loc.propertyCount} Properties</span>
                </div>
              </div>

              <div className="loc-info">
                <div className="loc-title-row">
                  <div className="loc-name-wrap">
                    <MapPin size={16} className="loc-pin-icon" />
                    <h3 className="loc-name">{loc.name}</h3>
                  </div>
                  <span className="loc-state-tag">{loc.state}</span>
                </div>

                <p className="loc-tagline">{loc.tagline}</p>

                <div className="loc-corridors-list">
                  {loc.popularFor.slice(0, 3).map((hub, idx) => (
                    <span key={idx} className="corridor-pill">{hub}</span>
                  ))}
                </div>

                <div className="loc-action-row">
                  <span className="loc-explore-text">Explore Properties</span>
                  <ArrowRight size={15} className="loc-arrow" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .locations-section {
          padding: 80px 0 90px;
          background-color: var(--bg-cream-light);
          border-top: 1px solid var(--border-subtle);
          border-bottom: 1px solid var(--border-subtle);
        }

        .locations-header-wrap {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 44px;
        }

        @media (min-width: 768px) {
          .locations-header-wrap {
            flex-direction: row;
            align-items: flex-end;
            justify-content: space-between;
          }
        }

        .section-subtitle-left {
          font-size: 1.05rem;
          color: var(--text-muted-warm);
          max-width: 580px;
        }

        .loc-header-cta {
          align-self: flex-start;
        }

        @media (min-width: 768px) {
          .loc-header-cta {
            align-self: auto;
          }
        }

        .locations-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }

        @media (min-width: 640px) {
          .locations-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .locations-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .location-card {
          background: var(--bg-cream-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          overflow: hidden;
          box-shadow: var(--shadow-subtle);
          transition: all var(--transition-smooth);
          cursor: pointer;
          display: flex;
          flex-direction: column;
        }

        .location-card:hover {
          border-color: var(--gold-primary);
          box-shadow: var(--shadow-medium);
          transform: translateY(-4px);
        }

        .loc-img-box {
          position: relative;
          height: 190px;
          overflow: hidden;
        }

        .loc-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .location-card:hover .loc-img {
          transform: scale(1.06);
        }

        .loc-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.45) 100%);
        }

        .loc-count-badge {
          position: absolute;
          top: 14px;
          right: 14px;
          background: rgba(18, 19, 21, 0.75);
          backdrop-filter: blur(6px);
          color: #FAF7F2;
          font-size: 0.72rem;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: var(--radius-xs);
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .loc-info {
          padding: 22px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .loc-title-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 6px;
        }

        .loc-name-wrap {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .loc-pin-icon {
          color: var(--gold-dark);
        }

        .loc-name {
          font-family: var(--font-display);
          font-size: 1.45rem;
          font-weight: 700;
          color: var(--text-charcoal-primary);
        }

        .loc-state-tag {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-muted-warm);
          background: var(--bg-cream-muted);
          padding: 2px 8px;
          border-radius: 4px;
        }

        .loc-tagline {
          font-size: 0.85rem;
          color: var(--text-muted-warm);
          margin-bottom: 14px;
          line-height: 1.4;
        }

        .loc-corridors-list {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 18px;
        }

        .corridor-pill {
          font-size: 0.72rem;
          background: var(--bg-cream-primary);
          border: 1px solid var(--border-subtle);
          color: var(--text-charcoal-secondary);
          padding: 3px 8px;
          border-radius: 4px;
        }

        .loc-action-row {
          margin-top: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 12px;
          border-top: 1px solid var(--border-subtle);
        }

        .loc-explore-text {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--gold-dark);
        }

        .loc-arrow {
          color: var(--gold-dark);
          transition: transform var(--transition-fast);
        }

        .location-card:hover .loc-arrow {
          transform: translateX(4px);
        }
      `}</style>
    </section>
  );
}
