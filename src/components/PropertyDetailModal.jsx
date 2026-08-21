import React, { useState } from 'react';
import { X, MapPin, Bed, Maximize2, Check, ShieldCheck, Tag, ArrowRight, Share2, Sparkles, Building2, Calendar, PhoneCall, Heart } from 'lucide-react';

export default function PropertyDetailModal({ property, isOpen, onClose, onRequestAssistance }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen || !property) return null;

  const images = property.images && property.images.length > 0 
    ? property.images 
    : ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'];

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleRequestClick = () => {
    onClose();
    onRequestAssistance(property);
  };

  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose}>
      <div 
        className="detail-modal-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button 
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close Property Modal"
        >
          <X size={20} />
        </button>

        {/* Gallery Section */}
        <div className="detail-gallery-container">
          <div className="main-image-box">
            <img 
              src={images[activeImageIndex]} 
              alt={property.title} 
              className="main-prop-img"
            />
            <div className="main-img-overlay"></div>

            <div className="gallery-badges">
              <span className="badge-gold">
                <Sparkles size={12} />
                <span>{property.badge || 'Exclusive'}</span>
              </span>
              <span className="badge-dark">{property.type}</span>
            </div>

            <div className="gallery-actions">
              <button 
                type="button" 
                className={`gallery-action-btn ${isSaved ? 'active' : ''}`}
                onClick={() => setIsSaved(!isSaved)}
                title={isSaved ? 'Saved to Favorites' : 'Save Property'}
              >
                <Heart size={16} fill={isSaved ? 'currentColor' : 'none'} />
              </button>
              <button 
                type="button" 
                className="gallery-action-btn"
                onClick={handleShare}
                title="Share Property"
              >
                <Share2 size={16} />
              </button>
            </div>
            
            {copiedLink && (
              <div className="copied-toast">Link copied to clipboard!</div>
            )}
          </div>

          {/* Thumbnails list */}
          {images.length > 1 && (
            <div className="gallery-thumbnails">
              {images.map((img, idx) => (
                <div 
                  key={idx} 
                  className={`thumbnail-item ${idx === activeImageIndex ? 'active' : ''}`}
                  onClick={() => setActiveImageIndex(idx)}
                >
                  <img src={img} alt={`View ${idx + 1}`} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Detail Content Layout */}
        <div className="detail-body-grid">
          {/* Main Info Left Column */}
          <div className="detail-left-col">
            <div className="prop-location-header">
              <MapPin size={16} className="loc-pin" />
              <span>{property.location} • {property.subLocation}</span>
            </div>

            <h1 className="detail-title">{property.title}</h1>

            <div className="detail-price-specs-bar">
              <div className="detail-price-box">
                <span className="price-label">Offered At</span>
                <span className="detail-price-num">{property.price}</span>
              </div>

              <div className="detail-specs-group">
                <div className="spec-badge">
                  <Bed size={16} />
                  <span>{property.bedrooms}</span>
                </div>
                <div className="spec-badge">
                  <Maximize2 size={16} />
                  <span>{property.area}</span>
                </div>
              </div>
            </div>

            {property.expectedYield && (
              <div className="detail-yield-banner">
                <Tag size={15} />
                <span>Investment Metric: <strong>{property.expectedYield}</strong></span>
              </div>
            )}

            {/* Description Narrative */}
            <div className="detail-section">
              <h3 className="detail-section-title">Property Overview</h3>
              <p className="detail-desc-text">{property.description}</p>
            </div>

            {/* Key Features */}
            {property.features && property.features.length > 0 && (
              <div className="detail-section">
                <h3 className="detail-section-title">Key Architectural Highlights</h3>
                <div className="features-list">
                  {property.features.map((feat, idx) => (
                    <div key={idx} className="feature-item">
                      <div className="feat-check">
                        <Check size={14} />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Amenities Grid */}
            {property.amenities && property.amenities.length > 0 && (
              <div className="detail-section">
                <h3 className="detail-section-title">Estate & Club Amenities</h3>
                <div className="amenities-grid">
                  {property.amenities.map((am, idx) => (
                    <div key={idx} className="amenity-pill">
                      <Sparkles size={13} className="amenity-icon" />
                      <span>{am}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Developer & Possession Meta */}
            <div className="meta-footer-info">
              {property.developer && (
                <div className="meta-info-item">
                  <span className="meta-lbl">Developer / Asset Manager</span>
                  <span className="meta-val">{property.developer}</span>
                </div>
              )}
              {property.possession && (
                <div className="meta-info-item">
                  <span className="meta-lbl">Possession / Status</span>
                  <span className="meta-val">{property.possession}</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Lead Generation Column (CRITICAL CONVERSION BOX) */}
          <div className="detail-right-col">
            <div className="lead-assistance-card">
              <div className="assistance-header">
                <div className="assistance-avatar-row">
                  <div className="advisor-avatar">
                    <span>A</span>
                  </div>
                  <div>
                    <h4 className="advisor-name">Aurelia Advisory Desk</h4>
                    <span className="advisor-role">Senior Property Partner</span>
                  </div>
                </div>

                <div className="assistance-prompt">
                  <h3 className="assistance-title">Interested in this property?</h3>
                  <p className="assistance-desc">
                    Tell us what you're looking for and our property expert will get in touch with you immediately with floor plans, pricing sheets, and private viewing slots.
                  </p>
                </div>

                {/* Selected Property Association Tag */}
                <div className="prop-attached-tag">
                  <span className="prop-tag-lbl">Inquiring For:</span>
                  <span className="prop-tag-title">{property.title}</span>
                  <span className="prop-tag-loc">{property.location} • {property.price}</span>
                </div>

                <button 
                  type="button" 
                  className="btn btn-gold btn-lg w-full req-assistance-btn"
                  onClick={handleRequestClick}
                >
                  <PhoneCall size={18} />
                  <span>Request Property Assistance</span>
                </button>

                <div className="assistance-security-row">
                  <ShieldCheck size={16} className="text-gold" />
                  <span>Verified Listing & Direct Developer Pricing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .detail-modal-card {
          background: var(--bg-cream-surface);
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-lg);
          width: 100%;
          max-width: 1050px;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          box-shadow: 0 25px 60px rgba(18, 19, 21, 0.4);
        }

        .detail-gallery-container {
          position: relative;
          background: #121315;
        }

        .main-image-box {
          position: relative;
          height: 380px;
          overflow: hidden;
        }

        @media (min-width: 768px) {
          .main-image-box {
            height: 460px;
          }
        }

        .main-prop-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .main-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 40%, rgba(0,0,0,0.6) 100%);
        }

        .gallery-badges {
          position: absolute;
          top: 20px;
          left: 20px;
          display: flex;
          gap: 8px;
          z-index: 5;
        }

        .gallery-actions {
          position: absolute;
          top: 20px;
          right: 70px;
          display: flex;
          gap: 8px;
          z-index: 5;
        }

        .gallery-action-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(18, 19, 21, 0.65);
          backdrop-filter: blur(8px);
          color: #FAF7F2;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all var(--transition-fast);
        }

        .gallery-action-btn:hover, .gallery-action-btn.active {
          background: var(--gold-gradient);
          color: #FFFFFF;
          border-color: transparent;
        }

        .copied-toast {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(18, 19, 21, 0.9);
          color: #FFFFFF;
          font-size: 0.8rem;
          padding: 8px 16px;
          border-radius: var(--radius-xs);
          border: 1px solid var(--gold-primary);
          z-index: 10;
        }

        .gallery-thumbnails {
          display: flex;
          gap: 10px;
          padding: 12px 20px;
          background: rgba(28, 29, 32, 0.95);
          overflow-x: auto;
        }

        .thumbnail-item {
          width: 70px;
          height: 48px;
          border-radius: var(--radius-xs);
          overflow: hidden;
          cursor: pointer;
          opacity: 0.6;
          border: 2px solid transparent;
          transition: all var(--transition-fast);
          flex-shrink: 0;
        }

        .thumbnail-item:hover, .thumbnail-item.active {
          opacity: 1;
          border-color: var(--gold-primary);
        }

        .thumbnail-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Body Grid */
        .detail-body-grid {
          padding: 36px 28px;
          display: grid;
          grid-template-columns: 1fr;
          gap: 36px;
        }

        @media (min-width: 960px) {
          .detail-body-grid {
            grid-template-columns: 1.6fr 1fr;
            padding: 44px 36px;
          }
        }

        .prop-location-header {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--gold-dark);
          margin-bottom: 8px;
        }

        .detail-title {
          font-family: var(--font-display);
          font-size: 2rem;
          font-weight: 700;
          color: var(--text-charcoal-primary);
          line-height: 1.25;
          margin-bottom: 20px;
        }

        .detail-price-specs-bar {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          background: var(--bg-cream-light);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 18px 22px;
          margin-bottom: 20px;
        }

        .price-label {
          display: block;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-muted-light);
        }

        .detail-price-num {
          font-family: var(--font-display);
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--text-charcoal-primary);
        }

        .detail-specs-group {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .spec-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          background: var(--bg-cream-surface);
          border: 1px solid var(--border-medium);
          padding: 8px 14px;
          border-radius: var(--radius-xs);
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-charcoal-primary);
        }

        .detail-yield-banner {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--gold-tint-10);
          border: 1px solid var(--gold-border);
          padding: 10px 16px;
          border-radius: var(--radius-xs);
          color: var(--gold-dark);
          font-size: 0.88rem;
          margin-bottom: 28px;
        }

        .detail-section {
          margin-bottom: 28px;
        }

        .detail-section-title {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-charcoal-primary);
          margin-bottom: 12px;
        }

        .detail-desc-text {
          font-size: 0.95rem;
          line-height: 1.7;
          color: var(--text-muted-warm);
        }

        .features-list {
          display: grid;
          grid-template-columns: 1fr;
          gap: 10px;
        }

        @media (min-width: 600px) {
          .features-list {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .feature-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 0.88rem;
          color: var(--text-charcoal-secondary);
        }

        .feat-check {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--gold-tint-20);
          color: var(--gold-dark);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .amenities-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .amenity-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--bg-cream-light);
          border: 1px solid var(--border-subtle);
          padding: 6px 12px;
          border-radius: var(--radius-xs);
          font-size: 0.82rem;
          font-weight: 500;
          color: var(--text-charcoal-secondary);
        }

        .amenity-icon {
          color: var(--gold-dark);
        }

        .meta-footer-info {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          padding-top: 20px;
          border-top: 1px solid var(--border-subtle);
        }

        .meta-lbl {
          display: block;
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--text-muted-light);
          text-transform: uppercase;
        }

        .meta-val {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--text-charcoal-primary);
        }

        /* Lead Assistance Card */
        .lead-assistance-card {
          position: sticky;
          top: 20px;
          background: var(--bg-cream-card);
          border: 2px solid var(--gold-primary);
          border-radius: var(--radius-md);
          padding: 30px 24px;
          box-shadow: var(--shadow-medium);
        }

        .assistance-avatar-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border-subtle);
        }

        .advisor-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--gold-gradient);
          color: #FFFFFF;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 1.2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow-gold);
        }

        .advisor-name {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-charcoal-primary);
        }

        .advisor-role {
          font-size: 0.78rem;
          color: var(--gold-dark);
          font-weight: 600;
        }

        .assistance-title {
          font-family: var(--font-display);
          font-size: 1.35rem;
          font-weight: 700;
          color: var(--text-charcoal-primary);
          margin-bottom: 8px;
        }

        .assistance-desc {
          font-size: 0.88rem;
          line-height: 1.55;
          color: var(--text-muted-warm);
          margin-bottom: 18px;
        }

        .prop-attached-tag {
          background: #FFFFFF;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-xs);
          padding: 12px 14px;
          display: flex;
          flex-direction: column;
          gap: 2px;
          margin-bottom: 22px;
        }

        .prop-tag-lbl {
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--gold-dark);
        }

        .prop-tag-title {
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--text-charcoal-primary);
        }

        .prop-tag-loc {
          font-size: 0.76rem;
          color: var(--text-muted-warm);
        }

        .req-assistance-btn {
          margin-bottom: 16px;
        }

        .assistance-security-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-size: 0.74rem;
          color: var(--text-muted-warm);
        }
      `}</style>
    </div>
  );
}
