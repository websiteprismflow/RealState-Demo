import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Building, MapPin, Sparkles, Phone, Mail, User, ShieldCheck, ArrowRight, Loader2, Tag } from 'lucide-react';
import { PROPERTY_TYPES, LOCATIONS } from '../data/properties';
import { saveInquiry } from '../data/inquiries';

export default function InquiryModal({ isOpen, onClose, initialData = null }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    property_type: PROPERTY_TYPES.RESIDENCE,
    location: '',
    budget: '',
    timeline: 'Immediate (0-1 Month)',
    purpose: 'Self Use',
    requirements: '',
    property_id: null,
    property_title: null
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsSuccess(false);
      setErrors({});
      if (initialData) {
        setFormData({
          name: '',
          phone: '',
          email: '',
          property_type: initialData.type || PROPERTY_TYPES.RESIDENCE,
          location: initialData.location || '',
          budget: initialData.price || '',
          timeline: 'Immediate (0-1 Month)',
          purpose: initialData.isInvestment ? 'Investment' : 'Self Use',
          requirements: initialData.requirements || '',
          property_id: initialData.id || null,
          property_title: initialData.title || null
        });
      } else {
        setFormData({
          name: '',
          phone: '',
          email: '',
          property_type: PROPERTY_TYPES.RESIDENCE,
          location: '',
          budget: '',
          timeline: 'Immediate (0-1 Month)',
          purpose: 'Self Use',
          requirements: '',
          property_id: null,
          property_title: null
        });
      }
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Please enter your full name';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Please provide a valid phone number';
    } else if (formData.phone.replace(/\D/g, '').length < 8) {
      errs.phone = 'Phone number should have at least 8 digits';
    }
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please provide a valid email address';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Showcase Demo: No data is sent or stored
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 400);
  };

  const handleClearAttachedProperty = () => {
    setFormData(prev => ({
      ...prev,
      property_id: null,
      property_title: null
    }));
  };

  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose}>
      <div 
        className="inquiry-modal-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button 
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close Modal"
        >
          <X size={20} />
        </button>

        {isSuccess ? (
          /* SUCCESS STATE: DEMO NOTICE */
          <div className="success-state-box animate-fade-in">
            <div className="success-icon-wrap">
              <ShieldCheck size={48} className="text-gold" />
            </div>
            <div className="demo-confirmation-pill">
              <span>DEMO SHOWCASE NOTICE</span>
            </div>
            <h2 className="success-title">No Data Is Stored</h2>
            <p className="success-desc">
              This website is just for showcase and demonstration purposes. No personal details, phone numbers, or inquiry data are collected, saved, or transmitted.
            </p>

            {formData.property_title && (
              <div className="success-prop-tag">
                <span className="success-prop-lbl">Associated Property (Showcase):</span>
                <span className="success-prop-val">{formData.property_title}</span>
              </div>
            )}

            <div className="success-actions">
              <button 
                type="button" 
                className="btn btn-gold btn-lg w-full"
                onClick={onClose}
              >
                <span>Return to Showcase</span>
              </button>
            </div>
          </div>
        ) : (
          /* FORM BODY */
          <div className="form-modal-content">
            {/* Modal Header */}
            <div className="modal-header">
              <div className="eyebrow eyebrow-no-line">
                <Sparkles size={14} className="text-gold" />
                <span>Dedicated Property Advisory</span>
              </div>
              <h2 className="modal-headline">Tell Us Your Requirements</h2>
              <p className="modal-subtext">
                Complete this consultation brief to test the interactive advisory interface.
              </p>
            </div>

            {/* DEMO NOTICE BANNER DIRECTLY NEAR THE FORM */}
            <div className="demo-showcase-notice-banner">
              <ShieldCheck size={20} className="text-gold flex-shrink-0" />
              <div>
                <strong className="demo-banner-title">DEMO — SHOWCASE ONLY:</strong>
                <span className="demo-banner-text"> This website is just for showcase. No data is collected or stored from this form.</span>
              </div>
            </div>

            {/* Attached Property Pill if triggered from a specific property */}
            {formData.property_title && (
              <div className="attached-property-banner">
                <div className="attached-prop-info">
                  <span className="attached-label">Selected Property Inquiry:</span>
                  <strong className="attached-title">{formData.property_title}</strong>
                </div>
                <button 
                  type="button" 
                  className="remove-attached-btn"
                  onClick={handleClearAttachedProperty}
                  title="Remove property attachment"
                >
                  <X size={14} />
                  <span>General Inquiry</span>
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit} className="inquiry-form-grid" noValidate>
              {/* Section 1: Contact Details */}
              <div className="form-section-title">01 • Personal Information</div>

              <div className="form-row form-row-2">
                <div className="form-group">
                  <label className="form-label">
                    Full Name <span className="req-star">*</span>
                  </label>
                  <div className="input-wrap">
                    <User size={17} className="input-icon" />
                    <input 
                      type="text" 
                      className={`form-input ${errors.name ? 'input-error' : ''}`}
                      placeholder="e.g. Rohini Singhania"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  {errors.name && <span className="error-text">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Phone Number <span className="req-star">*</span>
                  </label>
                  <div className="input-wrap">
                    <Phone size={17} className="input-icon" />
                    <input 
                      type="tel" 
                      className={`form-input ${errors.phone ? 'input-error' : ''}`}
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  {errors.phone && <span className="error-text">{errors.phone}</span>}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email Address (Optional)</label>
                <div className="input-wrap">
                  <Mail size={17} className="input-icon" />
                  <input 
                    type="email" 
                    className={`form-input ${errors.email ? 'input-error' : ''}`}
                    placeholder="e.g. rohini@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>

              {/* Section 2: Property Preferences */}
              <div className="form-section-title mt-4">02 • Property Requirements</div>

              <div className="form-row form-row-3">
                <div className="form-group">
                  <label className="form-label">Property Type</label>
                  <select 
                    className="form-select"
                    value={formData.property_type}
                    onChange={(e) => setFormData({ ...formData, property_type: e.target.value })}
                  >
                    <option value={PROPERTY_TYPES.RESIDENCE}>Residence (Villas/Floors)</option>
                    <option value={PROPERTY_TYPES.PLOTS}>Plots & Land</option>
                    <option value={PROPERTY_TYPES.COMMERCIAL}>Commercial & Office</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Preferred Location</label>
                  <select 
                    className="form-select"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  >
                    <option value="">Flexible / Multiple Locations</option>
                    {LOCATIONS.map(loc => (
                      <option key={loc.id} value={loc.name}>{loc.name}, {loc.state}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Estimated Budget</label>
                  <select 
                    className="form-select"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  >
                    <option value="">Flexible Budget</option>
                    <option value="Under ₹ 1 Cr">Under ₹ 1 Cr</option>
                    <option value="₹ 1 Cr - ₹ 3 Cr">₹ 1 Cr - ₹ 3 Cr</option>
                    <option value="₹ 3 Cr - ₹ 7 Cr">₹ 3 Cr - ₹ 7 Cr</option>
                    <option value="₹ 7 Cr - ₹ 15 Cr">₹ 7 Cr - ₹ 15 Cr</option>
                    <option value="Above ₹ 15 Cr">Above ₹ 15 Cr</option>
                  </select>
                </div>
              </div>

              <div className="form-row form-row-2">
                <div className="form-group">
                  <label className="form-label">Acquisition Timeline</label>
                  <select 
                    className="form-select"
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  >
                    <option value="Immediate (0-1 Month)">Immediate (0-1 Month)</option>
                    <option value="1 - 3 Months">1 - 3 Months</option>
                    <option value="3 - 6 Months">3 - 6 Months</option>
                    <option value="Exploring Market">Currently Exploring Options</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Purpose of Purchase</label>
                  <select 
                    className="form-select"
                    value={formData.purpose}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                  >
                    <option value="Self Use">Self Use / Family Home</option>
                    <option value="Investment">Investment / Wealth Growth</option>
                    <option value="Rental Income">Commercial Rental Cash Flow</option>
                    <option value="Other">Other Custom Purpose</option>
                  </select>
                </div>
              </div>

              {/* Free-Text Requirements */}
              <div className="form-group">
                <label className="form-label">Custom Requirements & Specific Preferences</label>
                <textarea 
                  className="form-textarea"
                  rows={3}
                  placeholder="I am looking for a 3BHK in Gurgaon under ₹90 lakh, preferably in a gated community with club amenities..."
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                ></textarea>
              </div>

              {/* Trust Badge & Submit CTA */}
              <div className="form-submit-row">
                <div className="form-privacy-note">
                  <ShieldCheck size={16} className="privacy-icon" />
                  <span>100% Confidential. Zero spam. We never share your data.</span>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-gold btn-lg submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Transmitting Request...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Inquiry</span>
                      <ArrowRight size={17} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      <style>{`
        .inquiry-modal-card {
          background: var(--bg-cream-surface);
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-lg);
          width: 100%;
          max-width: 720px;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          padding: 36px 28px;
          box-shadow: 0 25px 60px rgba(18, 19, 21, 0.35);
        }

        @media (min-width: 640px) {
          .inquiry-modal-card {
            padding: 44px 40px;
          }
        }

        .modal-close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: var(--bg-cream-light);
          border: 1px solid var(--border-subtle);
          color: var(--text-charcoal-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-fast);
          z-index: 20;
        }

        .modal-close-btn:hover {
          background: var(--text-charcoal-primary);
          color: #FFFFFF;
        }

        .modal-header {
          margin-bottom: 24px;
          text-align: left;
        }

        .modal-headline {
          font-family: var(--font-display);
          font-size: 1.85rem;
          font-weight: 700;
          color: var(--text-charcoal-primary);
          margin-bottom: 8px;
        }

        .modal-subtext {
          font-size: 0.92rem;
          color: var(--text-muted-warm);
          line-height: 1.5;
        }

        .demo-showcase-notice-banner {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(197, 160, 89, 0.12);
          border: 1px solid rgba(197, 160, 89, 0.4);
          border-radius: var(--radius-sm);
          padding: 12px 16px;
          margin-bottom: 20px;
          text-align: left;
        }

        .demo-banner-title {
          font-family: var(--font-sans);
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--color-gold-dark, #8C6D23);
          letter-spacing: 0.05em;
          margin-right: 6px;
        }

        .demo-banner-text {
          font-size: 0.85rem;
          color: var(--text-charcoal-primary);
          line-height: 1.4;
        }

        .demo-confirmation-pill {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--color-gold-dark, #8C6D23);
          background: rgba(197, 160, 89, 0.15);
          padding: 4px 14px;
          border-radius: 20px;
          margin-bottom: 12px;
        }

        .attached-property-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: var(--gold-tint-10);
          border: 1px solid var(--gold-border);
          border-radius: var(--radius-sm);
          padding: 12px 16px;
          margin-bottom: 24px;
        }

        .attached-prop-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .attached-label {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--gold-dark);
        }

        .attached-title {
          font-size: 0.92rem;
          color: var(--text-charcoal-primary);
        }

        .remove-attached-btn {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.75rem;
          color: var(--text-muted-warm);
          background: rgba(255, 255, 255, 0.7);
          border: 1px solid var(--border-subtle);
          padding: 4px 10px;
          border-radius: var(--radius-xs);
          transition: all var(--transition-fast);
        }

        .remove-attached-btn:hover {
          background: #FFFFFF;
          color: var(--text-charcoal-primary);
        }

        .form-section-title {
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--gold-dark);
          margin-bottom: 12px;
        }

        .mt-4 {
          margin-top: 20px;
        }

        .form-row {
          display: grid;
          gap: 16px;
          margin-bottom: 16px;
        }

        .form-row-2 {
          grid-template-columns: 1fr;
        }

        @media (min-width: 600px) {
          .form-row-2 {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .form-row-3 {
          grid-template-columns: 1fr;
        }

        @media (min-width: 680px) {
          .form-row-3 {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-label {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-charcoal-secondary);
        }

        .req-star {
          color: #B48C42;
        }

        .input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 14px;
          color: var(--text-muted-light);
          pointer-events: none;
        }

        .form-input {
          width: 100%;
          padding: 12px 14px 12px 42px;
          font-size: 0.92rem;
          background: var(--bg-cream-light);
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-sm);
          transition: all var(--transition-fast);
          outline: none;
        }

        .form-input:focus {
          border-color: var(--gold-primary);
          background: #FFFFFF;
          box-shadow: 0 0 0 3px var(--gold-tint-20);
        }

        .form-select {
          width: 100%;
          padding: 12px 14px;
          font-size: 0.92rem;
          background: var(--bg-cream-light);
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-sm);
          outline: none;
          transition: all var(--transition-fast);
        }

        .form-select:focus {
          border-color: var(--gold-primary);
          background: #FFFFFF;
          box-shadow: 0 0 0 3px var(--gold-tint-20);
        }

        .form-textarea {
          width: 100%;
          padding: 12px 16px;
          font-size: 0.92rem;
          background: var(--bg-cream-light);
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-sm);
          outline: none;
          resize: vertical;
          transition: all var(--transition-fast);
        }

        .form-textarea:focus {
          border-color: var(--gold-primary);
          background: #FFFFFF;
          box-shadow: 0 0 0 3px var(--gold-tint-20);
        }

        .input-error {
          border-color: #C5A059;
          background: #FFFDF9;
        }

        .error-text {
          font-size: 0.75rem;
          font-weight: 600;
          color: #916E29;
        }

        .form-submit-row {
          margin-top: 24px;
          padding-top: 20px;
          border-top: 1px solid var(--border-subtle);
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        @media (min-width: 640px) {
          .form-submit-row {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
        }

        .form-privacy-note {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.76rem;
          color: var(--text-muted-warm);
        }

        .privacy-icon {
          color: var(--gold-dark);
          flex-shrink: 0;
        }

        .submit-btn {
          width: 100%;
        }

        @media (min-width: 640px) {
          .submit-btn {
            width: auto;
          }
        }

        /* Success State View */
        .success-state-box {
          padding: 30px 10px;
          text-align: center;
        }

        .success-icon-wrap {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: var(--gold-tint-10);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          border: 1px solid var(--gold-border);
        }

        .success-title {
          font-family: var(--font-display);
          font-size: 2.2rem;
          font-weight: 700;
          color: var(--text-charcoal-primary);
          margin-bottom: 12px;
        }

        .success-desc {
          font-size: 1rem;
          line-height: 1.6;
          color: var(--text-muted-warm);
          max-width: 500px;
          margin: 0 auto 28px;
        }

        .success-prop-tag {
          display: inline-flex;
          flex-direction: column;
          gap: 4px;
          background: var(--bg-cream-light);
          border: 1px solid var(--border-medium);
          padding: 10px 20px;
          border-radius: var(--radius-sm);
          margin-bottom: 28px;
        }

        .success-prop-lbl {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--gold-dark);
        }

        .success-prop-val {
          font-size: 0.92rem;
          font-weight: 600;
          color: var(--text-charcoal-primary);
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @media (max-width: 640px) {
          .inquiry-modal-card {
            padding: 24px 16px 20px;
            max-height: 94vh;
            border-radius: var(--radius-md);
          }

          .modal-close-btn {
            top: 14px;
            right: 14px;
            width: 34px;
            height: 34px;
          }

          .modal-header {
            margin-bottom: 18px;
          }

          .modal-headline {
            font-size: 1.4rem;
            line-height: 1.25;
            padding-right: 32px;
          }

          .modal-subtext {
            font-size: 0.85rem;
            line-height: 1.45;
          }

          .form-input,
          .form-select,
          .form-textarea {
            font-size: 16px;
            min-height: 44px;
          }

          .form-row {
            gap: 12px;
            margin-bottom: 12px;
          }

          .form-submit-row {
            margin-top: 18px;
            padding-top: 16px;
            gap: 14px;
          }

          .submit-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
