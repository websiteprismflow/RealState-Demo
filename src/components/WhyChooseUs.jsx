import React from 'react';
import { ShieldCheck, UserCheck, FileCheck, Award } from 'lucide-react';

export default function WhyChooseUs() {
  const benefits = [
    {
      id: 'b-1',
      icon: ShieldCheck,
      title: 'Verified Properties',
      description: 'We help you discover genuine property opportunities with 100% legal title diligence and clear documentation.'
    },
    {
      id: 'b-2',
      icon: UserCheck,
      title: 'Trusted Guidance',
      description: 'Get tailored assistance throughout your property journey from seasoned real estate advisors.'
    },
    {
      id: 'b-3',
      icon: FileCheck,
      title: 'Transparent Process',
      description: 'Clear pricing benchmarks, zero hidden markups, and straightforward communication at every phase.'
    },
    {
      id: 'b-4',
      icon: Award,
      title: 'Expert Assistance',
      description: 'Get personalized help matched to your exact financial objectives, lifestyle preferences, and timelines.'
    }
  ];

  return (
    <section className="why-section" id="why-us">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="eyebrow">The Aurelia Advantage</div>
          <h2 className="section-title">Why Choose Us</h2>
          <p className="section-subtitle">
            An unwavering commitment to integrity, architectural excellence, and customer-first property advisory.
          </p>
        </div>

        {/* 4 Minimalist Luxury Benefit Cards */}
        <div className="benefits-grid">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div key={b.id} className="benefit-card">
                <div className="benefit-icon-wrapper">
                  <Icon size={24} className="benefit-icon" />
                </div>
                <h3 className="benefit-title">{b.title}</h3>
                <p className="benefit-desc">{b.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .why-section {
          padding: 85px 0 90px;
          background-color: var(--bg-cream-light);
          border-top: 1px solid var(--border-subtle);
          border-bottom: 1px solid var(--border-subtle);
        }

        .benefits-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }

        @media (min-width: 640px) {
          .benefits-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .benefits-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .benefit-card {
          background: var(--bg-cream-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 36px 24px;
          text-align: left;
          box-shadow: var(--shadow-subtle);
          transition: all var(--transition-smooth);
          display: flex;
          flex-direction: column;
        }

        .benefit-card:hover {
          border-color: var(--gold-primary);
          box-shadow: var(--shadow-medium);
          transform: translateY(-4px);
        }

        .benefit-icon-wrapper {
          width: 52px;
          height: 52px;
          border-radius: var(--radius-sm);
          background: var(--gold-tint-10);
          border: 1px solid var(--gold-border);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 22px;
          transition: all var(--transition-smooth);
        }

        .benefit-card:hover .benefit-icon-wrapper {
          background: var(--gold-gradient);
          box-shadow: 0 6px 18px rgba(197, 160, 89, 0.35);
        }

        .benefit-icon {
          color: var(--gold-dark);
          transition: color var(--transition-smooth);
        }

        .benefit-card:hover .benefit-icon {
          color: #FFFFFF;
        }

        .benefit-title {
          font-family: var(--font-display);
          font-size: 1.35rem;
          font-weight: 700;
          color: var(--text-charcoal-primary);
          margin-bottom: 10px;
        }

        .benefit-desc {
          font-size: 0.88rem;
          line-height: 1.6;
          color: var(--text-muted-warm);
        }
      `}</style>
    </section>
  );
}
