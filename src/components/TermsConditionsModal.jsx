import React, { useEffect } from 'react';
import { X, FileText } from 'lucide-react';

export default function TermsConditionsModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose}>
      <div 
        className="terms-modal-card" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="terms-conditions-title"
      >
        {/* Header */}
        <div className="terms-modal-header">
          <div className="terms-header-badge">
            <FileText size={18} className="text-gold" />
            <span>Platform Agreement & Demonstration Terms</span>
          </div>
          <button 
            type="button" 
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close Terms & Conditions"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="terms-modal-body">
          <div className="terms-doc">
            <h1 id="terms-conditions-title" className="terms-title">Terms &amp; Conditions</h1>
            <p className="terms-last-updated"><strong>Last Updated: September 2026</strong></p>

            <p className="terms-intro">
              Welcome to the Prism Flow AI demonstration and portfolio website. By accessing or using this website, you agree to the following Terms &amp; Conditions.
            </p>

            <div className="terms-divider"></div>

            <section className="terms-section">
              <h2>1. Purpose of This Website</h2>
              <p>
                This website is operated by <strong>Prism Flow AI</strong> primarily for portfolio, demonstration, presentation, and prototype purposes.
              </p>
              <p>
                The website is intended to showcase website designs, interfaces, digital experiences, and potential technology solutions.
              </p>
              <p>
                It is <strong>not necessarily a production-ready commercial service</strong> unless explicitly stated otherwise.
              </p>
            </section>

            <section className="terms-section">
              <h2>2. Demonstration Content</h2>
              <p>
                Information displayed on this website may be fictional, simulated, placeholder, randomly generated, or pre-populated for demonstration purposes.
              </p>
              <p>This may include:</p>
              <ul className="terms-list">
                <li>Names</li>
                <li>Testimonials and reviews</li>
                <li>Businesses</li>
                <li>Contact numbers</li>
                <li>Products or services</li>
                <li>Statistics</li>
                <li>Prices</li>
                <li>Images</li>
                <li>Customer information</li>
                <li>Dashboard information</li>
                <li>Other website content</li>
              </ul>
              <p>
                Such information should <strong>not be interpreted as representing actual customers, transactions, partnerships, endorsements, or business relationships</strong> unless explicitly stated otherwise.
              </p>
            </section>

            <section className="terms-section">
              <h2>3. Demo Testimonials and Names</h2>
              <p>
                Any testimonials, reviews, customer names, ratings, or similar content displayed within a demonstration website are provided solely to demonstrate how the website could appear in a real-world implementation.
              </p>
              <p>
                They should not be considered genuine customer testimonials or endorsements of Prism Flow AI or any other business.
              </p>
            </section>

            <section className="terms-section">
              <h2>4. Simulated Forms</h2>
              <p>
                Any contact, lead, inquiry, signup, booking, or similar form displayed on a demonstration website may be a <strong>simulated interface</strong>.
              </p>
              <p>
                Unless explicitly stated otherwise, demonstration forms are not connected to a system intended to collect or store real submissions.
              </p>
              <div className="terms-alert-box">
                <strong>Visitors should not submit real personal, confidential, financial, authentication, or business-sensitive information through demonstration forms.</strong>
              </div>
            </section>

            <section className="terms-section">
              <h2>5. No Real Transactions</h2>
              <p>
                The website does not provide a facility for real purchases, payments, bookings, orders, or other commercial transactions unless explicitly stated otherwise.
              </p>
              <p>
                Buttons, checkout screens, dashboards, forms, payment interfaces, and other interactive elements may be simulated solely for demonstration purposes.
              </p>
              <p>
                You should not rely on such functionality to complete an actual transaction.
              </p>
            </section>

            <section className="terms-section">
              <h2>6. Accuracy of Demonstration Information</h2>
              <p>
                Because this website is a demonstration environment, information displayed on it may be incomplete, inaccurate, outdated, fictional, or intentionally simulated.
              </p>
              <p>
                Prism Flow AI does not guarantee that demonstration information represents an actual business, service, product, customer, price, result, or capability.
              </p>
            </section>

            <section className="terms-section">
              <h2>7. No Professional or Business Advice</h2>
              <p>
                Information presented through the demonstration website is provided for illustrative and informational purposes only.
              </p>
              <p>
                Nothing on the website should be considered legal, financial, medical, technical, investment, or other professional advice.
              </p>
              <p>
                Users should obtain appropriate professional advice where necessary.
              </p>
            </section>

            <section className="terms-section">
              <h2>8. Intellectual Property</h2>
              <p>
                Unless otherwise stated, the website&#39;s original design, branding, text, graphics, animations, interface concepts, code, and other materials are owned by or licensed to Prism Flow AI.
              </p>
              <p>
                You may not reproduce, copy, modify, distribute, sell, publicly display, or commercially exploit Prism Flow AI&#39;s proprietary materials without appropriate authorization.
              </p>
              <p>
                Demonstration content or third-party materials may be subject to their respective owners&#39; rights.
              </p>
            </section>

            <section className="terms-section">
              <h2>9. Prohibited Use</h2>
              <p>You agree not to:</p>
              <ul className="terms-list">
                <li>Attempt to disrupt or damage the website</li>
                <li>Attempt unauthorized access to any system</li>
                <li>Introduce malicious software or code</li>
                <li>Scrape or misuse the website&#39;s content</li>
                <li>Attempt to exploit demonstration functionality</li>
                <li>Use the website for unlawful purposes</li>
                <li>Submit confidential or sensitive information through demo features</li>
                <li>Misrepresent demonstration content as genuine information</li>
              </ul>
            </section>

            <section className="terms-section">
              <h2>10. Third-Party Services</h2>
              <p>
                The website may rely on third-party infrastructure or services, including hosting and analytics providers.
              </p>
              <p>
                Prism Flow AI is not responsible for interruptions, errors, policies, or practices that are solely attributable to third-party services.
              </p>
            </section>

            <section className="terms-section">
              <h2>11. Availability</h2>
              <p>
                We do not guarantee that the website will always be available, uninterrupted, error-free, or compatible with every device or browser.
              </p>
              <p>
                Demonstration features may be modified, disabled, replaced, or removed at any time without prior notice.
              </p>
            </section>

            <section className="terms-section">
              <h2>12. No Guarantee of Production Performance</h2>
              <p>
                A feature demonstrated on this website does not guarantee that the same feature will perform identically in a production environment.
              </p>
              <p>
                Actual client implementations may differ depending on requirements, hosting infrastructure, integrations, security requirements, third-party services, technical limitations, and other factors.
              </p>
            </section>

            <section className="terms-section">
              <h2>13. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by applicable law, Prism Flow AI shall not be responsible for losses, damages, interruptions, or consequences arising from reliance on fictional, simulated, incomplete, or demonstration information provided through this website.
              </p>
              <p>
                Users access and use the demonstration website at their own discretion.
              </p>
              <p>
                Nothing in these Terms is intended to exclude or limit liability where such exclusion or limitation is not permitted under applicable law.
              </p>
            </section>

            <section className="terms-section">
              <h2>14. External Links</h2>
              <p>The website may contain links to external websites or services.</p>
              <p>
                Such links are provided for convenience or demonstration purposes. Prism Flow AI does not control and is not responsible for the content, availability, security, or policies of external websites.
              </p>
            </section>

            <section className="terms-section">
              <h2>15. Changes to These Terms</h2>
              <p>Prism Flow AI may modify these Terms &amp; Conditions at any time.</p>
              <p>Updated Terms will be published on this page with a revised &quot;Last Updated&quot; date.</p>
              <p>
                Your continued use of the website after changes are published constitutes acceptance of the updated Terms, to the extent permitted by applicable law.
              </p>
            </section>

            <section className="terms-section">
              <h2>16. Applicable Law</h2>
              <p>
                These Terms &amp; Conditions shall be interpreted in accordance with the applicable laws of <strong>India</strong>, subject to any mandatory rights or protections available to users under applicable law.
              </p>
            </section>

            <section className="terms-section">
              <h2>17. Contact</h2>
              <p>
                This website is a demonstration and portfolio environment and does not intentionally collect personal information through its demonstration features.
              </p>
              <p>
                No specific email address or telephone number is provided in these Terms for the demonstration environment.
              </p>
            </section>

            <section className="terms-section notice-section">
              <h2>18. Entire Understanding</h2>
              <p>
                These Terms &amp; Conditions, together with the Privacy Policy applicable to the demonstration website, describe the general terms governing your use of the Prism Flow AI demonstration website.
              </p>
              <p>
                If a specific Prism Flow AI service or client project has separate contractual terms, those terms may apply to that service instead.
              </p>
            </section>

            <div className="terms-footer">
              <p><strong>© 2026 Prism Flow AI. All rights reserved.</strong></p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .terms-modal-card {
          background: #191B1F;
          border: 1px solid var(--gold-border, rgba(197, 160, 89, 0.3));
          border-radius: 16px;
          width: 95%;
          max-width: 820px;
          max-height: 88vh;
          display: flex;
          flex-direction: column;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.7);
          overflow: hidden;
          color: #FAF7F2;
          position: relative;
        }

        .terms-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 28px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          background: #141517;
        }

        .terms-header-badge {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--gold-light, #E6CA85);
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .terms-modal-body {
          padding: 32px 36px;
          overflow-y: auto;
          line-height: 1.7;
          color: #D6D1C7;
          font-size: 0.95rem;
        }

        .terms-doc {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .terms-title {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: 2.2rem;
          color: #FAF7F2;
          margin-bottom: 4px;
        }

        .terms-last-updated {
          color: var(--gold-light, #E6CA85);
          font-size: 0.9rem;
          margin-bottom: 12px;
        }

        .terms-intro {
          font-size: 1rem;
          color: #FAF7F2;
        }

        .terms-divider {
          height: 1px;
          background: linear-gradient(90deg, rgba(197, 160, 89, 0.4), rgba(255, 255, 255, 0.05));
          margin: 12px 0 20px;
        }

        .terms-section {
          margin-bottom: 16px;
        }

        .terms-section h2 {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: 1.25rem;
          color: #FAF7F2;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .terms-section p {
          margin-bottom: 10px;
          color: #C2BCB0;
        }

        .terms-section strong {
          color: #FFFFFF;
        }

        .terms-list {
          list-style-type: disc;
          padding-left: 24px;
          margin: 10px 0 14px;
          color: #C2BCB0;
        }

        .terms-list li {
          margin-bottom: 6px;
        }

        .terms-alert-box {
          background: rgba(197, 160, 89, 0.1);
          border-left: 3px solid var(--gold-primary, #C5A059);
          padding: 14px 18px;
          border-radius: 4px;
          margin: 14px 0;
          color: #FAF7F2;
          font-size: 0.92rem;
        }

        .notice-section {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(197, 160, 89, 0.2);
          border-radius: 12px;
          padding: 20px;
          margin-top: 10px;
        }

        .terms-footer {
          margin-top: 24px;
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          text-align: center;
          font-size: 0.88rem;
          color: var(--gold-light, #E6CA85);
        }

        @media (max-width: 640px) {
          .terms-modal-body {
            padding: 24px 20px;
          }
          .terms-title {
            font-size: 1.75rem;
          }
        }
      `}</style>
    </div>
  );
}
