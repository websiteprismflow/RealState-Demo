import React from 'react';
import { X, User, Phone, Mail, MapPin, Building, Banknote, Clock, Target, FileText, CheckCircle2, XCircle, AlertCircle, Trash2, Calendar } from 'lucide-react';

export default function LeadDetailModal({ lead, isOpen, onClose, onStatusChange, onDeleteRequest }) {
  if (!isOpen || !lead) return null;

  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose}>
      <div 
        className="admin-lead-modal-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="lead-modal-top">
          <div className="lead-modal-id-row">
            <span className="lead-id-tag">{lead.id}</span>
            <span className={`status-badge ${lead.status.toLowerCase()}`}>
              {lead.status}
            </span>
          </div>

          <h2 className="lead-modal-client-name">{lead.name}</h2>
          <div className="lead-date-row">
            <Calendar size={14} className="text-muted-light" />
            <span>Submitted on {new Date(lead.created_at).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</span>
          </div>
        </div>

        {/* Status Action Switcher Bar */}
        <div className="lead-status-action-bar">
          <span className="status-action-lbl">Update Status:</span>
          <div className="status-btns-group">
            <button 
              type="button"
              className={`status-btn-pill pending ${lead.status === 'Pending' ? 'active' : ''}`}
              onClick={() => onStatusChange(lead.id, 'Pending')}
            >
              <Clock size={14} />
              <span>Pending</span>
            </button>
            <button 
              type="button"
              className={`status-btn-pill accepted ${lead.status === 'Accepted' ? 'active' : ''}`}
              onClick={() => onStatusChange(lead.id, 'Accepted')}
            >
              <CheckCircle2 size={14} />
              <span>Accept Lead</span>
            </button>
            <button 
              type="button"
              className={`status-btn-pill rejected ${lead.status === 'Rejected' ? 'active' : ''}`}
              onClick={() => onStatusChange(lead.id, 'Rejected')}
            >
              <XCircle size={14} />
              <span>Reject</span>
            </button>
          </div>
        </div>

        {/* Detailed Grid */}
        <div className="lead-details-grid">
          {/* Contact Section */}
          <div className="lead-section-box">
            <h3 className="lead-box-title">Contact Details</h3>
            <div className="lead-box-content">
              <div className="lead-info-row">
                <User size={16} className="lead-icon" />
                <div>
                  <span className="lead-lbl">Full Name</span>
                  <span className="lead-val">{lead.name}</span>
                </div>
              </div>

              <div className="lead-info-row">
                <Phone size={16} className="lead-icon" />
                <div>
                  <span className="lead-lbl">Phone Number</span>
                  <a href={`tel:${lead.phone}`} className="lead-val lead-link">{lead.phone}</a>
                </div>
              </div>

              <div className="lead-info-row">
                <Mail size={16} className="lead-icon" />
                <div>
                  <span className="lead-lbl">Email Address</span>
                  {lead.email ? (
                    <a href={`mailto:${lead.email}`} className="lead-val lead-link">{lead.email}</a>
                  ) : (
                    <span className="lead-val text-muted">Not Provided</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Property Preferences Section */}
          <div className="lead-section-box">
            <h3 className="lead-box-title">Property Preferences</h3>
            <div className="lead-box-content">
              <div className="lead-info-row">
                <Building size={16} className="lead-icon" />
                <div>
                  <span className="lead-lbl">Property Type</span>
                  <span className="lead-val font-semibold">{lead.property_type}</span>
                </div>
              </div>

              <div className="lead-info-row">
                <MapPin size={16} className="lead-icon" />
                <div>
                  <span className="lead-lbl">Preferred Location</span>
                  <span className="lead-val">{lead.location || 'Any / Flexible'}</span>
                </div>
              </div>

              <div className="lead-info-row">
                <Banknote size={16} className="lead-icon" />
                <div>
                  <span className="lead-lbl">Budget Estimate</span>
                  <span className="lead-val font-semibold text-gold">{lead.budget || 'Flexible'}</span>
                </div>
              </div>

              <div className="lead-info-row">
                <Clock size={16} className="lead-icon" />
                <div>
                  <span className="lead-lbl">Acquisition Timeline</span>
                  <span className="lead-val">{lead.timeline || 'Immediate'}</span>
                </div>
              </div>

              <div className="lead-info-row">
                <Target size={16} className="lead-icon" />
                <div>
                  <span className="lead-lbl">Purchase Purpose</span>
                  <span className="lead-val">{lead.purpose || 'Self Use'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Associated Property (if any) */}
        {lead.property_title && (
          <div className="lead-associated-prop-box">
            <div className="assoc-header">
              <Building size={16} className="text-gold" />
              <span className="assoc-lbl">Inquired for Specific Property:</span>
            </div>
            <h4 className="assoc-title">{lead.property_title}</h4>
            <span className="assoc-id">Property Ref ID: {lead.property_id || 'N/A'}</span>
          </div>
        )}

        {/* Free Text Requirements */}
        <div className="lead-requirements-box">
          <div className="req-header">
            <FileText size={16} className="text-gold" />
            <span className="req-title">Client's Custom Requirements / Notes:</span>
          </div>
          <div className="req-body">
            {lead.requirements ? (
              <p>{lead.requirements}</p>
            ) : (
              <p className="italic text-muted">No additional custom notes provided by client.</p>
            )}
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="lead-modal-footer">
          <button 
            type="button" 
            className="btn btn-outline btn-sm delete-lead-btn"
            onClick={() => onDeleteRequest(lead)}
          >
            <Trash2 size={15} />
            <span>Delete Lead</span>
          </button>

          <button 
            type="button" 
            className="btn btn-dark btn-sm"
            onClick={onClose}
          >
            <span>Close</span>
          </button>
        </div>
      </div>

      <style>{`
        .admin-lead-modal-card {
          background: #FFFFFF;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-lg);
          width: 100%;
          max-width: 700px;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          padding: 36px 30px;
          box-shadow: 0 25px 60px rgba(0,0,0,0.3);
        }

        .lead-modal-top {
          margin-bottom: 22px;
        }

        .lead-modal-id-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 8px;
        }

        .lead-id-tag {
          font-size: 0.76rem;
          font-weight: 700;
          color: var(--text-muted-light);
          background: var(--bg-cream-light);
          padding: 2px 8px;
          border-radius: 4px;
          border: 1px solid var(--border-subtle);
        }

        .lead-modal-client-name {
          font-family: var(--font-display);
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--text-charcoal-primary);
          line-height: 1.2;
          margin-bottom: 4px;
        }

        .lead-date-row {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          color: var(--text-muted-warm);
        }

        .lead-status-action-bar {
          background: var(--bg-cream-light);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          padding: 12px 16px;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 24px;
        }

        .status-action-lbl {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--text-charcoal-secondary);
          text-transform: uppercase;
        }

        .status-btns-group {
          display: flex;
          gap: 8px;
        }

        .status-btn-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          font-size: 0.78rem;
          font-weight: 600;
          border-radius: var(--radius-xs);
          border: 1px solid var(--border-medium);
          background: #FFFFFF;
          color: var(--text-charcoal-secondary);
          transition: all var(--transition-fast);
        }

        .status-btn-pill.pending:hover, .status-btn-pill.pending.active {
          background: #FFF8E6;
          border-color: #FFE4A0;
          color: #B48016;
          font-weight: 700;
        }

        .status-btn-pill.accepted:hover, .status-btn-pill.accepted.active {
          background: #EBF7EE;
          border-color: #C8E6C9;
          color: #2E7D32;
          font-weight: 700;
        }

        .status-btn-pill.rejected:hover, .status-btn-pill.rejected.active {
          background: #FDF0ED;
          border-color: #FFCDD2;
          color: #C62828;
          font-weight: 700;
        }

        .lead-details-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }

        @media (min-width: 600px) {
          .lead-details-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .lead-section-box {
          background: #FFFFFF;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          padding: 18px;
        }

        .lead-box-title {
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--gold-dark);
          margin-bottom: 14px;
          padding-bottom: 6px;
          border-bottom: 1px solid var(--border-subtle);
        }

        .lead-box-content {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .lead-info-row {
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }

        .lead-icon {
          color: var(--text-muted-light);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .lead-lbl {
          display: block;
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          color: var(--text-muted-light);
        }

        .lead-val {
          font-size: 0.88rem;
          color: var(--text-charcoal-primary);
        }

        .lead-link {
          color: var(--gold-dark);
          font-weight: 600;
          text-decoration: underline;
        }

        .lead-associated-prop-box {
          background: var(--gold-tint-10);
          border: 1px solid var(--gold-border);
          border-radius: var(--radius-sm);
          padding: 16px;
          margin-bottom: 20px;
        }

        .assoc-header {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 4px;
        }

        .assoc-lbl {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--gold-dark);
        }

        .assoc-title {
          font-family: var(--font-display);
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-charcoal-primary);
        }

        .assoc-id {
          font-size: 0.75rem;
          color: var(--text-muted-warm);
        }

        .lead-requirements-box {
          background: var(--bg-cream-light);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          padding: 18px;
          margin-bottom: 24px;
        }

        .req-header {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 10px;
        }

        .req-title {
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--gold-dark);
        }

        .req-body {
          font-size: 0.92rem;
          line-height: 1.6;
          color: var(--text-charcoal-primary);
        }

        .lead-modal-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 18px;
          border-top: 1px solid var(--border-subtle);
        }

        .delete-lead-btn {
          color: #C62828;
          border-color: #FFCDD2;
        }

        .delete-lead-btn:hover {
          background: #FFEBEE;
          border-color: #EF9A9A;
          color: #B71C1C;
        }
      `}</style>
    </div>
  );
}
