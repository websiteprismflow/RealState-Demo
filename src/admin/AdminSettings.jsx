import React, { useState } from 'react';
import { User, Mail, Lock, Bell, ShieldCheck, Database, Save, Check } from 'lucide-react';

export default function AdminSettings({ onShowToast, onShowDemoNotice }) {
  const [profile, setProfile] = useState({
    name: 'Administrator XYZ (Demo Profile)',
    email: 'xyz.admin@demo-showcase.xyz',
    phone: '+91 00000 00000',
    role: 'Super Administrator'
  });

  const [notifications, setNotifications] = useState({
    instantLeadEmail: true,
    dailySummary: true,
    smsAlerts: false,
    leadStatusUpdates: true
  });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (onShowDemoNotice) {
      onShowDemoNotice('This is a demo, so no profile settings changes are saved.', 'Demo Showcase Notice');
    } else {
      onShowToast('This is a demo, so no changes are saved.', 'info');
    }
  };

  const handleSavePassword = (e) => {
    e.preventDefault();
    if (onShowDemoNotice) {
      onShowDemoNotice('This is a demo, so no password changes are saved.', 'Demo Showcase Notice');
    } else {
      onShowToast('This is a demo, so no changes are saved.', 'info');
    }
  };

  return (
    <div className="admin-settings-page animate-fade-in">
      <div className="admin-card-header mb-4">
        <div>
          <h1 className="admin-section-heading">Administrator Settings</h1>
          <p className="admin-section-sub">
            Manage your administrative credentials, notification preferences, and future system integration endpoints.
          </p>
        </div>
      </div>

      <div className="settings-grid">
        {/* Profile Card */}
        <div className="admin-card-section">
          <div className="settings-section-title">
            <User size={18} className="text-gold" />
            <h3>Administrator Profile</h3>
          </div>

          <form onSubmit={handleSaveProfile} className="settings-form">
            <div className="form-group mb-3">
              <label className="form-label">Full Name</label>
              <input 
                type="text" 
                className="form-input"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              />
            </div>

            <div className="form-group mb-3">
              <label className="form-label">Admin Email Address</label>
              <input 
                type="email" 
                className="form-input"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              />
            </div>

            <div className="form-group mb-3">
              <label className="form-label">Office Phone Number</label>
              <input 
                type="text" 
                className="form-input"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              />
            </div>

            <div className="form-group mb-4">
              <label className="form-label">Role / Clearance</label>
              <input 
                type="text" 
                className="form-input"
                value={profile.role}
                disabled
              />
            </div>

            <button type="submit" className="btn btn-gold btn-sm">
              <Save size={15} />
              <span>Save Profile Changes</span>
            </button>
          </form>
        </div>

        {/* Change Password Card */}
        <div className="admin-card-section">
          <div className="settings-section-title">
            <Lock size={18} className="text-gold" />
            <h3>Change Password</h3>
          </div>

          <form onSubmit={handleSavePassword} className="settings-form">
            <div className="form-group mb-3">
              <label className="form-label">Current Password</label>
              <input 
                type="password" 
                className="form-input"
                placeholder="••••••••"
                defaultValue="admin"
              />
            </div>

            <div className="form-group mb-3">
              <label className="form-label">New Password</label>
              <input 
                type="password" 
                className="form-input"
                placeholder="Enter new password"
              />
            </div>

            <div className="form-group mb-4">
              <label className="form-label">Confirm New Password</label>
              <input 
                type="password" 
                className="form-input"
                placeholder="Confirm new password"
              />
            </div>

            <button type="submit" className="btn btn-dark btn-sm">
              <Lock size={15} />
              <span>Update Password</span>
            </button>
          </form>
        </div>

        {/* Notification Preferences */}
        <div className="admin-card-section full-width-card">
          <div className="settings-section-title">
            <Bell size={18} className="text-gold" />
            <h3>Notification Preferences</h3>
          </div>

          <div className="notification-options-list">
            <label className="notif-option-item">
              <input 
                type="checkbox"
                checked={notifications.instantLeadEmail}
                onChange={(e) => setNotifications({ ...notifications, instantLeadEmail: e.target.checked })}
              />
              <div className="notif-text">
                <strong>Instant Lead Submission Alert</strong>
                <p>Send an instant email notification to the advisory desk whenever a visitor submits an inquiry.</p>
              </div>
            </label>

            <label className="notif-option-item">
              <input 
                type="checkbox"
                checked={notifications.dailySummary}
                onChange={(e) => setNotifications({ ...notifications, dailySummary: e.target.checked })}
              />
              <div className="notif-text">
                <strong>Daily Executive Summary Digest</strong>
                <p>Receive a daily report of total leads received, accepted status changes, and pipeline progress at 9:00 AM.</p>
              </div>
            </label>

            <label className="notif-option-item">
              <input 
                type="checkbox"
                checked={notifications.smsAlerts}
                onChange={(e) => setNotifications({ ...notifications, smsAlerts: e.target.checked })}
              />
              <div className="notif-text">
                <strong>High-Priority SMS Alert (Budget Above ₹ 7 Cr)</strong>
                <p>Receive an urgent SMS dispatch for ultra-high-ticket private client requests.</p>
              </div>
            </label>
          </div>
        </div>

        {/* Phase 2 Architecture Notice */}
        <div className="admin-card-section full-width-card database-phase-banner">
          <div className="db-banner-icon">
            <Database size={24} className="text-gold" />
          </div>
          <div>
            <h4 className="db-banner-title">Database & Supabase Integration (Phase 2)</h4>
            <p className="db-banner-desc">
              All data models (leads, properties, media assets, and authentication policies) have been architected to map 1:1 into Supabase PostgreSQL tables and Row-Level Security (RLS) policies in the upcoming phase.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .settings-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }

        @media (min-width: 860px) {
          .settings-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .full-width-card {
          grid-column: 1 / -1;
        }

        .settings-section-title {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border-subtle);
        }

        .settings-section-title h3 {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-charcoal-primary);
        }

        .notification-options-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .notif-option-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          cursor: pointer;
        }

        .notif-option-item input {
          margin-top: 4px;
          cursor: pointer;
        }

        .notif-text strong {
          display: block;
          font-size: 0.9rem;
          color: var(--text-charcoal-primary);
          margin-bottom: 2px;
        }

        .notif-text p {
          font-size: 0.82rem;
          color: var(--text-muted-warm);
        }

        .database-phase-banner {
          background: #FFFFFF;
          border: 1px solid var(--gold-border);
          display: flex;
          align-items: flex-start;
          gap: 18px;
        }

        .db-banner-icon {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-sm);
          background: var(--gold-tint-10);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .db-banner-title {
          font-family: var(--font-display);
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-charcoal-primary);
          margin-bottom: 4px;
        }

        .db-banner-desc {
          font-size: 0.85rem;
          color: var(--text-muted-warm);
          line-height: 1.5;
        }

        @media (max-width: 600px) {
          .settings-form button {
            width: 100%;
            justify-content: center;
            min-height: 44px;
          }

          .database-phase-banner {
            flex-direction: column;
            gap: 12px;
          }
        }
      `}</style>
    </div>
  );
}
