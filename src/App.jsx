import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PropertyCategories from './components/PropertyCategories';
import ExploreByLocation from './components/ExploreByLocation';
import FeaturedProperties from './components/FeaturedProperties';
import WhyChooseUs from './components/WhyChooseUs';
import HowItWorks from './components/HowItWorks';
import InvestmentOpportunities from './components/InvestmentOpportunities';
import Testimonials from './components/Testimonials';
import PrimaryLeadCTA from './components/PrimaryLeadCTA';
import Footer from './components/Footer';
import InquiryModal from './components/InquiryModal';
import PropertyDetailModal from './components/PropertyDetailModal';
import PropertiesCatalog from './views/PropertiesCatalog';
import LocationsView from './views/LocationsView';
import InvestmentsView from './views/InvestmentsView';
import { PROPERTIES_DATA } from './data/properties';
import { Sparkles, MessageSquare } from 'lucide-react';

export default function App() {
  // Navigation & View State
  const [activeView, setActiveView] = useState('home'); // 'home' | 'properties' | 'locations' | 'investments'
  const [activeCategory, setActiveCategory] = useState(null); // 'Residence' | 'Plots' | 'Commercial' | null
  const [activeLocation, setActiveLocation] = useState(null); // 'Gurgaon' | 'Delhi' | null
  const [searchQuery, setSearchQuery] = useState('');

  // Modals State
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquiryInitialData, setInquiryInitialData] = useState(null);

  // Handle Search from Hero
  const handleHeroSearch = ({ location, type, budget }) => {
    setActiveLocation(location || null);
    setActiveCategory(type || null);
    setActiveView('properties');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle Property Category Selection
  const handleSelectCategory = (categoryType) => {
    setActiveCategory(categoryType);
    setActiveLocation(null);
    setActiveView('properties');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle Location Selection
  const handleSelectLocation = (locationName) => {
    if (locationName) {
      setActiveLocation(locationName);
      setActiveCategory(null);
      setActiveView('properties');
    } else {
      setActiveView('locations');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle Explore Investments
  const handleExploreInvestments = () => {
    setActiveView('investments');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle View All Properties
  const handleViewAllProperties = () => {
    setActiveCategory(null);
    setActiveLocation(null);
    setActiveView('properties');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open Lead Inquiry Modal
  const handleOpenInquiry = (initialData = null) => {
    setInquiryInitialData(initialData);
    setInquiryModalOpen(true);
  };

  // Open Property Detail Modal
  const handleSelectProperty = (property) => {
    setSelectedProperty(property);
  };

  return (
    <div className="app-layout">
      {/* Sticky Navigation */}
      <Navbar 
        activeView={activeView}
        setActiveView={setActiveView}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        onOpenInquiry={handleOpenInquiry}
      />

      {/* Main View Router */}
      <main className="main-content">
        {activeView === 'home' && (
          <div className="homepage-content">
            {/* 1. Hero */}
            <Hero 
              onSearch={handleHeroSearch}
              onOpenInquiry={handleOpenInquiry}
            />

            {/* 2. Property Categories */}
            <PropertyCategories 
              onSelectCategory={handleSelectCategory}
            />

            {/* 3. Explore by Location (ABOVE Featured Properties) */}
            <ExploreByLocation 
              onSelectLocation={handleSelectLocation}
            />

            {/* 4. Featured Properties */}
            <FeaturedProperties 
              properties={PROPERTIES_DATA}
              onSelectProperty={handleSelectProperty}
              onViewAll={handleViewAllProperties}
            />

            {/* 5. Why Choose Us */}
            <WhyChooseUs />

            {/* 6. How It Works */}
            <HowItWorks 
              onOpenInquiry={handleOpenInquiry}
            />

            {/* 7. Investment Opportunities */}
            <InvestmentOpportunities 
              onExploreInvestments={handleExploreInvestments}
              onOpenInquiry={handleOpenInquiry}
            />

            {/* 8. Testimonials */}
            <Testimonials />

            {/* 9. Primary Lead CTA */}
            <PrimaryLeadCTA 
              onOpenInquiry={handleOpenInquiry}
            />
          </div>
        )}

        {activeView === 'properties' && (
          <PropertiesCatalog 
            properties={PROPERTIES_DATA}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            activeLocation={activeLocation}
            setActiveLocation={setActiveLocation}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSelectProperty={handleSelectProperty}
            onOpenInquiry={handleOpenInquiry}
          />
        )}

        {activeView === 'locations' && (
          <LocationsView 
            onSelectLocation={handleSelectLocation}
            onOpenInquiry={handleOpenInquiry}
          />
        )}

        {activeView === 'investments' && (
          <InvestmentsView 
            onOpenInquiry={handleOpenInquiry}
          />
        )}
      </main>

      {/* 10. Footer */}
      <Footer 
        setActiveView={setActiveView}
        setActiveCategory={setActiveCategory}
        onOpenInquiry={handleOpenInquiry}
      />

      {/* Property Detail Modal */}
      <PropertyDetailModal 
        property={selectedProperty}
        isOpen={Boolean(selectedProperty)}
        onClose={() => setSelectedProperty(null)}
        onRequestAssistance={(prop) => handleOpenInquiry(prop)}
      />

      {/* Main Lead Inquiry Modal */}
      <InquiryModal 
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        initialData={inquiryInitialData}
      />

      {/* Floating Lead Action Trigger */}
      <div className="floating-lead-btn-wrap">
        <button 
          type="button" 
          className="floating-lead-btn"
          onClick={() => handleOpenInquiry(null)}
          title="Tell Us Your Requirements"
        >
          <div className="floating-icon-glow">
            <MessageSquare size={18} />
          </div>
          <span className="floating-btn-text">Tell Us What You Need</span>
        </button>
      </div>

      <style>{`
        .app-layout {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background-color: var(--bg-cream-primary);
        }

        .main-content {
          flex: 1;
        }

        .floating-lead-btn-wrap {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 90;
        }

        .floating-lead-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          background: var(--gold-gradient);
          color: #FFFFFF;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 9999px;
          padding: 12px 22px;
          font-weight: 700;
          font-size: 0.88rem;
          box-shadow: 0 10px 30px rgba(197, 160, 89, 0.45);
          transition: all var(--transition-smooth);
        }

        .floating-lead-btn:hover {
          background: var(--gold-gradient-hover);
          transform: translateY(-3px) scale(1.03);
          box-shadow: 0 14px 36px rgba(197, 160, 89, 0.6);
        }

        .floating-btn-text {
          display: none;
        }

        @media (min-width: 600px) {
          .floating-btn-text {
            display: inline;
          }
        }
      `}</style>
    </div>
  );
}
