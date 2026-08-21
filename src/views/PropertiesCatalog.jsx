import React, { useState, useMemo } from 'react';
import { Search, Filter, MapPin, Bed, Maximize2, Tag, ArrowRight, Sparkles, X, RotateCcw } from 'lucide-react';
import { PROPERTY_TYPES, LOCATIONS } from '../data/properties';

export default function PropertiesCatalog({ 
  properties, 
  activeCategory, 
  setActiveCategory, 
  activeLocation, 
  setActiveLocation, 
  searchQuery, 
  setSearchQuery,
  onSelectProperty, 
  onOpenInquiry 
}) {
  const [budgetFilter, setBudgetFilter] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  // Filter properties
  const filteredProperties = useMemo(() => {
    return properties.filter((prop) => {
      // Category Filter
      if (activeCategory && prop.type !== activeCategory) {
        return false;
      }
      // Location Filter
      if (activeLocation && prop.location.toLowerCase() !== activeLocation.toLowerCase()) {
        return false;
      }
      // Search Query Filter
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = prop.title.toLowerCase().includes(q);
        const matchesLoc = prop.location.toLowerCase().includes(q) || prop.subLocation.toLowerCase().includes(q);
        const matchesDesc = prop.description.toLowerCase().includes(q);
        if (!matchesTitle && !matchesLoc && !matchesDesc) {
          return false;
        }
      }
      // Budget Filter
      if (budgetFilter) {
        if (budgetFilter === 'under-1cr' && prop.priceRaw > 10000000) return false;
        if (budgetFilter === '1cr-3cr' && (prop.priceRaw < 10000000 || prop.priceRaw > 30000000)) return false;
        if (budgetFilter === '3cr-7cr' && (prop.priceRaw < 30000000 || prop.priceRaw > 70000000)) return false;
        if (budgetFilter === 'above-7cr' && prop.priceRaw < 70000000) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.priceRaw - b.priceRaw;
      if (sortBy === 'price-high') return b.priceRaw - a.priceRaw;
      if (sortBy === 'featured') return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      return 0;
    });
  }, [properties, activeCategory, activeLocation, searchQuery, budgetFilter, sortBy]);

  const handleResetFilters = () => {
    setActiveCategory(null);
    setActiveLocation(null);
    setSearchQuery('');
    setBudgetFilter('');
    setSortBy('featured');
  };

  const getPageTitle = () => {
    if (activeCategory === PROPERTY_TYPES.RESIDENCE) return 'Residential Properties & Luxury Estates';
    if (activeCategory === PROPERTY_TYPES.PLOTS) return 'Plotted Developments & Land Parcels';
    if (activeCategory === PROPERTY_TYPES.COMMERCIAL) return 'Commercial Properties & Corporate Suites';
    if (activeLocation) return `Properties in ${activeLocation}`;
    return 'All Curated Properties';
  };

  return (
    <div className="catalog-page">
      <div className="container">
        {/* Breadcrumb & Header */}
        <div className="catalog-header">
          <div className="catalog-breadcrumb">
            <span className="breadcrumb-link" onClick={handleResetFilters}>Home</span>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current">Properties</span>
            {activeCategory && (
              <>
                <span className="breadcrumb-sep">/</span>
                <span className="breadcrumb-current">{activeCategory}</span>
              </>
            )}
            {activeLocation && (
              <>
                <span className="breadcrumb-sep">/</span>
                <span className="breadcrumb-current">{activeLocation}</span>
              </>
            )}
          </div>

          <h1 className="catalog-title">{getPageTitle()}</h1>
          <p className="catalog-subtitle">
            Browse our verified collection of architectural residences, high-growth plots, and pre-leased commercial real estate.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="filter-toolbar">
          {/* Category Tabs */}
          <div className="category-tabs">
            <button 
              className={`cat-tab ${!activeCategory ? 'active' : ''}`}
              onClick={() => setActiveCategory(null)}
            >
              All Categories ({properties.length})
            </button>
            <button 
              className={`cat-tab ${activeCategory === PROPERTY_TYPES.RESIDENCE ? 'active' : ''}`}
              onClick={() => setActiveCategory(PROPERTY_TYPES.RESIDENCE)}
            >
              Residence
            </button>
            <button 
              className={`cat-tab ${activeCategory === PROPERTY_TYPES.PLOTS ? 'active' : ''}`}
              onClick={() => setActiveCategory(PROPERTY_TYPES.PLOTS)}
            >
              Plots
            </button>
            <button 
              className={`cat-tab ${activeCategory === PROPERTY_TYPES.COMMERCIAL ? 'active' : ''}`}
              onClick={() => setActiveCategory(PROPERTY_TYPES.COMMERCIAL)}
            >
              Commercial
            </button>
          </div>

          {/* Sub Filters Row */}
          <div className="sub-filters-row">
            {/* Search Input */}
            <div className="catalog-search-wrap">
              <Search size={16} className="search-icon" />
              <input 
                type="text" 
                className="catalog-search-input"
                placeholder="Search by name, sector, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button className="clear-search-btn" onClick={() => setSearchQuery('')}>
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Location Select */}
            <select 
              className="filter-select"
              value={activeLocation || ''}
              onChange={(e) => setActiveLocation(e.target.value || null)}
            >
              <option value="">All Locations</option>
              {LOCATIONS.map(loc => (
                <option key={loc.id} value={loc.name}>{loc.name}, {loc.state}</option>
              ))}
            </select>

            {/* Budget Select */}
            <select 
              className="filter-select"
              value={budgetFilter}
              onChange={(e) => setBudgetFilter(e.target.value)}
            >
              <option value="">Any Budget</option>
              <option value="under-1cr">Under ₹ 1 Cr</option>
              <option value="1cr-3cr">₹ 1 Cr - ₹ 3 Cr</option>
              <option value="3cr-7cr">₹ 3 Cr - ₹ 7 Cr</option>
              <option value="above-7cr">Above ₹ 7 Cr</option>
            </select>

            {/* Sort Select */}
            <select 
              className="filter-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="featured">Sort: Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          {/* Active Filter Tags */}
          {(activeCategory || activeLocation || budgetFilter || searchQuery) && (
            <div className="active-filters-bar">
              <span className="active-filters-lbl">Active Filters:</span>
              {activeCategory && (
                <span className="filter-tag">
                  Type: {activeCategory}
                  <button onClick={() => setActiveCategory(null)}><X size={12} /></button>
                </span>
              )}
              {activeLocation && (
                <span className="filter-tag">
                  Location: {activeLocation}
                  <button onClick={() => setActiveLocation(null)}><X size={12} /></button>
                </span>
              )}
              {budgetFilter && (
                <span className="filter-tag">
                  Budget: {budgetFilter}
                  <button onClick={() => setBudgetFilter('')}><X size={12} /></button>
                </span>
              )}
              {searchQuery && (
                <span className="filter-tag">
                  Query: "{searchQuery}"
                  <button onClick={() => setSearchQuery('')}><X size={12} /></button>
                </span>
              )}
              <button className="reset-all-btn" onClick={handleResetFilters}>
                <RotateCcw size={13} />
                <span>Reset All</span>
              </button>
            </div>
          )}
        </div>

        {/* Results Counter */}
        <div className="results-count-bar">
          <span>Showing <strong>{filteredProperties.length}</strong> matching properties</span>
        </div>

        {/* Property Grid or Empty State */}
        {filteredProperties.length > 0 ? (
          <div className="catalog-grid">
            {filteredProperties.map((prop) => (
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

                  <div className="prop-top-badges">
                    <span className="badge-gold">
                      <Sparkles size={12} />
                      <span>{prop.badge || 'Verified'}</span>
                    </span>
                    <span className="badge-dark">{prop.type}</span>
                  </div>

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

                  {prop.expectedYield && (
                    <div className="prop-yield-row">
                      <Tag size={13} className="yield-icon" />
                      <span>{prop.expectedYield}</span>
                    </div>
                  )}

                  <div className="prop-action-row">
                    <button 
                      type="button" 
                      className="btn btn-outline btn-sm w-full prop-view-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProperty(prop);
                      }}
                    >
                      <span>View Details</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* EMPTY STATE WITH CUSTOM LEAD CONVERSION ACTION */
          <div className="empty-state-box">
            <div className="empty-icon-wrap">
              <Search size={36} className="text-gold" />
            </div>
            <h3 className="empty-title">No Matching Properties Found</h3>
            <p className="empty-desc">
              We couldn't find properties matching your exact filter criteria. However, our advisory desk has extensive offline inventory and upcoming developer mandates.
            </p>
            <div className="empty-actions">
              <button 
                type="button" 
                className="btn btn-outline btn-sm"
                onClick={handleResetFilters}
              >
                <span>Clear All Filters</span>
              </button>
              <button 
                type="button" 
                className="btn btn-gold btn-sm"
                onClick={() => onOpenInquiry({
                  property_type: activeCategory || PROPERTY_TYPES.RESIDENCE,
                  location: activeLocation || '',
                  requirements: `Looking for unlisted inventory matching filters: Type: ${activeCategory || 'Any'}, Location: ${activeLocation || 'Any'}`
                })}
              >
                <span>Tell Us What You Need →</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .catalog-page {
          padding: 40px 0 90px;
          background-color: var(--bg-cream-primary);
          min-height: 80vh;
        }

        .catalog-header {
          margin-bottom: 32px;
        }

        .catalog-breadcrumb {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8rem;
          color: var(--text-muted-light);
          margin-bottom: 12px;
        }

        .breadcrumb-link {
          cursor: pointer;
          color: var(--gold-dark);
          font-weight: 600;
        }

        .breadcrumb-sep {
          color: var(--border-medium);
        }

        .breadcrumb-current {
          color: var(--text-charcoal-primary);
        }

        .catalog-title {
          font-family: var(--font-display);
          font-size: 2.4rem;
          font-weight: 700;
          color: var(--text-charcoal-primary);
          margin-bottom: 8px;
        }

        .catalog-subtitle {
          font-size: 1.05rem;
          color: var(--text-muted-warm);
          max-width: 680px;
        }

        /* Filter Toolbar */
        .filter-toolbar {
          background: var(--bg-cream-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 20px;
          box-shadow: var(--shadow-subtle);
          margin-bottom: 28px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .category-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          padding-bottom: 14px;
          border-bottom: 1px solid var(--border-subtle);
        }

        .cat-tab {
          padding: 8px 18px;
          font-size: 0.88rem;
          font-weight: 600;
          border-radius: var(--radius-xs);
          background: var(--bg-cream-light);
          border: 1px solid var(--border-subtle);
          color: var(--text-charcoal-secondary);
          transition: all var(--transition-fast);
        }

        .cat-tab:hover {
          border-color: var(--gold-primary);
          color: var(--gold-dark);
        }

        .cat-tab.active {
          background: var(--gold-gradient);
          color: #FFFFFF;
          border-color: transparent;
          box-shadow: var(--shadow-gold);
        }

        .sub-filters-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }

        @media (min-width: 768px) {
          .sub-filters-row {
            grid-template-columns: 1.8fr 1fr 1fr 1.2fr;
          }
        }

        .catalog-search-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-icon {
          position: absolute;
          left: 12px;
          color: var(--text-muted-light);
          pointer-events: none;
        }

        .catalog-search-input {
          width: 100%;
          padding: 10px 14px 10px 38px;
          font-size: 0.88rem;
          background: var(--bg-cream-light);
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-xs);
          outline: none;
          transition: all var(--transition-fast);
        }

        .catalog-search-input:focus {
          border-color: var(--gold-primary);
          background: #FFFFFF;
        }

        .clear-search-btn {
          position: absolute;
          right: 10px;
          color: var(--text-muted-light);
        }

        .filter-select {
          padding: 10px 12px;
          font-size: 0.88rem;
          font-weight: 500;
          background: var(--bg-cream-light);
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-xs);
          outline: none;
          cursor: pointer;
        }

        .filter-select:focus {
          border-color: var(--gold-primary);
          background: #FFFFFF;
        }

        .active-filters-bar {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 8px;
          padding-top: 10px;
          border-top: 1px solid var(--border-subtle);
        }

        .active-filters-lbl {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--text-muted-warm);
        }

        .filter-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--gold-tint-10);
          border: 1px solid var(--gold-border);
          color: var(--gold-dark);
          font-size: 0.78rem;
          font-weight: 600;
          padding: 3px 8px;
          border-radius: 4px;
        }

        .filter-tag button {
          color: var(--gold-dark);
          display: flex;
          align-items: center;
        }

        .reset-all-btn {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--text-muted-warm);
          margin-left: auto;
        }

        .reset-all-btn:hover {
          color: var(--gold-dark);
        }

        .results-count-bar {
          margin-bottom: 24px;
          font-size: 0.9rem;
          color: var(--text-muted-warm);
        }

        .catalog-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 30px;
        }

        @media (min-width: 768px) {
          .catalog-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1100px) {
          .catalog-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        /* Empty State */
        .empty-state-box {
          background: var(--bg-cream-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 60px 24px;
          text-align: center;
          box-shadow: var(--shadow-subtle);
        }

        .empty-icon-wrap {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: var(--gold-tint-10);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          border: 1px solid var(--gold-border);
        }

        .empty-title {
          font-family: var(--font-display);
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--text-charcoal-primary);
          margin-bottom: 10px;
        }

        .empty-desc {
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--text-muted-warm);
          max-width: 520px;
          margin: 0 auto 28px;
        }

        .empty-actions {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 14px;
        }
      `}</style>
    </div>
  );
}
