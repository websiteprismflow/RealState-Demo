import React from 'react';
import { Home, Trees, Building2, ArrowRight } from 'lucide-react';
import { PROPERTY_TYPES } from '../data/properties';

export default function PropertyCategories({ onSelectCategory }) {
  const categories = [
    {
      id: 'residence',
      number: '01',
      title: 'Residence',
      categoryType: PROPERTY_TYPES.RESIDENCE,
      icon: Home,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85',
      tagline: 'Luxury Villas, Penthouses & Floors',
      description: 'Handpicked architectural masterpieces and ultra-luxury residences crafted for distinguished living.',
      count: '28+ Active Properties'
    },
    {
      id: 'plots',
      number: '02',
      title: 'Plots',
      categoryType: PROPERTY_TYPES.PLOTS,
      icon: Trees,
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=85',
      tagline: 'Gated Townships & Freehold Lands',
      description: 'Prime DTCP & GMADA approved residential land parcels along high-appreciation expressways.',
      count: '16+ Plotted Corridors'
    },
    {
      id: 'commercial',
      number: '03',
      title: 'Commercial',
      categoryType: PROPERTY_TYPES.COMMERCIAL,
      icon: Building2,
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85',
      tagline: 'Grade-A Offices & Pre-Leased Retail',
      description: 'Institutional-grade corporate suites, high-street retail, and pre-leased assets with guaranteed yields.',
      count: '14+ Commercial Assets'
    }
  ];

  return (
    <section className="categories-section" id="categories">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="eyebrow">Curated Real Estate Portfolios</div>
          <h2 className="section-title">Explore Properties</h2>
          <p className="section-subtitle">
            Select your preferred asset class to view exclusive, verified property collections across leading corridors.
          </p>
        </div>

        {/* Exactly 3 Large Visual Category Cards */}
        <div className="categories-grid">
          {categories.map((cat) => {
            const IconComponent = cat.icon;
            return (
              <div 
                key={cat.id}
                className="category-card"
                onClick={() => onSelectCategory(cat.categoryType)}
                role="button"
                tabIndex={0}
              >
                {/* Background Image Container with Zoom on Hover */}
                <div className="cat-img-wrapper">
                  <img 
                    src={cat.image} 
                    alt={cat.title} 
                    className="cat-bg-img"
                  />
                  <div className="cat-gradient-overlay"></div>
                </div>

                {/* Card Header Info */}
                <div className="cat-top-bar">
                  <div className="cat-number-badge">
                    <span>{cat.number}</span>
                  </div>
                  <div className="cat-icon-badge">
                    <IconComponent size={20} />
                  </div>
                </div>

                {/* Bottom Content Area */}
                <div className="cat-content-bottom">
                  <span className="cat-tagline">{cat.tagline}</span>
                  <h3 className="cat-title">{cat.title}</h3>
                  <p className="cat-desc">{cat.desc || cat.description}</p>
                  
                  <div className="cat-footer-row">
                    <span className="cat-count-pill">{cat.count}</span>
                    <button 
                      type="button" 
                      className="cat-action-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectCategory(cat.categoryType);
                      }}
                    >
                      <span>View Properties</span>
                      <ArrowRight size={16} className="cat-arrow-icon" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .categories-section {
          padding: 90px 0 80px;
          background-color: var(--bg-cream-primary);
        }

        .text-center {
          text-align: center;
        }

        .mb-12 {
          margin-bottom: 48px;
        }

        .categories-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 28px;
        }

        @media (min-width: 768px) {
          .categories-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .categories-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .category-card {
          position: relative;
          height: 480px;
          border-radius: var(--radius-lg);
          overflow: hidden;
          cursor: pointer;
          border: 1px solid var(--border-subtle);
          box-shadow: var(--shadow-subtle);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 32px;
          transition: all var(--transition-smooth);
        }

        .category-card:hover {
          border-color: var(--gold-primary);
          box-shadow: 0 20px 45px rgba(28, 25, 20, 0.16);
          transform: translateY(-6px);
        }

        .cat-img-wrapper {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        .cat-bg-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .category-card:hover .cat-bg-img {
          transform: scale(1.08);
        }

        .cat-gradient-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(18, 19, 21, 0.35) 0%,
            rgba(18, 19, 21, 0.15) 35%,
            rgba(18, 19, 21, 0.78) 70%,
            rgba(18, 19, 21, 0.94) 100%
          );
          transition: background var(--transition-smooth);
        }

        .category-card:hover .cat-gradient-overlay {
          background: linear-gradient(
            180deg,
            rgba(18, 19, 21, 0.25) 0%,
            rgba(18, 19, 21, 0.10) 30%,
            rgba(18, 19, 21, 0.72) 65%,
            rgba(18, 19, 21, 0.96) 100%
          );
        }

        .cat-top-bar {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .cat-number-badge {
          font-family: var(--font-display);
          font-size: 0.95rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: #FAF7F2;
          background: rgba(18, 19, 21, 0.5);
          backdrop-filter: blur(8px);
          padding: 6px 14px;
          border-radius: var(--radius-xs);
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .cat-icon-badge {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-sm);
          background: var(--gold-gradient);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 16px rgba(197, 160, 89, 0.4);
        }

        .cat-content-bottom {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
        }

        .cat-tagline {
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--gold-light);
          margin-bottom: 6px;
        }

        .cat-title {
          font-family: var(--font-display);
          font-size: 2.25rem;
          font-weight: 700;
          color: #FFFFFF;
          line-height: 1.15;
          margin-bottom: 8px;
          letter-spacing: -0.01em;
        }

        .cat-desc {
          font-size: 0.92rem;
          line-height: 1.5;
          color: #E2DDD5;
          margin-bottom: 20px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .cat-footer-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.18);
        }

        .cat-count-pill {
          font-size: 0.75rem;
          font-weight: 600;
          color: #FAF7F2;
          background: rgba(255, 255, 255, 0.14);
          backdrop-filter: blur(4px);
          padding: 4px 10px;
          border-radius: var(--radius-xs);
        }

        .cat-action-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.92rem;
          font-weight: 700;
          color: var(--gold-light);
          transition: gap var(--transition-fast), color var(--transition-fast);
        }

        .category-card:hover .cat-action-btn {
          color: #FFFFFF;
          gap: 12px;
        }

        .cat-arrow-icon {
          transition: transform var(--transition-fast);
        }

        .category-card:hover .cat-arrow-icon {
          transform: translateX(4px);
        }
      `}</style>
    </section>
  );
}
