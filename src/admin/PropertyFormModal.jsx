import React, { useState, useEffect } from 'react';
import { X, Building, MapPin, Banknote, Maximize2, Bed, Bath, Image, Video, Sparkles, Check, Trash2, Plus, AlertCircle, ShieldCheck } from 'lucide-react';
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
    commercialType: 'Grade-A Office',
    floor: '',
    totalFloors: '',
    parking: '2 Reserved Slots',
    status: 'Available',
    featured: false,
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
          commercialType: property.commercialType || 'Grade-A Office',
          floor: property.floor || '',
          totalFloors: property.totalFloors || '',
          parking: property.parking || '2 Reserved Slots',
          status: property.status || 'Available',
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
        // Defaults for new property
        setFormData({
          title: '',
          type: 'Residence',
          location: 'Gurgaon',
          subLocation: '',
          address: '',
          price: '₹ 3.50 Cr',
          priceRaw: '35000000',
          area: '3,200 sq.ft',
          bedrooms: '4 BHK Luxury Apartment',
          bathrooms: '4 Bathrooms',
          furnishing: 'Fully Furnished',
          plotSize: '',
          facing: 'North-East',
          commercialType: 'Grade-A Office',
          floor: '12th Floor',
          totalFloors: '28 Floors',
          parking: '2 Reserved Bays',
          status: 'Available',
          featured: true,
          isInvestment: false,
          expectedYield: '5.8% Rental Yield',
          shortDescription: 'Spacious bespoke living with panoramic skyline views and signature club access.',
          description: 'A masterpiece of contemporary luxury featuring Italian marble floors, floor-to-ceiling double glazed acoustic windows, VRV climate control, and dedicated concierge services.',
          amenities: ['Swimming Pool', 'State-of-the-art Gym', '24/7 3-Tier Security', 'Clubhouse & Spa'],
          features: [
            'VRV Climate Control & Air Filtration',
            'Italian Statuario Marble Flooring',
            'Private Balcony Deck overlooking Greens'
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
    if (!formData.price.trim()) errs.price = 'Price is required (e.g. ₹ 4.25 Cr).';
    if (!formData.area.trim()) errs.area = 'Area is required (e.g. 3,500 sq.ft).';
    if (formData.images.length === 0) errs.images = 'At least 1 image is required.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
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
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="prop-form-modal-header">
          <div className="eyebrow eyebrow-no-line">
            <Sparkles size={14} className="text-gold" />
            <span>Inventory Management</span>
          </div>
          <h2 className="prop-form-title">
            {property ? 'Edit Property Listing' : 'Add New Property to Catalog'}
          </h2>
          <p className="prop-form-sub">
            {property 
              ? `Update details and media for ${property.title}` 
              : 'Add an exclusive residential estate, plot development, or commercial asset.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="prop-modal-form" noValidate>
          {/* SECTION 1: Basic Information */}
          <div className="form-section-title">01 • Basic Information</div>

          <div className="form-group mb-3">
            <label className="form-label">Property Title <span className="req-star">*</span></label>
            <input 
              type="text" 
              className={`form-input ${errors.title ? 'input-error' : ''}`}
              placeholder="e.g. The Solitaire Sky Villa — Golf Course Road"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            {errors.title && <span className="error-text">{errors.title}</span>}
          </div>

          <div className="form-row form-row-3 mb-3">
            <div className="form-group">
              <label className="form-label">Property Type</label>
              <select 
                className="form-select"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="Residence">Residence (Villa/Floor/Apartment)</option>
                <option value="Plots">Plots & Land Parcels</option>
                <option value="Commercial">Commercial & Pre-Leased Office</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Location / City</label>
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

          <div className="form-row form-row-3 mb-3">
            <div className="form-group">
              <label className="form-label">Display Price <span className="req-star">*</span></label>
              <input 
                type="text" 
                className={`form-input ${errors.price ? 'input-error' : ''}`}
                placeholder="e.g. ₹ 8.75 Cr"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
              {errors.price && <span className="error-text">{errors.price}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Numeric Price in ₹ (for sorting/filtering)</label>
              <input 
                type="number" 
                className="form-input"
                placeholder="87500000"
                value={formData.priceRaw}
                onChange={(e) => setFormData({ ...formData, priceRaw: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Super / Plot Area <span className="req-star">*</span></label>
              <input 
                type="text" 
                className={`form-input ${errors.area ? 'input-error' : ''}`}
                placeholder="e.g. 4,650 sq.ft or 250 sq.yd"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
              />
              {errors.area && <span className="error-text">{errors.area}</span>}
            </div>
          </div>

          {/* SECTION 2: Category Specific Fields */}
          <div className="form-section-title mt-4">
            02 • {formData.type} Specific Specifications
          </div>

          {formData.type === 'Residence' && (
            <div className="form-row form-row-3 mb-3">
              <div className="form-group">
                <label className="form-label">Bedrooms / BHK Config</label>
                <input 
                  type="text" 
                  className="form-input"
                  placeholder="e.g. 4 BHK + Servant + Lounge"
                  value={formData.bedrooms}
                  onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Bathrooms</label>
                <input 
                  type="text" 
                  className="form-input"
                  placeholder="e.g. 5 Bathrooms"
                  value={formData.bathrooms}
                  onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Furnishing Status</label>
                <select 
                  className="form-select"
                  value={formData.furnishing}
                  onChange={(e) => setFormData({ ...formData, furnishing: e.target.value })}
                >
                  <option value="Fully Furnished">Fully Furnished</option>
                  <option value="Semi-Furnished">Semi-Furnished</option>
                  <option value="Bare Shell / Raw">Bare Shell / Raw</option>
                </select>
              </div>
            </div>
          )}

          {formData.type === 'Plots' && (
            <div className="form-row form-row-2 mb-3">
              <div className="form-group">
                <label className="form-label">Plot Dimensions / Size</label>
                <input 
                  type="text" 
                  className="form-input"
                  placeholder="e.g. 250 sq.yd (30ft x 75ft)"
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
                  <option value="Park Facing">Park Facing Corner</option>
                </select>
              </div>
            </div>
          )}

          {formData.type === 'Commercial' && (
            <div className="form-row form-row-3 mb-3">
              <div className="form-group">
                <label className="form-label">Commercial Category</label>
                <select 
                  className="form-select"
                  value={formData.commercialType}
                  onChange={(e) => setFormData({ ...formData, commercialType: e.target.value })}
                >
                  <option value="Grade-A Corporate Office">Grade-A Corporate Office</option>
                  <option value="High-Street Retail Shop">High-Street Retail Shop</option>
                  <option value="Pre-Leased Institutional Asset">Pre-Leased Institutional Asset</option>
                  <option value="Commercial SCO Plot">Commercial SCO Plot</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Floor / Level</label>
                <input 
                  type="text" 
                  className="form-input"
                  placeholder="e.g. 8th Floor of 24"
                  value={formData.floor}
                  onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Expected Net Yield</label>
                <input 
                  type="text" 
                  className="form-input"
                  placeholder="e.g. 8.4% Guaranteed Return"
                  value={formData.expectedYield}
                  onChange={(e) => setFormData({ ...formData, expectedYield: e.target.value })}
                />
              </div>
            </div>
          )}

          {/* SECTION 3: Status & Featured Controls */}
          <div className="form-section-title mt-4">03 • Status & Visibility Controls</div>

          <div className="form-row form-row-3 mb-3">
            <div className="form-group">
              <label className="form-label">Availability Status</label>
              <select 
                className="form-select"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="Available">Available for Booking</option>
                <option value="Reserved">Under Token / Reserved</option>
                <option value="Sold">Sold Out</option>
                <option value="Inactive">Inactive / Draft</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Badge Label</label>
              <input 
                type="text" 
                className="form-input"
                placeholder="e.g. Exclusive, High Growth, Pre-Leased"
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
              />
            </div>

            <div className="form-group featured-toggle-group">
              <label className="form-label">Showcase as Featured?</label>
              <div className="toggle-switch-wrapper">
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  />
                  <span className="slider round"></span>
                </label>
                <span className="toggle-lbl">{formData.featured ? 'Featured ON' : 'Standard Listing'}</span>
              </div>
            </div>
          </div>

          {/* SECTION 4: Descriptions */}
          <div className="form-section-title mt-4">04 • Descriptions & Narrative</div>

          <div className="form-group mb-3">
            <label className="form-label">Full Narrative Description</label>
            <textarea 
              className="form-textarea"
              rows={3}
              placeholder="Describe the architectural highlights, view corridors, finishes, and investment rationale..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            ></textarea>
          </div>

          {/* Features bullet points */}
          <div className="form-group mb-3">
            <label className="form-label">Key Highlight Bullet Points</label>
            <div className="add-bullet-row">
              <input 
                type="text" 
                className="form-input"
                placeholder="Add a key feature (e.g. Triple Height 22ft Living Room Ceiling)"
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
                    <button type="button" onClick={() => handleRemoveFeature(idx)}>
                      <X size={13} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SECTION 5: Amenities Multi-Select */}
          <div className="form-section-title mt-4">05 • Amenities & Club Inclusions</div>
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
          <div className="add-custom-amenity-row mb-3">
            <input 
              type="text" 
              className="form-input"
              placeholder="Add custom amenity..."
              value={customAmenity}
              onChange={(e) => setCustomAmenity(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddCustomAmenity(); } }}
            />
            <button type="button" className="btn btn-outline btn-sm" onClick={handleAddCustomAmenity}>
              <span>+ Add Amenity</span>
            </button>
          </div>

          {/* SECTION 6: Property Media (Images & Videos) */}
          <div className="form-section-title mt-4">06 • Property Media Gallery (Images & Videos)</div>

          <div className="form-group mb-3">
            <label className="form-label">Add Image URL (High-Res Architectural Photography)</label>
            <div className="add-bullet-row">
              <input 
                type="url" 
                className="form-input"
                placeholder="https://images.unsplash.com/photo-..."
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
              />
              <button type="button" className="btn btn-dark btn-sm" onClick={handleAddImage}>
                <Image size={15} />
                <span>Add Image</span>
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

          {/* Videos URL */}
          <div className="form-group mb-4">
            <label className="form-label">Add Video Walkthrough URL (Optional YouTube / MP4)</label>
            <div className="add-bullet-row">
              <input 
                type="url" 
                className="form-input"
                placeholder="https://www.youtube.com/watch?v=..."
                value={newVideoUrl}
                onChange={(e) => setNewVideoUrl(e.target.value)}
              />
              <button type="button" className="btn btn-outline btn-sm" onClick={handleAddVideo}>
                <Video size={15} />
                <span>Add Video</span>
              </button>
            </div>

            {formData.videos.length > 0 && (
              <div className="videos-list-preview mt-2">
                {formData.videos.map((vid, idx) => (
                  <div key={idx} className="video-item-preview">
                    <Video size={14} className="text-gold" />
                    <span className="video-url-text">{vid}</span>
                    <button type="button" onClick={() => handleRemoveVideo(idx)}>
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Modal Footer Actions */}
          <div className="prop-modal-footer">
            <button type="button" className="btn btn-outline btn-sm" onClick={onClose}>
              <span>Cancel</span>
            </button>

            <button type="submit" className="btn btn-gold btn-lg">
              <span>{property ? 'Save Changes' : 'Create Property'}</span>
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .admin-property-modal-card {
          background: #FFFFFF;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-lg);
          width: 100%;
          max-width: 840px;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          padding: 36px 32px;
          box-shadow: 0 25px 60px rgba(0,0,0,0.35);
        }

        .prop-form-modal-header {
          margin-bottom: 24px;
        }

        .prop-form-title {
          font-family: var(--font-display);
          font-size: 1.85rem;
          font-weight: 700;
          color: var(--text-charcoal-primary);
          margin-bottom: 4px;
        }

        .prop-form-sub {
          font-size: 0.88rem;
          color: var(--text-muted-warm);
        }

        .mb-3 { margin-bottom: 16px; }
        .mb-4 { margin-bottom: 24px; }
        .mt-2 { margin-top: 10px; }

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
          font-size: 0.8rem;
          color: var(--text-charcoal-primary);
        }

        .feature-pill-tag button {
          color: var(--text-muted-light);
          display: flex;
          align-items: center;
        }

        .feature-pill-tag button:hover {
          color: #C62828;
        }

        .amenities-picker-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 8px;
        }

        .amenity-toggle-chip {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          background: var(--bg-cream-light);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-xs);
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--text-charcoal-secondary);
          text-align: left;
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
          width: 18px;
          height: 18px;
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
          max-width: 400px;
        }

        /* Images Preview Grid */
        .images-preview-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
          gap: 12px;
        }

        .image-preview-thumb {
          position: relative;
          height: 90px;
          border-radius: var(--radius-xs);
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
          font-size: 0.65rem;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: 3px;
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
          transition: background var(--transition-fast);
        }

        .remove-img-btn:hover {
          background: #C62828;
        }

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
          padding: 8px 12px;
          border-radius: var(--radius-xs);
          font-size: 0.8rem;
          border: 1px solid var(--border-subtle);
        }

        .video-url-text {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 80%;
          color: var(--text-charcoal-secondary);
        }

        .featured-toggle-group {
          justify-content: center;
        }

        .toggle-switch-wrapper {
          display: flex;
          align-items: center;
          gap: 10px;
          height: 44px;
        }

        .switch {
          position: relative;
          display: inline-block;
          width: 46px;
          height: 24px;
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
          transform: translateX(22px);
        }

        .slider.round {
          border-radius: 34px;
        }

        .slider.round:before {
          border-radius: 50%;
        }

        .toggle-lbl {
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-charcoal-primary);
        }

        .prop-modal-footer {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 12px;
          padding-top: 22px;
          border-top: 1px solid var(--border-subtle);
        }
      `}</style>
    </div>
  );
}
