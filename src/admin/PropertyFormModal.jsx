import React, { useState, useEffect } from 'react';
import { 
  X, Building2, MapPin, Banknote, Maximize2, Bed, Bath, Image, Video, 
  Sparkles, Check, Trash2, Plus, AlertCircle, ShieldCheck, FileText, 
  SlidersHorizontal, Home, Trees, Landmark, Star, Compass, Layers, Calendar, ChevronRight
} from 'lucide-react';
import { LOCATIONS, PROPERTY_TYPES } from '../data/properties';

const DEFAULT_AMENITIES_OPTIONS = [
  'Swimming Pool',
  'State-of-the-art Gym',
  '24/7 3-Tier Security',
  '100% Power Backup',
  'Clubhouse & Spa',
  'Private Elevator Foyer',
  'Covered Car Parking',
  'EV Charging Station',
  'Landscaped Zen Garden',
  'Children Play Pavilion',
  'Squash & Tennis Courts',
  'Concierge & Butler Desk',
  'Private Splash Pool',
  'High-Speed Fibre Internet',
  'Multi-Cuisine Dining Lounge'
];

export default function PropertyFormModal({ isOpen, property, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: '',
    type: 'Residence',
    location: 'Gurgaon',
    subLocation: '',
    address: '',
    price: '',
    priceRaw: '',
    area: '',
    bedrooms: '',
    bathrooms: '',
    furnishing: 'Fully Furnished',
    plotSize: '',
    facing: 'North-East',
    commercialType: 'Grade-A Corporate Office',
    floor: '',
    totalFloors: '',
    parking: '2 Reserved Bays',
    status: 'Available',
    badge: 'Exclusive',
    featured: true,
    isInvestment: false,
    expectedYield: '',
    shortDescription: '',
    description: '',
    amenities: [],
    features: [],
    images: [],
    videos: [],
    developer: 'Aurelia Signature Estates',
    possession: 'Ready to Move'
  });

  const [newImageUrl, setNewImageUrl] = useState('');
  const [newVideoUrl, setNewVideoUrl] = useState('');
  const [newFeatureText, setNewFeatureText] = useState('');
  const [customAmenity, setCustomAmenity] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      setErrors({});
      if (property) {
        setFormData({
          title: property.title || '',
          type: property.type || 'Residence',
          location: property.location || 'Gurgaon',
          subLocation: property.subLocation || '',
          address: property.address || '',
          price: property.price || '',
          priceRaw: property.priceRaw || '',
          area: property.area || '',
          bedrooms: property.bedrooms || '',
          bathrooms: property.bathrooms || '',
          furnishing: property.furnishing || 'Fully Furnished',
          plotSize: property.plotSize || '',
          facing: property.facing || 'North-East',
          commercialType: property.commercialType || 'Grade-A Corporate Office',
          floor: property.floor || '',
          totalFloors: property.totalFloors || '',
          parking: property.parking || '2 Reserved Bays',
          status: property.status || 'Available',
          badge: property.badge || 'Verified',
          featured: Boolean(property.featured),
          isInvestment: Boolean(property.isInvestment),
          expectedYield: property.expectedYield || '',
          shortDescription: property.shortDescription || '',
          description: property.description || '',
          amenities: Array.isArray(property.amenities) ? [...property.amenities] : [],
          features: Array.isArray(property.features) ? [...property.features] : [],
          images: Array.isArray(property.images) ? [...property.images] : [],
          videos: Array.isArray(property.videos) ? [...property.videos] : [],
          developer: property.developer || 'Aurelia Signature Estates',
          possession: property.possession || 'Ready to Move'
        });
      } else {
        // Defaults for new listing
        setFormData({
          title: '',
          type: 'Residence',
          location: 'Gurgaon',
          subLocation: '',
          address: '',
          price: '₹ 4.50 Cr',
          priceRaw: '45000000',
          area: '3,450 sq.ft',
          bedrooms: '4 BHK Ultra Luxury Residence',
          bathrooms: '4 Bathrooms',
          furnishing: 'Fully Furnished',
          plotSize: '',
          facing: 'North-East (Vastu Prime)',
          commercialType: 'Grade-A Corporate Office',
          floor: '14th Floor',
          totalFloors: '28 Floors',
          parking: '2 Reserved Bays',
          status: 'Available',
          badge: 'Exclusive',
          featured: true,
          isInvestment: false,
          expectedYield: '6.2% Net Rental Yield',
          shortDescription: 'Spacious bespoke living with panoramic skyline views and signature club privileges.',
          description: 'A masterpiece of contemporary luxury featuring Italian marble floors, floor-to-ceiling double glazed acoustic windows, VRV climate control, and dedicated concierge services.',
          amenities: ['Swimming Pool', 'State-of-the-art Gym', '24/7 3-Tier Security', 'Clubhouse & Spa', 'Covered Car Parking'],
          features: [
            'VRV Climate Control & Air Purification System',
            'Italian Statuario Marble Flooring in Master Living',
            'Private Panoramic Balcony Deck with Garden Views'
          ],
          images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'],
          videos: [],
          developer: 'Aurelia Signature Estates',
          possession: 'Ready to Move'
        });
      }
    }
  }, [isOpen, property]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) errs.title = 'Property Title is required.';
    if (!formData.price.trim()) errs.price = 'Display Price is required (e.g. ₹ 4.50 Cr).';
    if (!formData.area.trim()) errs.area = 'Super/Plot Area is required (e.g. 3,450 sq.ft).';
    if (formData.images.length === 0) errs.images = 'At least 1 property photograph is required.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      // Scroll modal to top if errors exist
      const modal = document.querySelector('.admin-property-modal-card');
      if (modal) modal.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    onSave(formData);
  };

  const handleToggleAmenity = (amenity) => {
    setFormData(prev => {
      const exists = prev.amenities.includes(amenity);
      return {
        ...prev,
        amenities: exists 
          ? prev.amenities.filter(a => a !== amenity)
          : [...prev.amenities, amenity]
      };
    });
  };

  const handleAddCustomAmenity = () => {
    if (customAmenity.trim() && !formData.amenities.includes(customAmenity.trim())) {
      setFormData(prev => ({
        ...prev,
        amenities: [...prev.amenities, customAmenity.trim()]
      }));
      setCustomAmenity('');
    }
  };

  const handleAddFeature = () => {
    if (newFeatureText.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeatureText.trim()]
      }));
      setNewFeatureText('');
    }
  };

  const handleRemoveFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, newImageUrl.trim()]
      }));
      setNewImageUrl('');
    }
  };

  const handleRemoveImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleAddVideo = () => {
    if (newVideoUrl.trim()) {
      setFormData(prev => ({
        ...prev,
        videos: [...prev.videos, newVideoUrl.trim()]
      }));
      setNewVideoUrl('');
    }
  };

  const handleRemoveVideo = (index) => {
    setFormData(prev => ({
      ...prev,
      videos: prev.videos.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose}>
      <div 
        className="admin-property-modal-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="prop-form-modal-header">
          <div className="prop-header-top-row">
            <div className="prop-header-badge">
              <Sparkles size={13} className="text-gold" />
              <span>Aurelia Catalog Management</span>
            </div>
            <span className="prop-header-status-indicator">
              Status: <strong className={`status-pill-mini ${formData.status.toLowerCase()}`}>{formData.status}</strong>
            </span>
          </div>

          <h2 className="prop-form-title">
            {property ? 'Edit Property Dossier' : 'Curate New Luxury Property'}
          </h2>
          <p className="prop-form-sub">
            {property 
              ? `Manage portfolio listing, commercial terms, and visual presentation for "${property.title}".` 
              : 'Add an elite residential villa, prime plotted land, or high-yield commercial asset to the catalog.'}
          </p>

          {/* Asset Category Segmented Tabs */}
          <div className="prop-type-segmented-bar">
            <button 
              type="button"
              className={`prop-type-segment-btn ${formData.type === 'Residence' ? 'active' : ''}`}
              onClick={() => setFormData({ ...formData, type: 'Residence' })}
            >
              <Home size={15} />
              <span>Luxury Residence</span>
            </button>
            <button 
              type="button"
              className={`prop-type-segment-btn ${formData.type === 'Plots' ? 'active' : ''}`}
              onClick={() => setFormData({ ...formData, type: 'Plots' })}
            >
              <Trees size={15} />
              <span>Plots & Land</span>
            </button>
            <button 
              type="button"
              className={`prop-type-segment-btn ${formData.type === 'Commercial' ? 'active' : ''}`}
              onClick={() => setFormData({ ...formData, type: 'Commercial' })}
            >
              <Landmark size={15} />
              <span>Commercial & Office</span>
            </button>
          </div>
        </div>

        {/* Main Form Layout (2 Subtle Columns on PC, 1 Column on Mobile) */}
        <form onSubmit={handleSubmit} className="prop-modal-form" noValidate>
          <div className="prop-form-layout-columns">
            {/* ================= LEFT COLUMN: PRIMARY SPECS & CONTENT ================= */}
            <div className="prop-form-col-primary">
              {/* CARD 1: Core Property Identification & Location */}
              <div className="prop-section-card">
                <div className="prop-card-header">
                  <div className="prop-card-icon-wrap">
                    <Building2 size={16} />
                  </div>
                  <div>
                    <h3 className="prop-card-title">Asset Identification & Location</h3>
                    <p className="prop-card-desc">Title and geographic placement across North India's foremost corridors.</p>
                  </div>
                </div>

                <div className="prop-card-body">
                  <div className="form-group mb-3">
                    <label className="form-label">
                      Property Headline Title <span className="req-star">*</span>
                    </label>
                    <input 
                      type="text" 
                      className={`form-input ${errors.title ? 'input-error' : ''}`}
                      placeholder="e.g. The Camellias Sky Penthouse — Golf Course Road"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                    {errors.title && <span className="error-text">{errors.title}</span>}
                  </div>

                  <div className="form-row form-row-2 mb-3">
                    <div className="form-group">
                      <label className="form-label">City / Region <span className="req-star">*</span></label>
                      <select 
                        className="form-select"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      >
                        {LOCATIONS.map(loc => (
                          <option key={loc.id} value={loc.name}>{loc.name}, {loc.state}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Micro-Market / Sector</label>
                      <input 
                        type="text" 
                        className="form-input"
                        placeholder="e.g. Golf Course Road, DLF Phase 5"
                        value={formData.subLocation}
                        onChange={(e) => setFormData({ ...formData, subLocation: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Full Address / Milestone Details</label>
                    <input 
                      type="text" 
                      className="form-input"
                      placeholder="e.g. Sector 42, Near Horizon Center, Golf Course Road"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* CARD 2: Dynamic Technical Specifications (Adapts to Asset Type) */}
              <div className="prop-section-card">
                <div className="prop-card-header">
                  <div className="prop-card-icon-wrap">
                    <SlidersHorizontal size={16} />
                  </div>
                  <div>
                    <h3 className="prop-card-title">{formData.type} Specifications</h3>
                    <p className="prop-card-desc">Architectural configurations tailored to {formData.type.toLowerCase()} buyers.</p>
                  </div>
                </div>

                <div className="prop-card-body">
                  {/* RESIDENCE FIELDS */}
                  {formData.type === 'Residence' && (
                    <>
                      <div className="form-row form-row-2 mb-3">
                        <div className="form-group">
                          <label className="form-label">Bedrooms / Configuration</label>
                          <input 
                            type="text" 
                            className="form-input"
                            placeholder="e.g. 4 BHK + Servant Suite"
                            value={formData.bedrooms}
                            onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label">Bathrooms</label>
                          <input 
                            type="text" 
                            className="form-input"
                            placeholder="e.g. 5 En-Suite Bathrooms"
                            value={formData.bathrooms}
                            onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="form-row form-row-2">
                        <div className="form-group">
                          <label className="form-label">Furnishing Level</label>
                          <select 
                            className="form-select"
                            value={formData.furnishing}
                            onChange={(e) => setFormData({ ...formData, furnishing: e.target.value })}
                          >
                            <option value="Fully Furnished">Fully Furnished (Bespoke Designer)</option>
                            <option value="Semi-Furnished">Semi-Furnished (Modular Kitchen & Wardrobes)</option>
                            <option value="Bare Shell / Raw">Bare Shell / Ready for Fitouts</option>
                          </select>
                        </div>

                        <div className="form-group">
                          <label className="form-label">Parking Bays</label>
                          <input 
                            type="text" 
                            className="form-input"
                            placeholder="e.g. 2 Covered Dedicated Bays"
                            value={formData.parking}
                            onChange={(e) => setFormData({ ...formData, parking: e.target.value })}
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {/* PLOTS FIELDS */}
                  {formData.type === 'Plots' && (
                    <div className="form-row form-row-2">
                      <div className="form-group">
                        <label className="form-label">Plot Dimensions</label>
                        <input 
                          type="text" 
                          className="form-input"
                          placeholder="e.g. 300 sq.yd (35ft x 77ft)"
                          value={formData.plotSize || formData.area}
                          onChange={(e) => setFormData({ ...formData, plotSize: e.target.value })}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Orientation / Facing</label>
                        <select 
                          className="form-select"
                          value={formData.facing}
                          onChange={(e) => setFormData({ ...formData, facing: e.target.value })}
                        >
                          <option value="North-East (Vastu Prime)">North-East (Vastu Prime)</option>
                          <option value="North Facing">North Facing</option>
                          <option value="East Facing">East Facing</option>
                          <option value="Park Facing Corner">Park Facing Corner</option>
                          <option value="Boulevard Facing">Boulevard Facing</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* COMMERCIAL FIELDS */}
                  {formData.type === 'Commercial' && (
                    <>
                      <div className="form-row form-row-2 mb-3">
                        <div className="form-group">
                          <label className="form-label">Commercial Category</label>
                          <select 
                            className="form-select"
                            value={formData.commercialType}
                            onChange={(e) => setFormData({ ...formData, commercialType: e.target.value })}
                          >
                            <option value="Grade-A Corporate Office">Grade-A Corporate Office</option>
                            <option value="High-Street Retail Anchor">High-Street Retail Anchor</option>
                            <option value="Pre-Leased Institutional Asset">Pre-Leased Institutional Asset</option>
                            <option value="Commercial SCO Plot">Commercial SCO Plot</option>
                          </select>
                        </div>

                        <div className="form-group">
                          <label className="form-label">Floor / Level</label>
                          <input 
                            type="text" 
                            className="form-input"
                            placeholder="e.g. 11th Floor (Double-Height Foyer)"
                            value={formData.floor}
                            onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Projected Net Yield</label>
                        <input 
                          type="text" 
                          className="form-input"
                          placeholder="e.g. 8.5% Guaranteed Return / Pre-Leased to MNC"
                          value={formData.expectedYield}
                          onChange={(e) => setFormData({ ...formData, expectedYield: e.target.value })}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* CARD 3: Narrative Description & Highlights */}
              <div className="prop-section-card">
                <div className="prop-card-header">
                  <div className="prop-card-icon-wrap">
                    <FileText size={16} />
                  </div>
                  <div>
                    <h3 className="prop-card-title">Narrative & Editorial Highlights</h3>
                    <p className="prop-card-desc">Compelling sales copy and standout architectural attributes.</p>
                  </div>
                </div>

                <div className="prop-card-body">
                  <div className="form-group mb-3">
                    <label className="form-label">Detailed Property Story</label>
                    <textarea 
                      className="form-textarea"
                      rows={4}
                      placeholder="Describe the aesthetic design, marble finishes, floor-to-ceiling double-glazed windows, private elevator access, and views..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    ></textarea>
                  </div>

                  {/* Bullet Highlights */}
                  <div className="form-group">
                    <label className="form-label">Key Highlights / USPs</label>
                    <div className="add-bullet-row">
                      <input 
                        type="text" 
                        className="form-input"
                        placeholder="Add USP bullet point (e.g. Private Splash Pool on 22nd Floor Deck)"
                        value={newFeatureText}
                        onChange={(e) => setNewFeatureText(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddFeature(); } }}
                      />
                      <button type="button" className="btn btn-dark btn-sm" onClick={handleAddFeature}>
                        <Plus size={15} />
                        <span>Add</span>
                      </button>
                    </div>

                    {formData.features.length > 0 && (
                      <div className="features-pill-list">
                        {formData.features.map((feat, idx) => (
                          <div key={idx} className="feature-pill-tag">
                            <span>{feat}</span>
                            <button type="button" onClick={() => handleRemoveFeature(idx)} title="Remove highlight">
                              <X size={13} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* CARD 4: Amenities & Club Privileges */}
              <div className="prop-section-card">
                <div className="prop-card-header">
                  <div className="prop-card-icon-wrap">
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <h3 className="prop-card-title">Amenities & Lifestyle Inclusions</h3>
                    <p className="prop-card-desc">Select all premium amenities available to the owner or resident.</p>
                  </div>
                </div>

                <div className="prop-card-body">
                  <div className="amenities-picker-grid mb-3">
                    {DEFAULT_AMENITIES_OPTIONS.map((am) => {
                      const isSelected = formData.amenities.includes(am);
                      return (
                        <button 
                          key={am}
                          type="button" 
                          className={`amenity-toggle-chip ${isSelected ? 'selected' : ''}`}
                          onClick={() => handleToggleAmenity(am)}
                        >
                          <div className="chip-check-icon">
                            {isSelected ? <Check size={12} /> : <Plus size={12} />}
                          </div>
                          <span>{am}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Custom Amenity Adder */}
                  <div className="add-custom-amenity-row">
                    <input 
                      type="text" 
                      className="form-input"
                      placeholder="Add custom bespoke amenity..."
                      value={customAmenity}
                      onChange={(e) => setCustomAmenity(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddCustomAmenity(); } }}
                    />
                    <button type="button" className="btn btn-outline btn-sm" onClick={handleAddCustomAmenity}>
                      <Plus size={14} />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ================= RIGHT COLUMN: COMMERCIALS, STATUS & MEDIA ================= */}
            <div className="prop-form-col-sidebar">
              {/* CARD 5: Financial Valuation & Area */}
              <div className="prop-section-card">
                <div className="prop-card-header">
                  <div className="prop-card-icon-wrap">
                    <Banknote size={16} />
                  </div>
                  <div>
                    <h3 className="prop-card-title">Commercials & Valuation</h3>
                    <p className="prop-card-desc">Pricing strategy and area footprint.</p>
                  </div>
                </div>

                <div className="prop-card-body">
                  <div className="form-group mb-3">
                    <label className="form-label">Display Price <span className="req-star">*</span></label>
                    <input 
                      type="text" 
                      className={`form-input font-semibold text-gold ${errors.price ? 'input-error' : ''}`}
                      placeholder="e.g. ₹ 8.75 Cr"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    />
                    {errors.price && <span className="error-text">{errors.price}</span>}
                  </div>

                  <div className="form-group mb-3">
                    <label className="form-label">Numeric Value in ₹ (Filtering)</label>
                    <input 
                      type="number" 
                      className="form-input"
                      placeholder="e.g. 87500000"
                      value={formData.priceRaw}
                      onChange={(e) => setFormData({ ...formData, priceRaw: e.target.value })}
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label className="form-label">Super / Carpet Area <span className="req-star">*</span></label>
                    <input 
                      type="text" 
                      className={`form-input ${errors.area ? 'input-error' : ''}`}
                      placeholder="e.g. 4,800 sq.ft or 350 sq.yd"
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    />
                    {errors.area && <span className="error-text">{errors.area}</span>}
                  </div>

                  <div className="form-row form-row-2">
                    <div className="form-group">
                      <label className="form-label">Possession Status</label>
                      <input 
                        type="text" 
                        className="form-input"
                        placeholder="e.g. Ready to Move"
                        value={formData.possession}
                        onChange={(e) => setFormData({ ...formData, possession: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Developer / Master</label>
                      <input 
                        type="text" 
                        className="form-input"
                        placeholder="e.g. DLF / Aurelia"
                        value={formData.developer}
                        onChange={(e) => setFormData({ ...formData, developer: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* CARD 6: Status, Badge & VIP Spotlight */}
              <div className="prop-section-card">
                <div className="prop-card-header">
                  <div className="prop-card-icon-wrap">
                    <ShieldCheck size={16} />
                  </div>
                  <div>
                    <h3 className="prop-card-title">Status & VIP Spotlight</h3>
                    <p className="prop-card-desc">Availability lifecycle and front-facing badges.</p>
                  </div>
                </div>

                <div className="prop-card-body">
                  <div className="form-group mb-3">
                    <label className="form-label">Availability Lifecycle</label>
                    <select 
                      className={`form-select ${formData.status.toLowerCase()}`}
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    >
                      <option value="Available">Available (Active Inquiries Open)</option>
                      <option value="Reserved">Reserved (Under Token)</option>
                      <option value="Sold">Sold Out (Portfolio Archive)</option>
                      <option value="Inactive">Inactive / Hidden Draft</option>
                    </select>
                  </div>

                  <div className="form-group mb-3">
                    <label className="form-label">Highlight Tag Badge</label>
                    <input 
                      type="text" 
                      className="form-input"
                      placeholder="e.g. Pre-Leased, Golf View, Ultra Luxury"
                      value={formData.badge}
                      onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    />
                  </div>

                  {/* VIP Spotlight Card Switch */}
                  <div className={`vip-spotlight-box ${formData.featured ? 'active' : ''}`}>
                    <div className="vip-spotlight-info">
                      <div className="vip-spotlight-title-row">
                        <Star size={16} className={formData.featured ? 'text-gold fill-gold' : 'text-muted'} />
                        <strong>VIP Homepage Spotlight</strong>
                      </div>
                      <p className="vip-spotlight-desc">Pin to the curated showcase carousel on Aurelia's homepage.</p>
                    </div>

                    <label className="switch">
                      <input 
                        type="checkbox" 
                        checked={formData.featured}
                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </div>
              </div>

              {/* CARD 7: Photography & Visual Assets */}
              <div className="prop-section-card">
                <div className="prop-card-header">
                  <div className="prop-card-icon-wrap">
                    <Image size={16} />
                  </div>
                  <div>
                    <h3 className="prop-card-title">Visual Media Gallery</h3>
                    <p className="prop-card-desc">High-resolution architectural photography.</p>
                  </div>
                </div>

                <div className="prop-card-body">
                  <div className="form-group mb-3">
                    <label className="form-label">
                      Add Image URL <span className="req-star">*</span>
                    </label>
                    <div className="add-bullet-row">
                      <input 
                        type="url" 
                        className="form-input"
                        placeholder="https://images.unsplash.com/photo-..."
                        value={newImageUrl}
                        onChange={(e) => setNewImageUrl(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddImage(); } }}
                      />
                      <button type="button" className="btn btn-dark btn-sm" onClick={handleAddImage}>
                        <Plus size={15} />
                        <span>Add</span>
                      </button>
                    </div>
                    {errors.images && <span className="error-text">{errors.images}</span>}

                    {/* Images Preview Grid */}
                    {formData.images.length > 0 && (
                      <div className="images-preview-grid mt-2">
                        {formData.images.map((img, idx) => (
                          <div key={idx} className="image-preview-thumb">
                            <img src={img} alt={`Thumb ${idx + 1}`} />
                            {idx === 0 && <span className="cover-badge">Primary Cover</span>}
                            <button 
                              type="button" 
                              className="remove-img-btn"
                              onClick={() => handleRemoveImage(idx)}
                              title="Remove image"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Video URL */}
                  <div className="form-group">
                    <label className="form-label">Video Walkthrough (YouTube / MP4)</label>
                    <div className="add-bullet-row">
                      <input 
                        type="url" 
                        className="form-input"
                        placeholder="https://www.youtube.com/watch?v=..."
                        value={newVideoUrl}
                        onChange={(e) => setNewVideoUrl(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddVideo(); } }}
                      />
                      <button type="button" className="btn btn-outline btn-sm" onClick={handleAddVideo}>
                        <Video size={14} />
                        <span>Add</span>
                      </button>
                    </div>

                    {formData.videos.length > 0 && (
                      <div className="videos-list-preview mt-2">
                        {formData.videos.map((vid, idx) => (
                          <div key={idx} className="video-item-preview">
                            <Video size={14} className="text-gold flex-shrink-0" />
                            <span className="video-url-text">{vid}</span>
                            <button type="button" onClick={() => handleRemoveVideo(idx)} title="Remove video">
                              <Trash2 size={13} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================= FIXED / STICKY FOOTER ACTIONS ================= */}
          <div className="prop-modal-footer">
            <div className="prop-footer-summary">
              <span className="footer-summary-tag">{formData.type}</span>
              <span className="footer-summary-sep">•</span>
              <span className="footer-summary-loc">{formData.location}</span>
              <span className="footer-summary-sep">•</span>
              <span className="footer-summary-price text-gold font-semibold">{formData.price || 'Price TBD'}</span>
            </div>

            <div className="prop-footer-btns">
              <button type="button" className="btn btn-outline btn-md prop-cancel-btn" onClick={onClose}>
                <span>Discard Changes</span>
              </button>

              <button type="submit" className="btn btn-gold btn-md prop-submit-btn">
                <Check size={16} />
                <span>{property ? 'Save Property Dossier' : 'Publish Property Listing'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      <style>{`
        /* Modal Container */
        .admin-property-modal-card {
          background: #FDFCF7;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-lg);
          width: 100%;
          max-width: 1120px;
          max-height: 92vh;
          overflow-y: auto;
          position: relative;
          padding: 32px 30px;
          box-shadow: 0 30px 70px rgba(0, 0, 0, 0.35);
        }

        /* Header Styling */
        .prop-form-modal-header {
          margin-bottom: 24px;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--border-subtle);
        }

        .prop-header-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .prop-header-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.76rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--gold-dark);
          background: var(--gold-tint-10);
          padding: 3px 10px;
          border-radius: 9999px;
          border: 1px solid var(--gold-border);
        }

        .prop-header-status-indicator {
          font-size: 0.78rem;
          color: var(--text-muted-warm);
        }

        .status-pill-mini {
          display: inline-block;
          padding: 2px 8px;
          border-radius: 4px;
          font-weight: 700;
          font-size: 0.72rem;
          text-transform: uppercase;
        }

        .status-pill-mini.available {
          background: #E8F5E9;
          color: #2E7D32;
        }
        .status-pill-mini.reserved {
          background: #FFF3E0;
          color: #E65100;
        }
        .status-pill-mini.sold {
          background: #FFEBEE;
          color: #C62828;
        }
        .status-pill-mini.inactive {
          background: #ECEFF1;
          color: #546E7A;
        }

        .prop-form-title {
          font-family: var(--font-display);
          font-size: 1.85rem;
          font-weight: 700;
          color: var(--text-charcoal-primary);
          line-height: 1.2;
          margin-bottom: 4px;
        }

        .prop-form-sub {
          font-size: 0.88rem;
          color: var(--text-muted-warm);
          margin-bottom: 16px;
        }

        /* Segmented Category Buttons */
        .prop-type-segmented-bar {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          background: #EFECE6;
          padding: 4px;
          border-radius: 8px;
          gap: 4px;
        }

        .prop-type-segment-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 8px 14px;
          border-radius: 6px;
          border: none;
          background: transparent;
          font-size: 0.84rem;
          font-weight: 600;
          color: var(--text-charcoal-secondary);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .prop-type-segment-btn:hover {
          color: var(--text-charcoal-primary);
        }

        .prop-type-segment-btn.active {
          background: #FFFFFF;
          color: var(--gold-dark);
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
          font-weight: 700;
        }

        /* 2-Column Grid on PC */
        .prop-form-layout-columns {
          display: grid;
          grid-template-columns: 1.62fr 1fr;
          gap: 20px;
          align-items: start;
        }

        .prop-form-col-primary,
        .prop-form-col-sidebar {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        /* Subtle Section Cards */
        .prop-section-card {
          background: #FFFFFF;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(28, 25, 20, 0.03);
          transition: border-color var(--transition-fast);
        }

        .prop-section-card:hover {
          border-color: rgba(212, 175, 55, 0.35);
        }

        .prop-card-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 18px;
          background: #FAF8F4;
          border-bottom: 1px solid var(--border-subtle);
        }

        .prop-card-icon-wrap {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          background: var(--gold-tint-10);
          color: var(--gold-dark);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .prop-card-title {
          font-family: var(--font-display);
          font-size: 0.98rem;
          font-weight: 700;
          color: var(--text-charcoal-primary);
          line-height: 1.2;
        }

        .prop-card-desc {
          font-size: 0.74rem;
          color: var(--text-muted-warm);
          margin-top: 1px;
        }

        .prop-card-body {
          padding: 18px;
        }

        /* Form Controls */
        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-label {
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--text-charcoal-secondary);
          margin-bottom: 6px;
        }

        .req-star {
          color: #C62828;
          font-weight: 700;
        }

        .form-input,
        .form-select,
        .form-textarea {
          width: 100%;
          padding: 9px 12px;
          background: #FFFFFF;
          border: 1px solid var(--border-medium);
          border-radius: 6px;
          font-size: 0.88rem;
          color: var(--text-charcoal-primary);
          outline: none;
          transition: all var(--transition-fast);
          box-sizing: border-box;
        }

        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
          border-color: var(--gold-primary);
          box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.12);
        }

        .input-error {
          border-color: #C62828 !important;
          background: #FFF9F9 !important;
        }

        .error-text {
          font-size: 0.72rem;
          color: #C62828;
          margin-top: 4px;
        }

        .form-row {
          display: grid;
          gap: 14px;
        }

        .form-row-2 {
          grid-template-columns: repeat(2, 1fr);
        }

        .mb-3 { margin-bottom: 14px; }

        /* Bullet Points List */
        .add-bullet-row {
          display: flex;
          gap: 8px;
        }

        .features-pill-list {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 10px;
        }

        .feature-pill-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--bg-cream-light);
          border: 1px solid var(--border-medium);
          padding: 4px 10px;
          border-radius: var(--radius-xs);
          font-size: 0.78rem;
          color: var(--text-charcoal-primary);
        }

        .feature-pill-tag button {
          color: var(--text-muted-light);
          display: flex;
          align-items: center;
          background: transparent;
          border: none;
          cursor: pointer;
        }

        .feature-pill-tag button:hover {
          color: #C62828;
        }

        /* Amenities Grid */
        .amenities-picker-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          gap: 8px;
        }

        .amenity-toggle-chip {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 7px 10px;
          background: var(--bg-cream-light);
          border: 1px solid var(--border-subtle);
          border-radius: 6px;
          font-size: 0.78rem;
          font-weight: 500;
          color: var(--text-charcoal-secondary);
          text-align: left;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .amenity-toggle-chip:hover {
          border-color: var(--gold-primary);
        }

        .amenity-toggle-chip.selected {
          background: var(--gold-tint-10);
          border-color: var(--gold-primary);
          color: var(--gold-dark);
          font-weight: 600;
        }

        .chip-check-icon {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #FFFFFF;
          border: 1px solid var(--border-medium);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .amenity-toggle-chip.selected .chip-check-icon {
          background: var(--gold-gradient);
          color: #FFFFFF;
          border-color: transparent;
        }

        .add-custom-amenity-row {
          display: flex;
          gap: 8px;
        }

        /* VIP Spotlight Box */
        .vip-spotlight-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 14px;
          background: var(--bg-cream-light);
          border: 1px solid var(--border-medium);
          border-radius: 8px;
          transition: all var(--transition-fast);
        }

        .vip-spotlight-box.active {
          background: var(--gold-tint-10);
          border-color: var(--gold-border);
        }

        .vip-spotlight-title-row {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.84rem;
          color: var(--text-charcoal-primary);
        }

        .vip-spotlight-desc {
          font-size: 0.72rem;
          color: var(--text-muted-warm);
          margin-top: 2px;
        }

        .fill-gold {
          fill: var(--gold-primary);
        }

        /* Toggle Switch */
        .switch {
          position: relative;
          display: inline-block;
          width: 44px;
          height: 24px;
          flex-shrink: 0;
        }

        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: var(--border-medium);
          transition: .3s;
        }

        .slider:before {
          position: absolute;
          content: "";
          height: 18px;
          width: 18px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          transition: .3s;
        }

        input:checked + .slider {
          background: var(--gold-gradient);
        }

        input:checked + .slider:before {
          transform: translateX(20px);
        }

        .slider.round {
          border-radius: 34px;
        }

        .slider.round:before {
          border-radius: 50%;
        }

        /* Image Gallery */
        .images-preview-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(105px, 1fr));
          gap: 8px;
        }

        .image-preview-thumb {
          position: relative;
          height: 80px;
          border-radius: 6px;
          overflow: hidden;
          border: 1px solid var(--border-medium);
        }

        .image-preview-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .cover-badge {
          position: absolute;
          bottom: 4px;
          left: 4px;
          background: var(--gold-gradient);
          color: #FFFFFF;
          font-size: 0.62rem;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: 3px;
          letter-spacing: 0.04em;
        }

        .remove-img-btn {
          position: absolute;
          top: 4px;
          right: 4px;
          background: rgba(0, 0, 0, 0.7);
          color: #FFFFFF;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          cursor: pointer;
          transition: background var(--transition-fast);
        }

        .remove-img-btn:hover {
          background: #C62828;
        }

        /* Videos */
        .videos-list-preview {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .video-item-preview {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: var(--bg-cream-light);
          padding: 6px 10px;
          border-radius: 6px;
          font-size: 0.78rem;
          border: 1px solid var(--border-subtle);
          gap: 8px;
        }

        .video-url-text {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: var(--text-charcoal-secondary);
        }

        .video-item-preview button {
          color: var(--text-muted-light);
          background: transparent;
          border: none;
          cursor: pointer;
        }

        .video-item-preview button:hover {
          color: #C62828;
        }

        /* Modal Footer */
        .prop-modal-footer {
          margin-top: 24px;
          padding-top: 20px;
          border-top: 1px solid var(--border-subtle);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          position: sticky;
          bottom: -30px;
          background: #FDFCF7;
          z-index: 10;
          padding-bottom: 4px;
        }

        .prop-footer-summary {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.82rem;
          color: var(--text-charcoal-secondary);
        }

        .footer-summary-tag {
          font-weight: 700;
          color: var(--gold-dark);
          text-transform: uppercase;
          font-size: 0.74rem;
        }

        .footer-summary-sep {
          color: var(--border-medium);
        }

        .prop-footer-btns {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .prop-submit-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 22px;
          box-shadow: 0 4px 14px rgba(197, 160, 89, 0.35);
        }

        .prop-submit-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(197, 160, 89, 0.45);
        }

        /* ================= MOBILE & TABLET RESPONSIVE RULES ================= */
        @media (max-width: 899px) {
          .admin-property-modal-card {
            padding: 22px 14px;
            max-height: 94vh;
            width: calc(100% - 20px);
            margin: 10px auto;
            border-radius: var(--radius-md);
          }

          .prop-form-title {
            font-size: 1.35rem;
          }

          .prop-type-segmented-bar {
            grid-template-columns: 1fr;
          }

          .prop-type-segment-btn {
            padding: 10px;
            justify-content: flex-start;
          }

          .prop-form-layout-columns {
            grid-template-columns: 1fr;
            gap: 14px;
          }

          .prop-section-card {
            border-radius: 8px;
          }

          .prop-card-header {
            padding: 12px 14px;
          }

          .prop-card-body {
            padding: 14px;
          }

          .form-row-2 {
            grid-template-columns: 1fr;
            gap: 10px;
          }

          .amenities-picker-grid {
            grid-template-columns: 1fr;
          }

          .images-preview-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .add-bullet-row,
          .add-custom-amenity-row {
            flex-direction: column;
          }

          .add-bullet-row button,
          .add-custom-amenity-row button {
            width: 100%;
            justify-content: center;
            min-height: 42px;
          }

          .prop-modal-footer {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
            position: relative;
            bottom: 0;
            background: transparent;
            padding-bottom: 0;
          }

          .prop-footer-summary {
            justify-content: center;
          }

          .prop-footer-btns {
            flex-direction: column-reverse;
            width: 100%;
          }

          .prop-footer-btns button {
            width: 100%;
            justify-content: center;
            min-height: 46px;
          }

          .form-input,
          .form-select,
          .form-textarea {
            font-size: 16px !important;
          }
        }
      `}</style>
    </div>
  );
}
