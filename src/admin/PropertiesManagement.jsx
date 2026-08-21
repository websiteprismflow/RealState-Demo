import React, { useState, useMemo } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Eye, Sparkles, MapPin, Bed, Maximize2, Tag, Building2, Check, RotateCcw } from 'lucide-react';
import { LOCATIONS, PROPERTY_TYPES } from '../data/properties';

export default function PropertiesManagement({ 
  properties, 
  onAddNew, 
  onEdit, 
  onDeleteRequest, 
  onToggleFeatured, 
  onChangeStatus,
  onViewCustomerProperty 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [locationFilter, setLocationFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [featuredOnly, setFeaturedOnly] = useState(false);

  const filteredProperties = useMemo(() => {
    return properties.filter((prop) => {
      // Type filter
      if (typeFilter !== 'All' && prop.type !== typeFilter) return false;
      // Location filter
      if (locationFilter !== 'All' && prop.location !== locationFilter) return false;
      // Status filter
      if (statusFilter !== 'All' && prop.status !== statusFilter) return false;
      // Featured only
      if (featuredOnly && !prop.featured) return false;
      // Search
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = prop.title.toLowerCase().includes(q);
        const matchesLoc = prop.location.toLowerCase().includes(q) || prop.subLocation?.toLowerCase().includes(q);
        const matchesDesc = prop.description?.toLowerCase().includes(q);
        if (!matchesTitle && !matchesLoc && !matchesDesc) return false;
      }
      return true;
    });
  }, [properties, searchQuery, typeFilter, locationFilter, statusFilter, featuredOnly]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setTypeFilter('All');
    setLocationFilter('All');
    setStatusFilter('All');
    setFeaturedOnly(false);
  };

  return (
    <div className="properties-management-page animate-fade-in">
      {/* Header */}
      <div className="admin-card-header mb-4">
        <div>
          <h1 className="admin-section-heading">Property Inventory Management</h1>
          <p className="admin-section-sub">
            Maintain, curate, and update all luxury estates, plot corridors, and commercial portfolios across North India.
          </p>
        </div>

        <button 
          type="button" 
          className="btn btn-gold btn-sm add-prop-main-btn"
          onClick={onAddNew}
        >
          <Plus size={16} />
          <span>Add New Property</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="admin-card-section">
        <div className="admin-controls-bar">
          <div className="admin-search-box">
            <Search size={16} className="admin-search-icon" />
            <input 
              type="text" 
              placeholder="Search properties by title, sector, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <select 
            className="admin-filter-select"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value={PROPERTY_TYPES.RESIDENCE}>Residence</option>
            <option value={PROPERTY_TYPES.PLOTS}>Plots</option>
            <option value={PROPERTY_TYPES.COMMERCIAL}>Commercial</option>
          </select>

          <select 
            className="admin-filter-select"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          >
            <option value="All">All Locations</option>
            {LOCATIONS.map(loc => (
              <option key={loc.id} value={loc.name}>{loc.name}</option>
            ))}
          </select>

          <select 
            className="admin-filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Available">Available</option>
            <option value="Reserved">Reserved</option>
            <option value="Sold">Sold Out</option>
            <option value="Inactive">Inactive</option>
          </select>

          <label className="featured-checkbox-label">
            <input 
              type="checkbox" 
              checked={featuredOnly}
              onChange={(e) => setFeaturedOnly(e.target.checked)}
            />
            <span>Featured Spotlight Only</span>
          </label>

          {(searchQuery || typeFilter !== 'All' || locationFilter !== 'All' || statusFilter !== 'All' || featuredOnly) && (
            <button 
              type="button" 
              className="btn btn-outline btn-sm reset-btn"
              onClick={handleResetFilters}
            >
              <RotateCcw size={14} />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Count Bar */}
        <div className="lead-count-indicator">
          <span>Showing <strong>{filteredProperties.length}</strong> of <strong>{properties.length}</strong> listings</span>
        </div>

        {/* Table / Grid */}
        {filteredProperties.length > 0 ? (
          <div className="admin-table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Property Asset</th>
                  <th>Category / Specs</th>
                  <th>Location</th>
                  <th>Price</th>
                  <th>Featured</th>
                  <th>Availability</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProperties.map((prop) => (
                  <tr key={prop.id}>
                    <td>
                      <div className="admin-prop-cell">
                        <div className="admin-prop-thumb">
                          <img 
                            src={prop.images[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=80'} 
                            alt={prop.title} 
                          />
                        </div>
                        <div className="admin-prop-info">
                          <strong className="admin-prop-name" title={prop.title}>{prop.title}</strong>
                          <span className="admin-prop-id">{prop.id} • {prop.badge || 'Verified'}</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="cell-type-specs">
                        <span className="prop-cat-tag">{prop.type}</span>
                        <span className="prop-specs-text">{prop.bedrooms || prop.area}</span>
                      </div>
                    </td>

                    <td>
                      <div className="cell-loc">
                        <MapPin size={13} className="text-gold" />
                        <span>{prop.location}</span>
                        {prop.subLocation && <span className="cell-sub">{prop.subLocation}</span>}
                      </div>
                    </td>

                    <td>
                      <strong className="text-gold font-semibold">{prop.price}</strong>
                      {prop.expectedYield && <span className="yield-mini-tag">{prop.expectedYield}</span>}
                    </td>

                    <td>
                      {/* Featured Toggle Button */}
                      <button 
                        type="button" 
                        className={`featured-toggle-btn ${prop.featured ? 'active' : ''}`}
                        onClick={() => onToggleFeatured(prop.id)}
                        title={prop.featured ? 'Featured on Homepage (Click to disable)' : 'Not Featured (Click to enable)'}
                      >
                        <Sparkles size={13} />
                        <span>{prop.featured ? 'Featured' : 'Standard'}</span>
                      </button>
                    </td>

                    <td>
                      {/* Availability Dropdown */}
                      <select 
                        className={`inline-status-select ${prop.status.toLowerCase()}`}
                        value={prop.status}
                        onChange={(e) => onChangeStatus(prop.id, e.target.value)}
                      >
                        <option value="Available">Available</option>
                        <option value="Reserved">Reserved</option>
                        <option value="Sold">Sold</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </td>

                    <td>
                      <div className="table-actions-cell">
                        <button 
                          type="button" 
                          className="btn-icon-action"
                          onClick={() => onViewCustomerProperty(prop)}
                          title="View on Customer Frontend"
                        >
                          <Eye size={15} />
                        </button>
                        <button 
                          type="button" 
                          className="btn-icon-action"
                          onClick={() => onEdit(prop)}
                          title="Edit Property Information"
                        >
                          <Edit size={15} />
                        </button>
                        <button 
                          type="button" 
                          className="btn-icon-action delete-action"
                          onClick={() => onDeleteRequest(prop)}
                          title="Delete Property"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="admin-empty-table">
            <Building2 size={36} className="text-muted-light" />
            <h3 className="empty-heading">No properties found</h3>
            <p>No listings match your current filters. Adjust your criteria or add a new property.</p>
            <button type="button" className="btn btn-gold btn-sm mt-2" onClick={onAddNew}>
              <Plus size={15} />
              <span>Add New Property</span>
            </button>
          </div>
        )}
      </div>

      <style>{`
        .add-prop-main-btn {
          align-self: flex-start;
        }

        @media (min-width: 768px) {
          .add-prop-main-btn {
            align-self: auto;
          }
        }

        .featured-checkbox-label {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.84rem;
          font-weight: 600;
          color: var(--text-charcoal-primary);
          cursor: pointer;
          user-select: none;
        }

        .admin-prop-cell {
          display: flex;
          align-items: center;
          gap: 12px;
          max-width: 280px;
        }

        .admin-prop-thumb {
          width: 54px;
          height: 42px;
          border-radius: var(--radius-xs);
          overflow: hidden;
          flex-shrink: 0;
          background: var(--bg-cream-muted);
          border: 1px solid var(--border-subtle);
        }

        .admin-prop-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .admin-prop-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .admin-prop-name {
          font-size: 0.88rem;
          color: var(--text-charcoal-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 200px;
        }

        .admin-prop-id {
          font-size: 0.72rem;
          color: var(--text-muted-light);
        }

        .cell-type-specs {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .prop-cat-tag {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--gold-dark);
          text-transform: uppercase;
        }

        .prop-specs-text {
          font-size: 0.78rem;
          color: var(--text-muted-warm);
        }

        .cell-loc {
          display: flex;
          flex-direction: column;
          font-size: 0.84rem;
        }

        .yield-mini-tag {
          display: block;
          font-size: 0.7rem;
          color: var(--gold-dark);
          font-weight: 600;
        }

        .featured-toggle-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 10px;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 600;
          border: 1px solid var(--border-medium);
          background: var(--bg-cream-light);
          color: var(--text-muted-warm);
          transition: all var(--transition-fast);
        }

        .featured-toggle-btn.active {
          background: var(--gold-tint-10);
          border-color: var(--gold-primary);
          color: var(--gold-dark);
          font-weight: 700;
        }

        .featured-toggle-btn:hover {
          border-color: var(--gold-primary);
        }
      `}</style>
    </div>
  );
}
