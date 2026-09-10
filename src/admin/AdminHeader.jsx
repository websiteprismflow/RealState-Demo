import React from 'react';
import { Menu, ExternalLink, Sparkles, Bell } from 'lucide-react';

export default function AdminHeader({ activeTab, onToggleSidebar, onViewCustomerSite }) {
  const getTabTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Dashboard';
      case 'leads':
        return 'Leads Engine';
      case 'properties':
        return 'Properties';
      case 'settings':
        return 'Settings';
      default:
        return 'Admin Suite';
    }
  };

  const getFullTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Executive Dashboard';
      case 'leads':
        return 'Leads & Inquiry Management';
      case 'properties':
        return 'Property Inventory Portfolio';
      case 'settings':
        return 'System & Profile Settings';
      default:
        return 'Admin Suite';
    }
  };

  return (
    <header className="admin-top-header">
      <div className="header-left">
        <button 
          type="button" 
          className="sidebar-toggle-btn"
          onClick={onToggleSidebar}
          aria-label="Toggle Admin Sidebar"
        >
          <Menu size={20} />
        </button>

        <h1 className="header-page-title">
          <span className="title-desktop">{getFullTitle()}</span>
          <span className="title-mobile">{getTabTitle()}</span>
        </h1>
      </div>

      <div className="header-right">
        <button 
          type="button" 
          className="site-preview-btn"
          onClick={onViewCustomerSite}
          title="Open Customer-Facing Real Estate Website"
        >
          <ExternalLink size={14} />
          <span className="site-btn-desktop">Customer Website</span>
          <span className="site-btn-mobile">View Site</span>
        </button>
      </div>
    </header>
  );
}
