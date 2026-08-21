import React from 'react';
import { Quote } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/properties';

export default function Testimonials() {
  return (
    <section className="testimonials-section" id="testimonials">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="eyebrow">Client Endorsements</div>
          <h2 className="section-title">What Our Clients Say</h2>
          <p className="section-subtitle">
            Authentic experiences from distinguished homeowners, NRIs, and institutional investors who partnered with Aurelia.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="testimonials-grid">
          {TESTIMONIALS_DATA.map((t) => (
            <div key={t.id} className="testimonial-card">
              <div className="quote-icon-wrap">
                <Quote size={20} className="quote-icon" />
              </div>

              <p className="testimonial-quote">"{t.quote}"</p>

              <div className="testimonial-footer">
                <div className="client-avatar">
                  <span>{t.name.charAt(0)}</span>
                </div>
                <div className="client-meta">
                  <h4 className="client-name">{t.name}</h4>
                  <div className="client-details">
                    <span className="client-role">{t.role}</span>
                    <span className="client-bullet">•</span>
                    <span className="client-loc">{t.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .testimonials-section {
          padding: 90px 0 95px;
          background-color: var(--bg-cream-primary);
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }

        @media (min-width: 768px) {
          .testimonials-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .testimonial-card {
          background: var(--bg-cream-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 36px 30px;
          box-shadow: var(--shadow-subtle);
          display: flex;
          flex-direction: column;
          position: relative;
          transition: all var(--transition-smooth);
        }

        .testimonial-card:hover {
          border-color: var(--border-medium);
          box-shadow: var(--shadow-medium);
          transform: translateY(-3px);
        }

        .quote-icon-wrap {
          color: var(--gold-primary);
          margin-bottom: 18px;
          opacity: 0.85;
        }

        .testimonial-quote {
          font-family: var(--font-display);
          font-size: 1.08rem;
          line-height: 1.65;
          color: var(--text-charcoal-primary);
          margin-bottom: 24px;
          font-style: italic;
        }

        .testimonial-footer {
          margin-top: auto;
          display: flex;
          align-items: center;
          gap: 14px;
          padding-top: 18px;
          border-top: 1px solid var(--border-subtle);
        }

        .client-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--gold-tint-10);
          border: 1px solid var(--gold-border);
          color: var(--gold-dark);
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .client-meta {
          display: flex;
          flex-direction: column;
        }

        .client-name {
          font-family: var(--font-sans);
          font-size: 0.98rem;
          font-weight: 700;
          color: var(--text-charcoal-primary);
          margin-bottom: 2px;
        }

        .client-details {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 6px;
          font-size: 0.78rem;
          color: var(--text-muted-warm);
        }

        .client-role {
          font-weight: 600;
          color: var(--gold-dark);
        }

        .client-bullet {
          color: var(--border-medium);
        }

        .client-loc {
          color: var(--text-muted-light);
        }
      `}</style>
    </section>
  );
}
