import React, { useState } from 'react';
import { Search, MapPin, Building, Banknote, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import { PROPERTY_TYPES, LOCATIONS } from '../data/properties';

export default function Hero({ onSearch, onOpenInquiry }) {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch({
      location: selectedLocation,
      type: selectedType,
      budget: selectedBudget
    });
  };

  return (
    <section className="hero-section">
      {/* Background with luxury property visual and warm cream overlay */}
      <div className="hero-background-wrapper">
        <img 
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=90" 
          alt="Luxury Architecture" 
          className="hero-bg-image"
        />
        <div className="hero-overlay"></div>
      </div>

      <div className="container relative z-10">
        <div className="hero-content">
          {/* Eyebrow badge */}
          <div className="eyebrow-pill">
            <Sparkles size={14} className="text-gold" />
            <span>Curated Real Estate & Strategic Advisory</span>
          </div>

          {/* Primary Main Headline */}
          <h1 className="hero-headline">
            Find a place <br />
            <span className="hero-headline-italic">you'll love.</span>
          </h1>

          {/* Supporting Narrative */}
          <p className="hero-subtext">
            Discover bespoke residences, premium plotted developments, and high-yield commercial spaces across Delhi NCR's most distinguished corridors with dedicated advisory.
          </p>

          {/* Luxury Property Search Interface */}
          <div className="search-bar-container">
            <form className="search-bar-form" onSubmit={handleSearchSubmit}>
              {/* Location Input / Dropdown */}
              <div className="search-field">
                <div className="search-field-icon">
                  <MapPin size={18} />
                </div>
                <div className="search-field-content">
                  <label className="search-label">Location</label>
                  <select 
                    value={selectedLocation} 
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="search-select"
                  >
                    <option value="">All Prime Locations</option>
                    {LOCATIONS.map(loc => (
                      <option key={loc.id} value={loc.name}>{loc.name}, {loc.state}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="search-divider"></div>

              {/* Property Type Dropdown */}
              <div className="search-field">
                <div className="search-field-icon">
                  <Building size={18} />
                </div>
                <div className="search-field-content">
                  <label className="search-label">Property Type</label>
                  <select 
                    value={selectedType} 
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="search-select"
                  >
                    <option value="">All Categories</option>
                    <option value={PROPERTY_TYPES.RESIDENCE}>Residence (Villas & Floors)</option>
                    <option value={PROPERTY_TYPES.PLOTS}>Plots & Land Parcels</option>
                    <option value={PROPERTY_TYPES.COMMERCIAL}>Commercial & Pre-Leased</option>
                  </select>
                </div>
              </div>

              <div className="search-divider"></div>

              {/* Budget Range Dropdown */}
              <div className="search-field">
                <div className="search-field-icon">
                  <Banknote size={18} />
                </div>
                <div className="search-field-content">
                  <label className="search-label">Budget</label>
                  <select 
                    value={selectedBudget} 
                    onChange={(e) => setSelectedBudget(e.target.value)}
                    className="search-select"
                  >
                    <option value="">Any Budget Range</option>
                    <option value="under-1cr">Under ₹ 1 Cr</option>
                    <option value="1cr-3cr">₹ 1 Cr - ₹ 3 Cr</option>
                    <option value="3cr-7cr">₹ 3 Cr - ₹ 7 Cr</option>
                    <option value="above-7cr">Above ₹ 7 Cr</option>
                  </select>
                </div>
              </div>

              {/* Search Submit Action */}
              <div className="search-btn-wrap">
                <button type="submit" className="btn btn-gold search-submit-btn">
                  <Search size={18} />
                  <span>Search Properties</span>
                </button>
              </div>
            </form>
          </div>

          {/* Trust Indicators Bar */}
          <div className="hero-trust-bar">
            <div className="trust-item">
              <span className="trust-val">₹ 1,200+ Cr</span>
              <span className="trust-lbl">Advisory Volume</span>
            </div>
            <div className="trust-separator"></div>
            <div className="trust-item">
              <span className="trust-val">100%</span>
              <span className="trust-lbl">Verified Clear Titles</span>
            </div>
            <div className="trust-separator"></div>
            <div className="trust-item">
              <span className="trust-val">500+</span>
              <span className="trust-lbl">Curated Opportunities</span>
            </div>
            <div className="trust-separator"></div>
            <div className="trust-item-action">
              <button 
                type="button" 
                className="trust-action-link"
                onClick={() => onOpenInquiry(null)}
              >
                <span>Need Personalized Advisory?</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          position: relative;
          min-height: 88vh;
          display: flex;
          align-items: center;
          padding: 80px 0 60px;
          overflow: hidden;
        }

        .hero-background-wrapper {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        .hero-bg-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 30%;
          transform: scale(1.03);
          filter: brightness(0.92);
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(250, 247, 242, 0.94) 0%,
            rgba(250, 247, 242, 0.88) 50%,
            rgba(250, 247, 242, 0.98) 100%
          );
        }

        .relative {
          position: relative;
        }

        .z-10 {
          z-index: 10;
        }

        .hero-content {
          max-width: 960px;
          margin: 0 auto;
          text-align: center;
        }

        .eyebrow-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.85);
          border: 1px solid var(--border-medium);
          backdrop-filter: blur(8px);
          font-size: 0.78rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--text-charcoal-primary);
          margin-bottom: 24px;
          box-shadow: var(--shadow-subtle);
        }

        .text-gold {
          color: var(--gold-primary);
        }

        .hero-headline {
          font-size: 3.2rem;
          font-weight: 600;
          line-height: 1.12;
          color: var(--text-charcoal-primary);
          margin-bottom: 20px;
          letter-spacing: -0.02em;
        }

        @media (min-width: 768px) {
          .hero-headline {
            font-size: 4.4rem;
          }
        }

        .hero-headline-italic {
          font-style: italic;
          font-weight: 400;
          color: var(--gold-dark);
          background: linear-gradient(135deg, #A88339 0%, #C5A059 60%, #85611E 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-subtext {
          font-size: 1.15rem;
          line-height: 1.6;
          color: var(--text-muted-warm);
          max-width: 680px;
          margin: 0 auto 40px;
        }

        @media (min-width: 768px) {
          .hero-subtext {
            font-size: 1.25rem;
          }
        }

        /* Search Interface */
        .search-bar-container {
          background: var(--bg-cream-surface);
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          box-shadow: 0 16px 40px rgba(28, 25, 20, 0.09);
          padding: 8px;
          margin-bottom: 36px;
        }

        .search-bar-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        @media (min-width: 860px) {
          .search-bar-form {
            flex-direction: row;
            align-items: center;
            gap: 0;
          }
        }

        .search-field {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          text-align: left;
        }

        .search-field-icon {
          color: var(--gold-dark);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .search-field-content {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .search-label {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-muted-light);
          margin-bottom: 2px;
        }

        .search-select {
          border: none;
          background: transparent;
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-charcoal-primary);
          outline: none;
          cursor: pointer;
          width: 100%;
          padding: 2px 0;
        }

        .search-divider {
          display: none;
          width: 1px;
          height: 40px;
          background-color: var(--border-subtle);
        }

        @media (min-width: 860px) {
          .search-divider {
            display: block;
          }
        }

        .search-btn-wrap {
          padding: 4px;
        }

        .search-submit-btn {
          width: 100%;
          padding: 14px 28px;
        }

        @media (min-width: 860px) {
          .search-submit-btn {
            width: auto;
          }
        }

        /* Trust Bar */
        .hero-trust-bar {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 20px 32px;
          padding: 18px 24px;
          background: rgba(255, 255, 255, 0.6);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          backdrop-filter: blur(6px);
        }

        .trust-item {
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .trust-val {
          font-family: var(--font-display);
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-charcoal-primary);
        }

        .trust-lbl {
          font-size: 0.75rem;
          color: var(--text-muted-warm);
        }

        .trust-separator {
          display: none;
          width: 1px;
          height: 28px;
          background-color: var(--border-subtle);
        }

        @media (min-width: 640px) {
          .trust-separator {
            display: block;
          }
        }

        .trust-action-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--gold-dark);
          transition: transform var(--transition-fast);
        }

        .trust-action-link:hover {
          color: #785818;
          transform: translateX(3px);
        }
      `}</style>
    </section>
  );
}
