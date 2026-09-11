import React, { useState, useMemo } from 'react';
import { Search, Filter, Eye, Trash2, MapPin, Building, Calendar, Phone, Mail, Clock, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import { LOCATIONS, PROPERTY_TYPES } from '../data/properties';

export default function LeadsManagement({ 
  leads, 
  onViewLead, 
  onStatusChange, 
  onDeleteRequest 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [locationFilter, setLocationFilter] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      // Status Filter
      if (statusFilter !== 'All' && lead.status !== statusFilter) {
        return false;
      }
      // Type Filter
      if (typeFilter !== 'All' && lead.property_type !== typeFilter) {
        return false;
      }
      // Location Filter
      if (locationFilter !== 'All' && !lead.location?.toLowerCase().includes(locationFilter.toLowerCase())) {
        return false;
      }
      // Search Query
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesName = lead.name?.toLowerCase().includes(q);
        const matchesPhone = lead.phone?.toLowerCase().includes(q);
        const matchesEmail = lead.email?.toLowerCase().includes(q);
        const matchesReqs = lead.requirements?.toLowerCase().includes(q);
        const matchesProp = lead.property_title?.toLowerCase().includes(q);
        if (!matchesName && !matchesPhone && !matchesEmail && !matchesReqs && !matchesProp) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
    });
  }, [leads, searchQuery, statusFilter, typeFilter, locationFilter, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('All');
    setTypeFilter('All');
    setLocationFilter('All');
    setSortBy('newest');
  };

  return (
    <div className="leads-management-page animate-fade-in">
      {/* Header */}
      <div className="admin-card-header mb-4">
        <div>
          <h1 className="admin-section-heading">Lead & Customer Inquiry Management</h1>
          <p className="admin-section-sub">
            <strong style={{ color: '#8C6D23' }}>Demo Showcase Notice:</strong> All client lead names, phone numbers, emails, and requirements shown below are entirely fictional / fake demo records created for showcase purposes.
          </p>
        </div>
      </div>

      {/* Filter and Search Controls Bar */}
      <div className="admin-card-section">
        <div className="admin-controls-bar">
          {/* Search Box */}
          <div className="admin-search-box">
            <Search size={16} className="admin-search-icon" />
            <input 
              type="text" 
              placeholder="Search by client name, phone number, email, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="admin-filters-grid">
            {/* Status Filter */}
            <select 
              className="admin-filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses ({leads.length})</option>
              <option value="Pending">Pending Action</option>
              <option value="Accepted">Accepted Leads</option>
              <option value="Rejected">Rejected Leads</option>
            </select>

            {/* Property Type Filter */}
            <select 
              className="admin-filter-select"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="All">All Asset Types</option>
              <option value={PROPERTY_TYPES.RESIDENCE}>Residence</option>
              <option value={PROPERTY_TYPES.PLOTS}>Plots</option>
              <option value={PROPERTY_TYPES.COMMERCIAL}>Commercial</option>
            </select>

            {/* Location Filter */}
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

            {/* Sort Control */}
            <select 
              className="admin-filter-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Sort: Newest First</option>
              <option value="oldest">Sort: Oldest First</option>
            </select>

            {(searchQuery || statusFilter !== 'All' || typeFilter !== 'All' || locationFilter !== 'All') && (
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
        </div>

        {/* Count Bar */}
        <div className="lead-count-indicator">
          <span>Showing <strong>{filteredLeads.length}</strong> of <strong>{leads.length}</strong> inquiries</span>
        </div>

        {/* Table or Empty State */}
        {filteredLeads.length > 0 ? (
          <>
            {/* Desktop Table View */}
            <div className="admin-table-responsive desktop-table-view">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Client & Contact</th>
                    <th>Property Requirement</th>
                    <th>Location & Budget</th>
                    <th>Timeline / Purpose</th>
                    <th>Lead Status</th>
                    <th>Received Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id}>
                      <td>
                        <div className="cell-client-info">
                          <strong className="client-full-name">{lead.name}</strong>
                          <div className="contact-links-row">
                            <a href={`tel:${lead.phone}`} className="contact-phone-link">
                              <Phone size={12} />
                              <span>{lead.phone}</span>
                            </a>
                            {lead.email && (
                              <a href={`mailto:${lead.email}`} className="contact-email-link" title={lead.email}>
                                <Mail size={12} />
                                <span>{lead.email}</span>
                              </a>
                            )}
                          </div>
                        </div>
                      </td>

                      <td>
                        <div className="cell-prop-req">
                          <span className="prop-type-badge">{lead.property_type}</span>
                          {lead.property_title ? (
                            <span className="prop-attached-name" title={lead.property_title}>
                              {lead.property_title}
                            </span>
                          ) : (
                            <span className="prop-general-tag">General Inquiry</span>
                          )}
                        </div>
                      </td>

                      <td>
                        <div className="cell-loc-budget">
                          <div className="loc-row">
                            <MapPin size={12} className="text-gold" />
                            <span>{lead.location || 'Flexible'}</span>
                          </div>
                          <span className="budget-tag font-semibold text-gold">{lead.budget || 'Flexible'}</span>
                        </div>
                      </td>

                      <td>
                        <div className="cell-timeline-purpose">
                          <span className="timeline-tag">{lead.timeline || 'Immediate'}</span>
                          <span className="purpose-tag">{lead.purpose || 'Self Use'}</span>
                        </div>
                      </td>

                      <td>
                        {/* Inline Status Dropdown for Quick Action */}
                        <select 
                          className={`inline-status-select ${lead.status.toLowerCase()}`}
                          value={lead.status}
                          onChange={(e) => onStatusChange(lead.id, e.target.value)}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Accepted">Accepted</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </td>

                      <td>
                        <span className="cell-date">
                          {new Date(lead.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </td>

                      <td>
                        <div className="table-actions-cell">
                          <button 
                            type="button" 
                            className="btn-icon-action"
                            onClick={() => onViewLead(lead)}
                            title="View Full Lead Dossier"
                          >
                            <Eye size={15} />
                          </button>
                          <button 
                            type="button" 
                            className="btn-icon-action delete-action"
                            onClick={() => onDeleteRequest(lead)}
                            title="Delete Lead"
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

            {/* Mobile Cards View */}
            <div className="admin-mobile-cards-list">
              {filteredLeads.map((lead) => (
                <div key={lead.id} className="admin-mobile-card">
                  <div className="admin-mobile-card-top">
                    <div>
                      <div className="admin-mobile-card-title">{lead.name}</div>
                      <div className="admin-mobile-card-sub">
                        {new Date(lead.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    </div>
                    <span className={`status-badge ${lead.status.toLowerCase()}`}>
                      {lead.status}
                    </span>
                  </div>

                  <div className="admin-mobile-card-body">
                    <div className="admin-mobile-card-row">
                      <span className="admin-mobile-card-lbl">Phone:</span>
                      <a href={`tel:${lead.phone}`} className="admin-mobile-card-val text-gold font-semibold" style={{ textDecoration: 'underline' }}>
                        {lead.phone}
                      </a>
                    </div>
                    {lead.email && (
                      <div className="admin-mobile-card-row">
                        <span className="admin-mobile-card-lbl">Email:</span>
                        <a href={`mailto:${lead.email}`} className="admin-mobile-card-val" style={{ textDecoration: 'underline' }}>
                          {lead.email}
                        </a>
                      </div>
                    )}
                    <div className="admin-mobile-card-row">
                      <span className="admin-mobile-card-lbl">Requirement:</span>
                      <span className="admin-mobile-card-val">{lead.property_type}</span>
                    </div>
                    <div className="admin-mobile-card-row">
                      <span className="admin-mobile-card-lbl">Budget / Loc:</span>
                      <span className="admin-mobile-card-val text-gold">{lead.budget || 'Flexible'} • {lead.location || 'Any'}</span>
                    </div>
                    {lead.property_title && (
                      <div className="admin-mobile-card-row">
                        <span className="admin-mobile-card-lbl">Property:</span>
                        <span className="admin-mobile-card-val" style={{ maxWidth: '170px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {lead.property_title}
                        </span>
                      </div>
                    )}
                    <div className="admin-mobile-card-row" style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px dashed var(--border-subtle)' }}>
                      <span className="admin-mobile-card-lbl">Quick Status:</span>
                      <select 
                        className={`inline-status-select ${lead.status.toLowerCase()}`}
                        value={lead.status}
                        onChange={(e) => onStatusChange(lead.id, e.target.value)}
                        style={{ minHeight: '34px', fontSize: '0.8rem' }}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </div>
                  </div>

                  <div className="admin-mobile-card-actions" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '8px' }}>
                    <button 
                      type="button" 
                      className="btn btn-gold btn-sm"
                      onClick={() => onViewLead(lead)}
                      style={{ justifyContent: 'center' }}
                    >
                      <Eye size={15} />
                      <span>View Dossier</span>
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-outline btn-sm delete-action"
                      onClick={() => onDeleteRequest(lead)}
                      title="Delete Lead"
                      style={{ color: '#C62828', borderColor: '#FFCDD2', padding: '0 12px' }}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="admin-empty-table">
            <Filter size={36} className="text-muted-light" />
            <h3 className="empty-heading">No matching inquiries found</h3>
            <p>Try adjusting your search keywords or clear the active status and category filters.</p>
            <button type="button" className="btn btn-outline btn-sm mt-2" onClick={handleResetFilters}>
              <span>Clear All Filters</span>
            </button>
          </div>
        )}
      </div>

      <style>{`
        .mb-4 { margin-bottom: 24px; }
        .lead-count-indicator {
          font-size: 0.82rem;
          color: var(--text-muted-warm);
          margin-bottom: 16px;
        }

        .cell-client-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .client-full-name {
          font-size: 0.95rem;
          color: var(--text-charcoal-primary);
        }

        .contact-links-row {
          display: flex;
          flex-direction: column;
          gap: 2px;
          font-size: 0.76rem;
        }

        .contact-phone-link, .contact-email-link {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          color: var(--text-muted-warm);
        }

        .contact-phone-link:hover, .contact-email-link:hover {
          color: var(--gold-dark);
        }

        .cell-prop-req {
          display: flex;
          flex-direction: column;
          gap: 4px;
          max-width: 200px;
        }

        .prop-type-badge {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--gold-dark);
        }

        .prop-attached-name {
          font-size: 0.8rem;
          color: var(--text-charcoal-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .prop-general-tag {
          font-size: 0.75rem;
          color: var(--text-muted-light);
          font-style: italic;
        }

        .cell-loc-budget {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .loc-row {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.82rem;
        }

        .budget-tag {
          font-size: 0.82rem;
        }

        .cell-timeline-purpose {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .timeline-tag {
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--text-charcoal-secondary);
        }

        .purpose-tag {
          font-size: 0.74rem;
          color: var(--text-muted-warm);
        }

        /* Inline Status Select */
        .inline-status-select {
          padding: 4px 10px;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 700;
          outline: none;
          cursor: pointer;
          border: 1px solid transparent;
        }

        .inline-status-select.pending {
          background: #FFF4D9;
          color: #93630A;
          border-color: #FFE08A;
        }

        .inline-status-select.accepted {
          background: #E8F5E9;
          color: #2E7D32;
          border-color: #C8E6C9;
        }

        .inline-status-select.rejected {
          background: #FFEBEE;
          color: #C62828;
          border-color: #FFCDD2;
        }
      `}</style>
    </div>
  );
}
