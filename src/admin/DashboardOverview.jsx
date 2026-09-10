import React from 'react';
import { Users, Clock, CheckCircle2, XCircle, Building2, Sparkles, ArrowRight, Eye, Phone, MapPin, Plus } from 'lucide-react';

export default function DashboardOverview({ 
  leads, 
  properties, 
  onViewLead, 
  onNavigateTab, 
  onAddNewProperty 
}) {
  const totalLeads = leads.length;
  const pendingLeads = leads.filter(l => l.status === 'Pending').length;
  const acceptedLeads = leads.filter(l => l.status === 'Accepted').length;
  const rejectedLeads = leads.filter(l => l.status === 'Rejected').length;
  const totalProperties = properties.length;
  const featuredProperties = properties.filter(p => p.featured).length;

  const recentLeads = leads.slice(0, 6);

  return (
    <div className="dashboard-overview animate-fade-in">
      {/* Welcome Banner */}
      <div className="admin-welcome-banner">
        <div>
          <div className="eyebrow eyebrow-no-line text-gold">Executive Summary</div>
          <h1 className="welcome-heading">Welcome back, Administrator</h1>
          <p className="welcome-subtext">
            Here is a real-time overview of customer inquiries, lead conversions, and your active luxury property catalog.
          </p>
        </div>

        <div className="banner-actions">
          <button 
            type="button" 
            className="btn btn-gold btn-sm"
            onClick={onAddNewProperty}
          >
            <Plus size={16} />
            <span>Add New Property</span>
          </button>
        </div>
      </div>

      {/* 6 Key Statistics Cards */}
      <div className="admin-stats-grid">
        {/* Total Leads */}
        <div className="stat-card" onClick={() => onNavigateTab('leads')} role="button" tabIndex={0}>
          <div className="stat-card-left">
            <span className="stat-label">Total Inquiries</span>
            <span className="stat-value">{totalLeads}</span>
            <span className="stat-subtext">Form submissions</span>
          </div>
          <div className="stat-icon-box stat-icon-gold">
            <Users size={22} />
          </div>
        </div>

        {/* Pending Leads */}
        <div className="stat-card" onClick={() => onNavigateTab('leads')} role="button" tabIndex={0}>
          <div className="stat-card-left">
            <span className="stat-label">Pending Action</span>
            <span className="stat-value">{pendingLeads}</span>
            <span className="stat-subtext">Awaiting review</span>
          </div>
          <div className="stat-icon-box stat-icon-pending">
            <Clock size={22} />
          </div>
        </div>

        {/* Accepted Leads */}
        <div className="stat-card" onClick={() => onNavigateTab('leads')} role="button" tabIndex={0}>
          <div className="stat-card-left">
            <span className="stat-label">Accepted Leads</span>
            <span className="stat-value">{acceptedLeads}</span>
            <span className="stat-subtext">In follow-up pipeline</span>
          </div>
          <div className="stat-icon-box stat-icon-accepted">
            <CheckCircle2 size={22} />
          </div>
        </div>

        {/* Rejected Leads */}
        <div className="stat-card" onClick={() => onNavigateTab('leads')} role="button" tabIndex={0}>
          <div className="stat-card-left">
            <span className="stat-label">Rejected Leads</span>
            <span className="stat-value">{rejectedLeads}</span>
            <span className="stat-subtext">Unqualified / Duplicate</span>
          </div>
          <div className="stat-icon-box stat-icon-rejected">
            <XCircle size={22} />
          </div>
        </div>

        {/* Total Properties */}
        <div className="stat-card" onClick={() => onNavigateTab('properties')} role="button" tabIndex={0}>
          <div className="stat-card-left">
            <span className="stat-label">Active Portfolio</span>
            <span className="stat-value">{totalProperties}</span>
            <span className="stat-subtext">Verified listings</span>
          </div>
          <div className="stat-icon-box stat-icon-gold">
            <Building2 size={22} />
          </div>
        </div>

        {/* Featured Properties */}
        <div className="stat-card" onClick={() => onNavigateTab('properties')} role="button" tabIndex={0}>
          <div className="stat-card-left">
            <span className="stat-label">Featured Estates</span>
            <span className="stat-value">{featuredProperties}</span>
            <span className="stat-subtext">Homepage spotlight</span>
          </div>
          <div className="stat-icon-box stat-icon-gold">
            <Sparkles size={22} />
          </div>
        </div>
      </div>

      {/* Recent Inquiries Table */}
      <div className="admin-card-section">
        <div className="admin-card-header">
          <div>
            <h2 className="admin-section-heading">Recent Customer Inquiries</h2>
            <p className="admin-section-sub">Latest lead submissions received from the website lead engine.</p>
          </div>
          <button 
            type="button" 
            className="btn btn-outline btn-sm"
            onClick={() => onNavigateTab('leads')}
          >
            <span>View All Leads ({leads.length})</span>
            <ArrowRight size={15} />
          </button>
        </div>

        {recentLeads.length > 0 ? (
          <>
            {/* Desktop Table View */}
            <div className="admin-table-responsive desktop-table-view">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Client Name</th>
                    <th>Phone / Email</th>
                    <th>Property / Type</th>
                    <th>Location</th>
                    <th>Budget</th>
                    <th>Status</th>
                    <th>Received Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentLeads.map((lead) => (
                    <tr key={lead.id}>
                      <td>
                        <strong>{lead.name}</strong>
                      </td>
                      <td>
                        <div className="cell-contact">
                          <span>{lead.phone}</span>
                          {lead.email && <span className="cell-sub">{lead.email}</span>}
                        </div>
                      </td>
                      <td>
                        <div className="cell-prop">
                          <span className="font-semibold">{lead.property_type}</span>
                          {lead.property_title && (
                            <span className="cell-prop-title" title={lead.property_title}>
                              {lead.property_title}
                            </span>
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="cell-location">
                          <MapPin size={13} className="text-gold" />
                          <span>{lead.location || 'Any'}</span>
                        </div>
                      </td>
                      <td>
                        <span className="text-gold font-semibold">{lead.budget || 'Flexible'}</span>
                      </td>
                      <td>
                        <span className={`status-badge ${lead.status.toLowerCase()}`}>
                          {lead.status}
                        </span>
                      </td>
                      <td>
                        <span className="cell-date">
                          {new Date(lead.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </td>
                      <td>
                        <button 
                          type="button" 
                          className="btn-icon-action"
                          onClick={() => onViewLead(lead)}
                          title="View Full Lead Details"
                        >
                          <Eye size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards List View */}
            <div className="admin-mobile-cards-list">
              {recentLeads.map((lead) => (
                <div key={lead.id} className="admin-mobile-card" onClick={() => onViewLead(lead)} role="button" tabIndex={0}>
                  <div className="admin-mobile-card-top">
                    <div>
                      <div className="admin-mobile-card-title">{lead.name}</div>
                      <div className="admin-mobile-card-sub">
                        {new Date(lead.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                    <span className={`status-badge ${lead.status.toLowerCase()}`}>
                      {lead.status}
                    </span>
                  </div>

                  <div className="admin-mobile-card-body">
                    <div className="admin-mobile-card-row">
                      <span className="admin-mobile-card-lbl">Contact:</span>
                      <span className="admin-mobile-card-val">{lead.phone}</span>
                    </div>
                    <div className="admin-mobile-card-row">
                      <span className="admin-mobile-card-lbl">Asset Type:</span>
                      <span className="admin-mobile-card-val">{lead.property_type}</span>
                    </div>
                    <div className="admin-mobile-card-row">
                      <span className="admin-mobile-card-lbl">Location / Budget:</span>
                      <span className="admin-mobile-card-val text-gold">{lead.location || 'Any'} • {lead.budget || 'Flexible'}</span>
                    </div>
                    {lead.property_title && (
                      <div className="admin-mobile-card-row">
                        <span className="admin-mobile-card-lbl">Property:</span>
                        <span className="admin-mobile-card-val" style={{ maxWidth: '170px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {lead.property_title}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="admin-mobile-card-actions">
                    <button 
                      type="button" 
                      className="btn btn-gold btn-sm w-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewLead(lead);
                      }}
                    >
                      <Eye size={15} />
                      <span>View Lead Dossier</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="admin-empty-table">
            <Users size={32} className="text-muted-light" />
            <p>No customer inquiries submitted yet. New leads will automatically show up here.</p>
          </div>
        )}
      </div>

      <style>{`
        .admin-welcome-banner {
          background: #FFFFFF;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 24px 28px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 24px;
          box-shadow: 0 2px 10px rgba(28, 25, 20, 0.03);
        }

        @media (min-width: 768px) {
          .admin-welcome-banner {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
        }

        @media (max-width: 640px) {
          .admin-welcome-banner {
            padding: 16px 14px;
            gap: 12px;
          }
          .welcome-heading {
            font-size: 1.3rem;
          }
          .welcome-subtext {
            font-size: 0.82rem;
          }
          .banner-actions {
            width: 100%;
          }
          .banner-actions button {
            width: 100%;
            justify-content: center;
          }
        }

        .welcome-heading {
          font-family: var(--font-display);
          font-size: 1.85rem;
          font-weight: 700;
          color: var(--text-charcoal-primary);
          margin-bottom: 4px;
        }

        .welcome-subtext {
          font-size: 0.9rem;
          color: var(--text-muted-warm);
          max-width: 620px;
        }

        .cell-contact {
          display: flex;
          flex-direction: column;
          font-size: 0.84rem;
        }

        .cell-sub {
          font-size: 0.75rem;
          color: var(--text-muted-warm);
        }

        .cell-prop {
          display: flex;
          flex-direction: column;
          max-width: 220px;
        }

        .cell-prop-title {
          font-size: 0.75rem;
          color: var(--text-muted-warm);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .cell-location {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.84rem;
        }

        .cell-date {
          font-size: 0.8rem;
          color: var(--text-muted-warm);
          white-space: nowrap;
        }

        .admin-empty-table {
          padding: 40px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          color: var(--text-muted-warm);
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  );
}
