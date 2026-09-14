import React, { useEffect } from 'react';
import { X, ShieldCheck } from 'lucide-react';

export default function PrivacyPolicyModal({ isOpen, onClose }) {
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
        className="privacy-modal-card" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="privacy-policy-title"
      >
        {/* Header */}
        <div className="privacy-modal-header">
          <div className="privacy-header-badge">
            <ShieldCheck size={18} className="text-gold" />
            <span>Legal & Demonstration Transparency</span>
          </div>
          <button 
            type="button" 
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close Privacy Policy"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="privacy-modal-body">
          <div className="privacy-doc">
            <h1 id="privacy-policy-title" className="privacy-title">Privacy Policy</h1>
            <p className="privacy-last-updated"><strong>Last Updated: September 2026</strong></p>

            <p className="privacy-intro">
              Prism Flow AI (&quot;Prism Flow AI&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates this website as a <strong>portfolio and demonstration platform</strong> showcasing website designs, digital experiences, prototypes, and other technology concepts.
            </p>

            <p className="privacy-intro">
              We respect your privacy and are committed to being transparent about how information may be handled when you visit our demonstration websites.
            </p>

            <div className="privacy-divider"></div>

            <section className="privacy-section">
              <h2>1. Nature of This Website</h2>
              <p>This website is primarily a portfolio and demonstration website.</p>
              <p>
                The content displayed on the website may include fictional, sample, placeholder, or pre-populated information created solely for demonstration purposes. Names, testimonials, businesses, contact numbers, statistics, products, reviews, and similar information displayed on a demonstration website should not be assumed to represent real customers, transactions, or endorsements unless explicitly stated otherwise.
              </p>
            </section>

            <section className="privacy-section">
              <h2>2. Personal Information</h2>
              <p>
                Prism Flow AI does <strong>not intentionally collect, request, or store personal information through the demonstration features of this website</strong>.
              </p>
              <p>
                Any lead, contact, inquiry, signup, or similar forms displayed on a demonstration website are simulated interface elements unless explicitly stated otherwise. They are not intended to function as real data-collection systems.
              </p>
              <div className="privacy-alert-box">
                <strong>Please do not enter real personal, confidential, financial, authentication, or business-sensitive information into demonstration forms.</strong>
              </div>
            </section>

            <section className="privacy-section">
              <h2>3. Information You Should Not Submit</h2>
              <p>Because this is a demonstration environment, you should not submit:</p>
              <ul className="privacy-list">
                <li>Your real phone number</li>
                <li>Your personal email address</li>
                <li>Passwords or login credentials</li>
                <li>Financial or payment information</li>
                <li>Government identification information</li>
                <li>Confidential business information</li>
                <li>Any other sensitive personal information</li>
              </ul>
              <p>Placeholder information may be used when interacting with demonstration features.</p>
            </section>

            <section className="privacy-section">
              <h2>4. Analytics and Technical Information</h2>
              <p>
                The website may use <strong>Vercel Analytics</strong> to understand general website usage and improve the performance and user experience of our demonstration websites.
              </p>
              <p>
                As a result, certain technical or usage information may be processed by the website&#39;s hosting and analytics infrastructure.
              </p>
              <p>
                Prism Flow AI does not intentionally use the demonstration website to collect personal customer information through the simulated forms described above.
              </p>
            </section>

            <section className="privacy-section">
              <h2>5. Cookies</h2>
              <p>The demonstration website does not intentionally use cookies for advertising, profiling, or personal-data collection.</p>
              <p>
                However, certain technical services or infrastructure used to operate the website may use technologies necessary for providing, securing, or measuring the service.
              </p>
            </section>

            <section className="privacy-section">
              <h2>6. Third-Party Services</h2>
              <p>
                Our demonstration websites may be hosted using third-party infrastructure, including <strong>Vercel</strong> and its associated services.
              </p>
              <p>
                These services may process limited technical information as necessary to host, secure, operate, or analyze the website.
              </p>
              <p>
                We do not intentionally submit personal information collected through a demonstration form to third-party services because the demonstration forms are not intended to collect or store real submissions.
              </p>
            </section>

            <section className="privacy-section">
              <h2>7. Demonstration Data</h2>
              <p>
                Any data that appears to be stored, displayed, or processed within a demonstration interface is generally <strong>sample, fictional, or pre-populated demonstration data</strong>.
              </p>
              <p>Such information should not be interpreted as actual customer records.</p>
            </section>

            <section className="privacy-section">
              <h2>8. Data Retention</h2>
              <p>
                Prism Flow AI does not intentionally maintain a database of personal information submitted through the demonstration website.
              </p>
              <p>
                Demonstration content may remain available as part of the portfolio or prototype until it is modified or removed.
              </p>
              <p>
                Technical or analytics information processed by hosting or analytics providers may be retained according to their respective policies and systems.
              </p>
            </section>

            <section className="privacy-section">
              <h2>9. Children&#39;s Privacy</h2>
              <p>This demonstration website is not specifically designed to collect personal information from children.</p>
              <p>
                We do not intentionally collect personal information from visitors through the demonstration features of this website.
              </p>
            </section>

            <section className="privacy-section">
              <h2>10. Security</h2>
              <p>
                We take reasonable measures to maintain the security and integrity of our demonstration websites.
              </p>
              <p>
                However, no website or internet transmission can be guaranteed to be completely secure. Visitors should therefore avoid submitting confidential or sensitive information to a demonstration website.
              </p>
            </section>

            <section className="privacy-section">
              <h2>11. External Websites</h2>
              <p>A demonstration website may contain links or references to external websites or services.</p>
              <p>
                Prism Flow AI is not responsible for the privacy practices, security, or content of external websites. Visitors should review the privacy policies of those websites before providing them with personal information.
              </p>
            </section>

            <section className="privacy-section">
              <h2>12. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time to reflect changes to our demonstration websites, technology, services, or applicable legal requirements.
              </p>
              <p>Any updated version will be posted on this page with a revised &quot;Last Updated&quot; date.</p>
            </section>

            <section className="privacy-section">
              <h2>13. Contact</h2>
              <p>This Privacy Policy is intended for the Prism Flow AI demonstration and portfolio websites.</p>
              <p>
                Because these websites are demonstration environments and are not intended to collect personal information, no specific email address or phone number is provided through this policy.
              </p>
            </section>

            <section className="privacy-section notice-section">
              <h2>14. Important Notice</h2>
              <p>
                This Privacy Policy applies to <strong>Prism Flow AI demonstration and portfolio websites that operate under the same data practices described above</strong>.
              </p>
              <p>
                If a future Prism Flow AI website or client project collects personal information, accepts payments, provides user accounts, uses chat or AI features, stores submissions, or otherwise processes personal data, this Privacy Policy may not be sufficient for that website and an appropriate privacy policy should be prepared for that specific service.
              </p>
            </section>

            <div className="privacy-footer">
              <p><strong>© 2026 Prism Flow AI. All rights reserved.</strong></p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .privacy-modal-card {
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

        .privacy-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 28px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          background: #141517;
        }

        .privacy-header-badge {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--gold-light, #E6CA85);
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .privacy-modal-body {
          padding: 32px 36px;
          overflow-y: auto;
          line-height: 1.7;
          color: #D6D1C7;
          font-size: 0.95rem;
        }

        .privacy-doc {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .privacy-title {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: 2.2rem;
          color: #FAF7F2;
          margin-bottom: 4px;
        }

        .privacy-last-updated {
          color: var(--gold-light, #E6CA85);
          font-size: 0.9rem;
          margin-bottom: 12px;
        }

        .privacy-intro {
          font-size: 1rem;
          color: #FAF7F2;
        }

        .privacy-divider {
          height: 1px;
          background: linear-gradient(90deg, rgba(197, 160, 89, 0.4), rgba(255, 255, 255, 0.05));
          margin: 12px 0 20px;
        }

        .privacy-section {
          margin-bottom: 16px;
        }

        .privacy-section h2 {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: 1.25rem;
          color: #FAF7F2;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .privacy-section p {
          margin-bottom: 10px;
          color: #C2BCB0;
        }

        .privacy-section strong {
          color: #FFFFFF;
        }

        .privacy-list {
          list-style-type: disc;
          padding-left: 24px;
          margin: 10px 0 14px;
          color: #C2BCB0;
        }

        .privacy-list li {
          margin-bottom: 6px;
        }

        .privacy-alert-box {
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

        .privacy-footer {
          margin-top: 24px;
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          text-align: center;
          font-size: 0.88rem;
          color: var(--gold-light, #E6CA85);
        }

        @media (max-width: 640px) {
          .privacy-modal-body {
            padding: 24px 20px;
          }
          .privacy-title {
            font-size: 1.75rem;
          }
        }
      `}</style>
    </div>
  );
}
