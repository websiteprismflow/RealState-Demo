import React from 'react';
import { Phone, Mail, MapPin, Compass, ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';
import { PROPERTY_TYPES } from '../data/properties';

export default function Footer({ setActiveView, setActiveCategory, onOpenInquiry, onDoubleClickLogo }) {
  const footerLogoTimerRef = React.useRef(null);
  const lastFooterTapRef = React.useRef(0);

  const handleCategoryNav = (cat) => {
    setActiveView('properties');
    setActiveCategory(cat);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewNav = (view) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const triggerAdmin = () => {
    if (footerLogoTimerRef.current) {
      clearTimeout(footerLogoTimerRef.current);
      footerLogoTimerRef.current = null;
    }
    if (onDoubleClickLogo) onDoubleClickLogo();
  };

  const handleFooterLogoClick = (e) => {
    const now = Date.now();
    const diff = now - lastFooterTapRef.current;
    if (diff > 0 && diff < 500) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      lastFooterTapRef.current = 0;
      triggerAdmin();
      return;
    }

    lastFooterTapRef.current = now;
    if (footerLogoTimerRef.current) {
      clearTimeout(footerLogoTimerRef.current);
    }
    footerLogoTimerRef.current = setTimeout(() => {
      handleViewNav('home');
      footerLogoTimerRef.current = null;
    }, 280);
  };

  const handleFooterLogoDoubleClick = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    triggerAdmin();
  };

  const handleFooterLogoTouchEnd = (e) => {
    const now = Date.now();
    const diff = now - lastFooterTapRef.current;
    if (diff > 0 && diff < 500) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      lastFooterTapRef.current = 0;
      triggerAdmin();
      return;
    }
    lastFooterTapRef.current = now;
  };

  return (
    <footer className="footer-wrapper">
      <div className="container">
        {/* Main Footer Grid */}
        <div className="footer-main-grid">
          {/* Brand Column */}
          <div className="footer-brand-col">
            <div 
              className="footer-brand" 
              onClick={handleFooterLogoClick}
              onDoubleClick={handleFooterLogoDoubleClick}
              onTouchEnd={handleFooterLogoTouchEnd}
              style={{ userSelect: 'none', WebkitUserSelect: 'none', cursor: 'pointer' }}
              title="Aurelia Luxury Estates (Double-click to open Admin Console)"
            >
              <div className="brand-icon-wrap">
                <span className="brand-monogram">A</span>
              </div>
              <div className="brand-text-wrap">
                <span className="brand-title">AURELIA</span>
                <span className="brand-tagline">ESTATES & ADVISORY</span>
              </div>
            </div>

            <p className="footer-brand-desc">
              Premier real estate advisory bridging ultra-luxury residential estates, strategic land parcels, and high-yield commercial assets across North India's foremost corridors.
            </p>

            <div className="footer-lead-cta-box">
              <span className="cta-box-title">Need direct assistance?</span>
              <button 
                type="button" 
                className="btn btn-gold btn-sm w-full"
                onClick={() => onOpenInquiry(null)}
              >
                <Compass size={15} />
                <span>Submit Lead Inquiry</span>
              </button>
            </div>
          </div>

          {/* Properties Column */}
          <div className="footer-col">
            <h4 className="footer-heading">Properties</h4>
            <ul className="footer-links-list">
              <li>
                <button onClick={() => handleCategoryNav(PROPERTY_TYPES.RESIDENCE)} className="footer-link-btn">
                  Luxury Residences
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryNav(PROPERTY_TYPES.PLOTS)} className="footer-link-btn">
                  Plotted Lands & Plots
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryNav(PROPERTY_TYPES.COMMERCIAL)} className="footer-link-btn">
                  Commercial & Offices
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryNav(null)} className="footer-link-btn">
                  Featured Portfolios
                </button>
              </li>
            </ul>
          </div>

          {/* Explore Column */}
          <div className="footer-col">
            <h4 className="footer-heading">Explore</h4>
            <ul className="footer-links-list">
              <li>
                <button onClick={() => handleViewNav('locations')} className="footer-link-btn">
                  Gurgaon & Delhi NCR
                </button>
              </li>
              <li>
                <button onClick={() => handleViewNav('locations')} className="footer-link-btn">
                  Noida & Yamuna Expressway
                </button>
              </li>
              <li>
                <button onClick={() => handleViewNav('locations')} className="footer-link-btn">
                  Chandigarh & Panipat
                </button>
              </li>
              <li>
                <button onClick={() => handleViewNav('investments')} className="footer-link-btn">
                  Pre-Leased Commercial
                </button>
              </li>
              <li>
                <button onClick={() => handleViewNav('investments')} className="footer-link-btn">
                  High-Growth Plotted Land
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="footer-col footer-contact-col">
            <h4 className="footer-heading">Advisory Offices</h4>
            
            <div className="footer-contact-item">
              <MapPin size={16} className="footer-contact-icon" />
              <div>
                <strong>Demo Advisory Suite:</strong>
                <p>Tower XYZ, Level 00, Demo Luxury Hub, Fictional Zone 000000</p>
              </div>
            </div>

            <div className="footer-contact-item">
              <MapPin size={16} className="footer-contact-icon" />
              <div>
                <strong>Demo Showcase Office:</strong>
                <p>Suite XYZ, Fictional Boulevard, Demo City 000000</p>
              </div>
            </div>

            <div className="footer-contact-item">
              <Phone size={16} className="footer-contact-icon" />
              <div>
                <span className="contact-link">+91 00000 00000 (Demo Unreal Contact)</span>
              </div>
            </div>

            <div className="footer-contact-item">
              <Mail size={16} className="footer-contact-icon" />
              <div>
                <span className="contact-link">xyz.advisory@demo-showcase.xyz</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-copyright">
            © {new Date().getFullYear()} AURELIA Estates & Advisory. All rights reserved. RERA Registered & Legal Title Verified.
          </div>

          <div className="footer-legal-links">
            <span className="legal-item">Privacy Policy</span>
            <span className="legal-sep">•</span>
            <span className="legal-item">Terms & Conditions</span>
            <span className="legal-sep">•</span>
            <span className="legal-item">RERA Disclaimers</span>
          </div>
        </div>
      </div>

      <style>{`
        .footer-wrapper {
          background-color: #141517;
          color: #FAF7F2;
          padding: 80px 0 36px;
          border-top: 1px solid var(--gold-border);
        }

        .footer-main-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          margin-bottom: 60px;
        }

        @media (min-width: 640px) {
          .footer-main-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .footer-main-grid {
            grid-template-columns: 1.5fr 1fr 1fr 1.3fr;
          }
        }

        .footer-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          margin-bottom: 18px;
        }

        .footer-brand .brand-title {
          color: #FFFFFF;
        }

        .footer-brand-desc {
          font-size: 0.88rem;
          line-height: 1.6;
          color: #A9A49C;
          margin-bottom: 24px;
        }

        .footer-lead-cta-box {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(197, 160, 89, 0.3);
          border-radius: var(--radius-sm);
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .cta-box-title {
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--gold-light);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .footer-heading {
          font-family: var(--font-display);
          font-size: 1.15rem;
          font-weight: 700;
          color: #FFFFFF;
          margin-bottom: 20px;
          letter-spacing: 0.04em;
        }

        .footer-links-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footer-link-btn {
          font-size: 0.88rem;
          color: #BDB7AC;
          text-align: left;
          transition: color var(--transition-fast), transform var(--transition-fast);
        }

        .footer-link-btn:hover {
          color: var(--gold-light);
          transform: translateX(4px);
        }

        .footer-contact-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 16px;
          font-size: 0.84rem;
          color: #BDB7AC;
          line-height: 1.5;
        }

        .footer-contact-item strong {
          display: block;
          color: #FFFFFF;
          font-size: 0.82rem;
          margin-bottom: 2px;
        }

        .footer-contact-item p {
          color: #A39E94;
          font-size: 0.82rem;
        }

        .footer-contact-icon {
          color: var(--gold-primary);
          flex-shrink: 0;
          margin-top: 3px;
        }

        .contact-link {
          color: var(--gold-light);
          transition: color var(--transition-fast);
        }

        .contact-link:hover {
          color: #FFFFFF;
        }

        .footer-bottom-bar {
          padding-top: 30px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          flex-direction: column;
          gap: 16px;
          align-items: center;
          justify-content: space-between;
          font-size: 0.78rem;
          color: #8C867B;
        }

        @media (min-width: 768px) {
          .footer-bottom-bar {
            flex-direction: row;
          }
        }

        .footer-legal-links {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .legal-item {
          cursor: pointer;
          transition: color var(--transition-fast);
        }

        .legal-item:hover {
          color: var(--gold-light);
        }

        .legal-sep {
          color: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </footer>
  );
}
