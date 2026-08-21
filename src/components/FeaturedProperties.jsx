import React from 'react';
import { ArrowRight, MapPin, Maximize2, Bed, Tag, Sparkles } from 'lucide-react';

export default function FeaturedProperties({ properties, onSelectProperty, onViewAll }) {
  const featuredList = properties.slice(0, 6);

  return (
    <section className="featured-section" id="featured">
      <div className="container">
        {/* Section Header */}
        <div className="featured-header-row">
          <div>
            <div className="eyebrow">Handpicked Portfolio</div>
            <h2 className="section-title">Featured Properties</h2>
            <p className="section-subtitle-left">
              Explore an exclusive selection of verified architectural residences, prime plots, and high-yield commercial suites.
            </p>
          </div>

          <button 
            type="button" 
            className="btn btn-dark btn-sm featured-view-all-btn"
            onClick={onViewAll}
          >
            <span>View All Properties</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Property Grid */}
        <div className="property-grid">
          {featuredList.map((prop) => (
            <div 
              key={prop.id}
              className="property-card"
              onClick={() => onSelectProperty(prop)}
              role="button"
              tabIndex={0}
            >
              {/* Image & Badges */}
              <div className="prop-image-wrap">
                <img 
                  src={prop.images[0]} 
                  alt={prop.title} 
                  className="prop-img"
                  loading="lazy"
                />
                <div className="prop-img-overlay"></div>

                {/* Top Badges */}
                <div className="prop-top-badges">
                  <span className="badge-gold">
                    <Sparkles size={12} />
                    <span>{prop.badge || 'Exclusive'}</span>
                  </span>
                  <span className="badge-dark">
                    <span>{prop.type}</span>
                  </span>
                </div>

                {/* Bottom Overlay Price on Image for High Impact */}
                <div className="prop-img-bottom">
                  <div className="prop-price-tag">{prop.price}</div>
                  <span className="prop-status-pill">{prop.status}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="prop-body">
                <div className="prop-location-row">
                  <MapPin size={15} className="prop-location-pin" />
                  <span className="prop-location-text">{prop.location} • {prop.subLocation}</span>
                </div>

                <h3 className="prop-title">{prop.title}</h3>
                
                <p className="prop-desc-snippet">{prop.description}</p>

                {/* Key Specs Row */}
                <div className="prop-specs-grid">
                  <div className="spec-item">
                    <Bed size={15} className="spec-icon" />
                    <span className="spec-val">{prop.bedrooms}</span>
                  </div>
                  <div className="spec-item">
                    <Maximize2 size={14} className="spec-icon" />
                    <span className="spec-val">{prop.area}</span>
                  </div>
                </div>

                {/* Investment Yield callout if present */}
                {prop.expectedYield && (
                  <div className="prop-yield-row">
                    <Tag size={13} className="yield-icon" />
                    <span>{prop.expectedYield}</span>
                  </div>
                )}

                {/* Card Action */}
                <div className="prop-action-row">
                  <button 
                    type="button" 
                    className="btn btn-outline btn-sm w-full prop-view-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProperty(prop);
                    }}
                  >
                    <span>View Property Details</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View All CTA */}
        <div className="mobile-view-all-wrap">
          <button 
            type="button" 
            className="btn btn-gold btn-lg w-full"
            onClick={onViewAll}
          >
            <span>View All Properties ({properties.length}) →</span>
          </button>
        </div>
      </div>

      <style>{`
        .featured-section {
          padding: 90px 0 100px;
          background-color: var(--bg-cream-primary);
        }

        .featured-header-row {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 48px;
        }

        @media (min-width: 768px) {
          .featured-header-row {
            flex-direction: row;
            align-items: flex-end;
            justify-content: space-between;
          }
        }

        .featured-view-all-btn {
          display: none;
        }

        @media (min-width: 768px) {
          .featured-view-all-btn {
            display: inline-flex;
          }
        }

        .property-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
        }

        @media (min-width: 768px) {
          .property-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1100px) {
          .property-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .property-card {
          background: var(--bg-cream-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          overflow: hidden;
          box-shadow: var(--shadow-subtle);
          transition: all var(--transition-smooth);
          display: flex;
          flex-direction: column;
          cursor: pointer;
        }

        .property-card:hover {
          border-color: var(--gold-primary);
          box-shadow: 0 16px 36px rgba(28, 25, 20, 0.11);
          transform: translateY(-5px);
        }

        .prop-image-wrap {
          position: relative;
          height: 250px;
          overflow: hidden;
          background: var(--bg-cream-muted);
        }

        .prop-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .property-card:hover .prop-img {
          transform: scale(1.07);
        }

        .prop-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.25) 0%,
            transparent 40%,
            rgba(0, 0, 0, 0.65) 100%
          );
        }

        .prop-top-badges {
          position: absolute;
          top: 14px;
          left: 14px;
          right: 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 5;
        }

        .prop-img-bottom {
          position: absolute;
          bottom: 14px;
          left: 14px;
          right: 14px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          z-index: 5;
        }

        .prop-price-tag {
          font-family: var(--font-display);
          font-size: 1.45rem;
          font-weight: 700;
          color: #FFFFFF;
          text-shadow: 0 2px 4px rgba(0,0,0,0.4);
        }

        .prop-status-pill {
          font-size: 0.72rem;
          font-weight: 600;
          color: #FFFFFF;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(6px);
          padding: 3px 8px;
          border-radius: 4px;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .prop-body {
          padding: 24px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .prop-location-row {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 8px;
        }

        .prop-location-pin {
          color: var(--gold-dark);
          flex-shrink: 0;
        }

        .prop-location-text {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-muted-warm);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .prop-title {
          font-family: var(--font-display);
          font-size: 1.28rem;
          font-weight: 700;
          line-height: 1.3;
          color: var(--text-charcoal-primary);
          margin-bottom: 10px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          min-height: 3.3rem;
        }

        .prop-desc-snippet {
          font-size: 0.875rem;
          color: var(--text-muted-warm);
          line-height: 1.5;
          margin-bottom: 16px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .prop-specs-grid {
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding: 12px 14px;
          background: var(--bg-cream-light);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          margin-bottom: 14px;
        }

        .spec-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .spec-icon {
          color: var(--gold-dark);
          flex-shrink: 0;
        }

        .spec-val {
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-charcoal-secondary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .prop-yield-row {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--gold-dark);
          background: var(--gold-tint-10);
          padding: 6px 10px;
          border-radius: var(--radius-xs);
          margin-bottom: 16px;
        }

        .yield-icon {
          color: var(--gold-dark);
        }

        .prop-action-row {
          margin-top: auto;
        }

        .prop-view-btn:hover {
          background: var(--gold-gradient);
          color: #FFFFFF;
          border-color: transparent;
        }

        .mobile-view-all-wrap {
          margin-top: 36px;
          display: block;
        }

        @media (min-width: 768px) {
          .mobile-view-all-wrap {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
