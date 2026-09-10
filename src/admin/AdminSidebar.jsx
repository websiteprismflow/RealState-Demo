import React from 'react';
import { LayoutDashboard, Users, Building2, Settings, LogOut, ExternalLink, X } from 'lucide-react';

export default function AdminSidebar({ 
  activeTab, 
  setActiveTab, 
  pendingLeadsCount, 
  totalPropertiesCount,
  isOpen, 
  onClose, 
  onLogout, 
  onViewCustomerSite,
  adminUser
}) {
  const handleNavClick = (tab) => {
    setActiveTab(tab);
    onClose();
  };

  const displayName = adminUser?.email ? adminUser.email.split('@')[0] : 'Administrator';
  const roleTitle = adminUser?.adminRole || 'Authorized Admin';

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="modal-overlay" 
          style={{ zIndex: 115 }} 
          onClick={onClose}
        ></div>
      )}

      <aside className={`admin-sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        {/* Brand Header */}
        <div className="sidebar-brand-header">
          <div className="sidebar-brand">
            <div className="brand-icon-wrap">
              <span className="brand-monogram">A</span>
            </div>
            <div className="brand-text-wrap" style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span className="brand-title" style={{ color: '#FFFFFF', letterSpacing: '0.14em', fontSize: '1.25rem', lineHeight: 1.1 }}>AURELIA</span>
              <span className="brand-tagline" style={{ display: 'block', fontSize: '0.62rem', letterSpacing: '0.14em', color: 'var(--gold-light)' }}>ADMIN CONSOLE</span>
            </div>
          </div>

          <button 
            type="button" 
            className="sidebar-close-btn"
            onClick={onClose}
            aria-label="Close Sidebar"
          >
            <X size={22} />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="sidebar-nav">
          <button 
            type="button"
            className={`nav-item-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => handleNavClick('dashboard')}
          >
            <div className="nav-item-left">
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </div>
          </button>

          <button 
            type="button"
            className={`nav-item-btn ${activeTab === 'leads' ? 'active' : ''}`}
            onClick={() => handleNavClick('leads')}
          >
            <div className="nav-item-left">
              <Users size={18} />
              <span>Leads Engine</span>
            </div>
            {pendingLeadsCount > 0 && (
              <span className="nav-badge-pill">{pendingLeadsCount} new</span>
            )}
          </button>

          <button 
            type="button"
            className={`nav-item-btn ${activeTab === 'properties' ? 'active' : ''}`}
            onClick={() => handleNavClick('properties')}
          >
            <div className="nav-item-left">
              <Building2 size={18} />
              <span>Properties</span>
            </div>
            <span className="nav-badge-pill">{totalPropertiesCount}</span>
          </button>

          <button 
            type="button"
            className={`nav-item-btn ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => handleNavClick('settings')}
          >
            <div className="nav-item-left">
              <Settings size={18} />
              <span>Settings</span>
            </div>
          </button>
        </nav>

        {/* Footer Profile & Logout */}
        <div className="sidebar-footer">
          <div className="admin-profile-badge">
            <div className="admin-avatar">
              <span>{displayName.charAt(0).toUpperCase()}</span>
            </div>
            <div style={{ maxWidth: '140px', overflow: 'hidden' }}>
              <div className="admin-info-name" title={adminUser?.email || 'Administrator'}>
                {displayName}
              </div>
              <div className="admin-info-role">{roleTitle}</div>
            </div>
          </div>

          <div className="sidebar-actions-row">
            <button 
              type="button" 
              className="sidebar-action-link"
              onClick={onViewCustomerSite}
              title="Return to Customer Facing Website"
            >
              <ExternalLink size={14} />
              <span>View Site</span>
            </button>

            <button 
              type="button" 
              className="sidebar-action-link logout-btn"
              onClick={onLogout}
              title="Logout from Admin Console"
            >
              <LogOut size={14} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      <style>{`
        .sidebar-close-btn {
          display: none;
          color: #A39E94;
        }

        @media (max-width: 1024px) {
          .sidebar-close-btn {
            display: flex;
            align-items: center;
          }
        }
      `}</style>
    </>
  );
}
