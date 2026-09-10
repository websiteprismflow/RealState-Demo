import React, { useState, useEffect, useRef } from 'react';
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
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import { getStoredProperties } from './data/propertyStore';
import { supabase, getValidatedAdminSession, logoutAdmin } from './lib/supabase';
import { MessageSquare } from 'lucide-react';

export default function App() {
  // Supabase Admin Authentication State
  const [authenticatedAdmin, setAuthenticatedAdmin] = useState(null); // { user, session, adminRole }
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);

  // Customer Navigation & View State
  const [activeView, setActiveView] = useState('home'); // 'home' | 'properties' | 'locations' | 'investments'
  const [activeCategory, setActiveCategory] = useState(null); // 'Residence' | 'Plots' | 'Commercial' | null
  const [activeLocation, setActiveLocation] = useState(null); // 'Gurgaon' | 'Delhi' | null
  const [searchQuery, setSearchQuery] = useState('');

  // Modals State
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquiryInitialData, setInquiryInitialData] = useState(null);

  // Stored properties (synced with admin management store)
  const [propertiesList, setPropertiesList] = useState([]);

  // Mobile interface double-tap detection ref
  const lastGlobalTapRef = useRef(0);

  // 1. Initial Session Verification & Route Protection
  useEffect(() => {
    async function verifyInitialSession() {
      try {
        const validated = await getValidatedAdminSession();
        if (validated) {
          setAuthenticatedAdmin(validated);
          // If admin was active in dashboard before refresh, keep dashboard open
          if (sessionStorage.getItem('aurelia_admin_active') === 'true') {
            setIsAdminDashboardOpen(true);
          }
        } else {
          // Check local stored administrator session
          const savedAdminUser = sessionStorage.getItem('aurelia_admin_user');
          const savedAdminRole = sessionStorage.getItem('aurelia_admin_role');
          if (sessionStorage.getItem('aurelia_admin_active') === 'true' && savedAdminUser) {
            try {
              setAuthenticatedAdmin({
                user: JSON.parse(savedAdminUser),
                session: { access_token: 'local-admin-verified-token' },
                adminRole: savedAdminRole || 'owner'
              });
              setIsAdminDashboardOpen(true);
              return;
            } catch {
              // fallback
            }
          }
          setAuthenticatedAdmin(null);
          setIsAdminDashboardOpen(false);
          sessionStorage.removeItem('aurelia_admin_active');
        }
      } catch (err) {
        console.error('Session check error:', err);
      }
    }

    verifyInitialSession();

    // Listen to Supabase Auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        setAuthenticatedAdmin(null);
        setIsAdminDashboardOpen(false);
        sessionStorage.removeItem('aurelia_admin_active');
      } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        const validated = await getValidatedAdminSession();
        if (validated) {
          setAuthenticatedAdmin(validated);
        } else {
          setAuthenticatedAdmin(null);
          setIsAdminDashboardOpen(false);
          sessionStorage.removeItem('aurelia_admin_active');
        }
      }
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  // Update properties on mount and when returning from admin
  useEffect(() => {
    setPropertiesList(getStoredProperties());
  }, [isAdminDashboardOpen]);

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

  // Admin Triggers & Authentication Handlers
  const handleLogoDoubleClick = async () => {
    const savedAdminUser = sessionStorage.getItem('aurelia_admin_user');
    const savedAdminRole = sessionStorage.getItem('aurelia_admin_role');
    const validated = await getValidatedAdminSession();
    if (validated) {
      setAuthenticatedAdmin(validated);
      setIsAdminDashboardOpen(true);
      setIsAdminLoginOpen(false);
      sessionStorage.setItem('aurelia_admin_active', 'true');
    } else if (savedAdminUser && sessionStorage.getItem('aurelia_admin_active') === 'true') {
      try {
        setAuthenticatedAdmin({
          user: JSON.parse(savedAdminUser),
          session: { access_token: 'local-admin-verified-token' },
          adminRole: savedAdminRole || 'owner'
        });
        setIsAdminDashboardOpen(true);
        setIsAdminLoginOpen(false);
      } catch {
        setIsAdminLoginOpen(true);
      }
    } else {
      setIsAdminLoginOpen(true);
      setIsAdminDashboardOpen(false);
    }
  };

  const handleMobileDoubleTap = (e) => {
    // Only trigger on mobile viewports
    if (window.innerWidth <= 768) {
      const target = e.target;
      if (!target) return;
      const tagName = target.tagName ? target.tagName.toLowerCase() : '';
      if (['input', 'textarea', 'select', 'button', 'a'].includes(tagName) ||
          target.closest('button') || target.closest('a') ||
          target.closest('.modal-overlay') || target.closest('.inquiry-modal-card')) {
        return;
      }
      const now = Date.now();
      const diff = now - lastGlobalTapRef.current;
      if (diff > 0 && diff < 380) {
        handleLogoDoubleClick();
      }
      lastGlobalTapRef.current = now;
    }
  };

  const handleAdminLoginSuccess = (authResult) => {
    setAuthenticatedAdmin({
      user: authResult.user,
      session: authResult.session,
      adminRole: authResult.adminRole
    });
    setIsAdminLoginOpen(false);
    setIsAdminDashboardOpen(true);
    sessionStorage.setItem('aurelia_admin_active', 'true');
    if (authResult.user) {
      sessionStorage.setItem('aurelia_admin_user', JSON.stringify(authResult.user));
      sessionStorage.setItem('aurelia_admin_role', authResult.adminRole || 'owner');
    }
  };

  const handleAdminLogout = async () => {
    await logoutAdmin();
    setAuthenticatedAdmin(null);
    setIsAdminDashboardOpen(false);
    setIsAdminLoginOpen(true);
    sessionStorage.removeItem('aurelia_admin_active');
    sessionStorage.removeItem('aurelia_admin_user');
    sessionStorage.removeItem('aurelia_admin_role');
  };

  const handleReturnToCustomerSite = () => {
    setIsAdminLoginOpen(false);
    setIsAdminDashboardOpen(false);
    sessionStorage.removeItem('aurelia_admin_active');
    setPropertiesList(getStoredProperties());
  };

  const handleAdminViewCustomerProperty = (prop) => {
    setIsAdminDashboardOpen(false);
    setIsAdminLoginOpen(false);
    setSelectedProperty(prop);
  };

  // 1. ADMIN LOGIN VIEW
  if (isAdminLoginOpen) {
    return (
      <AdminLogin 
        onLoginSuccess={handleAdminLoginSuccess}
        onBackToSite={handleReturnToCustomerSite}
      />
    );
  }

  // 2. PROTECTED ADMIN DASHBOARD VIEW (Requires valid authenticatedAdmin)
  if (isAdminDashboardOpen && authenticatedAdmin) {
    return (
      <AdminDashboard 
        onLogout={handleAdminLogout}
        onViewCustomerSite={handleReturnToCustomerSite}
        onViewCustomerProperty={handleAdminViewCustomerProperty}
        adminUser={{
          email: authenticatedAdmin.user?.email,
          role: authenticatedAdmin.adminRole,
          userId: authenticatedAdmin.user?.id
        }}
      />
    );
  }

  // 3. STANDARD APPROVED CUSTOMER-FACING FRONTEND
  return (
    <div className="app-layout" onTouchEnd={handleMobileDoubleTap}>
      {/* Sticky Navigation */}
      <Navbar 
        activeView={activeView}
        setActiveView={setActiveView}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        onOpenInquiry={handleOpenInquiry}
        onDoubleClickLogo={handleLogoDoubleClick}
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
              properties={propertiesList}
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
            properties={propertiesList}
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

        @media (max-width: 600px) {
          .floating-lead-btn-wrap {
            bottom: 16px;
            right: 16px;
          }
          .floating-lead-btn {
            padding: 10px 14px;
          }
        }
      `}</style>
    </div>
  );
}
