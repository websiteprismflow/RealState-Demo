import React, { useState, useEffect, useRef } from 'react';
import { Building2, Compass, PhoneCall, Menu, X, ChevronRight, Home, Landmark, Trees, ShieldCheck, MapPin, Lock } from 'lucide-react';

export default function Navbar({ activeView, setActiveView, onOpenInquiry, activeCategory, setActiveCategory, onDoubleClickLogo }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Mobile double-tap detection on logo & header
  const lastLogoTapRef = useRef(0);
  const lastHeaderTapRef = useRef(0);

  const handleLogoTouchEnd = (e) => {
    const now = Date.now();
    const diff = now - lastLogoTapRef.current;
    if (diff > 0 && diff < 380) {
      e.preventDefault();
      if (onDoubleClickLogo) onDoubleClickLogo();
    }
    lastLogoTapRef.current = now;
  };

  const handleHeaderTouchEnd = (e) => {
    if (e.target.closest('button') || e.target.closest('a')) return;
    const now = Date.now();
    const diff = now - lastHeaderTapRef.current;
    if (diff > 0 && diff < 380) {
      if (onDoubleClickLogo) onDoubleClickLogo();
    }
    lastHeaderTapRef.current = now;
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (view, category = null) => {
    setActiveView(view);
    if (category) {
      setActiveCategory(category);
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`navbar-wrapper ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container">
        <div className="navbar-inner" onTouchEnd={handleHeaderTouchEnd}>
          {/* Brand Logo - Single click goes home, Double-click/Double-tap opens Admin Login */}
          <div 
            className="navbar-brand" 
            onClick={() => handleNavClick('home')}
            onDoubleClick={(e) => {
              e.preventDefault();
              if (onDoubleClickLogo) onDoubleClickLogo();
            }}
            onTouchEnd={handleLogoTouchEnd}
            title="Aurelia Luxury Estates (Admin: Double-click or double-tap to access console)"
          >
            <div className="brand-icon-wrap">
              <span className="brand-monogram">A</span>
            </div>
            <div className="brand-text-wrap">
              <span className="brand-title">AURELIA</span>
              <span className="brand-tagline">ESTATES & ADVISORY</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="nav-links-desktop">
            <button 
              className={`nav-link ${activeView === 'home' ? 'active' : ''}`}
              onClick={() => handleNavClick('home')}
            >
              Home
            </button>
            <button 
              className={`nav-link ${activeView === 'properties' && !activeCategory ? 'active' : ''}`}
              onClick={() => handleNavClick('properties', null)}
            >
              All Properties
            </button>
            <button 
              className={`nav-link ${activeView === 'properties' && activeCategory === 'Residence' ? 'active' : ''}`}
              onClick={() => handleNavClick('properties', 'Residence')}
            >
              Residence
            </button>
            <button 
              className={`nav-link ${activeView === 'properties' && activeCategory === 'Plots' ? 'active' : ''}`}
              onClick={() => handleNavClick('properties', 'Plots')}
            >
              Plots
            </button>
            <button 
              className={`nav-link ${activeView === 'properties' && activeCategory === 'Commercial' ? 'active' : ''}`}
              onClick={() => handleNavClick('properties', 'Commercial')}
            >
              Commercial
            </button>
            <button 
              className={`nav-link ${activeView === 'locations' ? 'active' : ''}`}
              onClick={() => handleNavClick('locations')}
            >
              Locations
            </button>
            <button 
              className={`nav-link ${activeView === 'investments' ? 'active' : ''}`}
              onClick={() => handleNavClick('investments')}
            >
              Investments
            </button>
          </nav>

          {/* Primary Action Button */}
          <div className="navbar-actions">
            <button 
              className="btn btn-gold btn-sm nav-cta-btn"
              onClick={() => onOpenInquiry(null)}
            >
              <Compass size={16} />
              <span>Find My Property</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button 
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-drawer animate-fade-in">
          <div className="mobile-drawer-links">
            <button 
              className={`mobile-nav-item ${activeView === 'home' ? 'active' : ''}`}
              onClick={() => handleNavClick('home')}
            >
              <Home size={18} />
              <span>Home</span>
            </button>
            <button 
              className={`mobile-nav-item ${activeView === 'properties' && !activeCategory ? 'active' : ''}`}
              onClick={() => handleNavClick('properties', null)}
            >
              <Building2 size={18} />
              <span>All Properties</span>
            </button>
            <button 
              className={`mobile-nav-item ${activeView === 'properties' && activeCategory === 'Residence' ? 'active' : ''}`}
              onClick={() => handleNavClick('properties', 'Residence')}
            >
              <Home size={18} />
              <span>Residential Properties</span>
            </button>
            <button 
              className={`mobile-nav-item ${activeView === 'properties' && activeCategory === 'Plots' ? 'active' : ''}`}
              onClick={() => handleNavClick('properties', 'Plots')}
            >
              <Trees size={18} />
              <span>Plotted Lands</span>
            </button>
            <button 
              className={`mobile-nav-item ${activeView === 'properties' && activeCategory === 'Commercial' ? 'active' : ''}`}
              onClick={() => handleNavClick('properties', 'Commercial')}
            >
              <Landmark size={18} />
              <span>Commercial & Office</span>
            </button>
            <button 
              className={`mobile-nav-item ${activeView === 'locations' ? 'active' : ''}`}
              onClick={() => handleNavClick('locations')}
            >
              <MapPin size={18} />
              <span>Explore Locations</span>
            </button>
            <button 
              className={`mobile-nav-item ${activeView === 'investments' ? 'active' : ''}`}
              onClick={() => handleNavClick('investments')}
            >
              <ShieldCheck size={18} />
              <span>Investment Opportunities</span>
            </button>

            <div className="mobile-drawer-cta">
              <button 
                className="btn btn-gold btn-lg w-full"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenInquiry(null);
                }}
              >
                <span>Find My Property →</span>
              </button>

              <button 
                type="button" 
                className="mobile-drawer-admin-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onDoubleClickLogo) onDoubleClickLogo();
                }}
              >
                <Lock size={14} className="text-gold" />
                <span>Admin Sign In Console (Double-Tap)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .navbar-wrapper {
          position: sticky;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          background: rgba(250, 247, 242, 0.88);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border-subtle);
          transition: all var(--transition-smooth);
        }

        .navbar-scrolled {
          background: rgba(250, 247, 242, 0.96);
          box-shadow: 0 4px 20px rgba(28, 25, 20, 0.06);
          border-bottom: 1px solid var(--border-medium);
        }

        .navbar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 80px;
          transition: height var(--transition-smooth);
        }

        .navbar-scrolled .navbar-inner {
          height: 68px;
        }

        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          user-select: none;
        }

        .brand-icon-wrap {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background: var(--gold-gradient);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow-gold);
        }

        .brand-monogram {
          font-family: var(--font-display);
          font-size: 1.4rem;
          font-weight: 700;
          color: #FFFFFF;
        }

        .brand-text-wrap {
          display: flex;
          flex-direction: column;
        }

        .brand-title {
          font-family: var(--font-display);
          font-size: 1.35rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          color: var(--text-charcoal-primary);
          line-height: 1.1;
        }

        .brand-tagline {
          font-size: 0.625rem;
          letter-spacing: 0.22em;
          font-weight: 600;
          color: var(--gold-dark);
          text-transform: uppercase;
        }

        .nav-links-desktop {
          display: none;
          align-items: center;
          gap: 28px;
        }

        @media (min-width: 992px) {
          .nav-links-desktop {
            display: flex;
          }
        }

        .nav-link {
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-charcoal-secondary);
          position: relative;
          padding: 8px 0;
          transition: color var(--transition-fast);
        }

        .nav-link:hover {
          color: var(--gold-dark);
        }

        .nav-link.active {
          color: var(--gold-dark);
          font-weight: 600;
        }

        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: var(--gold-gradient);
          border-radius: 2px;
        }

        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .nav-cta-btn {
          display: none;
        }

        @media (min-width: 640px) {
          .nav-cta-btn {
            display: inline-flex;
          }
        }

        .mobile-menu-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px;
          color: var(--text-charcoal-primary);
          border-radius: var(--radius-xs);
          border: 1px solid var(--border-subtle);
          background: var(--bg-cream-surface);
        }

        @media (min-width: 992px) {
          .mobile-menu-toggle {
            display: none;
          }
        }

        .mobile-drawer {
          background: var(--bg-cream-light);
          border-bottom: 1px solid var(--border-medium);
          padding: 20px 24px 28px;
          box-shadow: var(--shadow-medium);
        }

        .mobile-drawer-links {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .mobile-nav-item {
          display: flex;
          align-items: center;
          gap: 14px;
          width: 100%;
          text-align: left;
          padding: 12px 16px;
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--text-charcoal-primary);
          border-radius: var(--radius-sm);
          transition: background var(--transition-fast);
        }

        .mobile-nav-item.active {
          background: var(--gold-tint-10);
          color: var(--gold-dark);
          font-weight: 600;
        }

        .mobile-drawer-cta {
          margin-top: 18px;
          padding-top: 16px;
          border-top: 1px solid var(--border-subtle);
        }

        .mobile-drawer-admin-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          margin-top: 10px;
          padding: 10px 14px;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-muted-warm);
          background: rgba(255, 255, 255, 0.7);
          border: 1px dashed rgba(197, 160, 89, 0.4);
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .mobile-drawer-admin-btn:hover {
          background: #FFFFFF;
          color: var(--text-charcoal-primary);
          border-style: solid;
        }

        .w-full {
          width: 100%;
        }
      `}</style>
    </header>
  );
}
