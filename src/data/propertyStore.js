import { PROPERTIES_DATA } from './properties';

const PROPERTY_STORAGE_KEY = 'aurelia_admin_properties';

export function getStoredProperties() {
  try {
    const raw = localStorage.getItem(PROPERTY_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(PROPERTY_STORAGE_KEY, JSON.stringify(PROPERTIES_DATA));
      return PROPERTIES_DATA;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading properties from storage:', err);
    return PROPERTIES_DATA;
  }
}

export function saveNewProperty(propertyData) {
  try {
    const properties = getStoredProperties();
    const newProperty = {
      id: 'prop-' + Date.now().toString().slice(-6),
      title: propertyData.title || 'Untitled Luxury Asset',
      type: propertyData.type || 'Residence',
      categoryKey: (propertyData.type || 'residence').toLowerCase(),
      location: propertyData.location || 'Gurgaon',
      subLocation: propertyData.subLocation || propertyData.address || '',
      address: propertyData.address || '',
      price: propertyData.price || 'Price on Request',
      priceRaw: Number(propertyData.priceRaw) || 10000000,
      area: propertyData.area || '',
      bedrooms: propertyData.bedrooms || '',
      bathrooms: propertyData.bathrooms || '',
      furnishing: propertyData.furnishing || 'Fully Furnished',
      plotSize: propertyData.plotSize || '',
      facing: propertyData.facing || 'North-East',
      commercialType: propertyData.commercialType || '',
      floor: propertyData.floor || '',
      totalFloors: propertyData.totalFloors || '',
      parking: propertyData.parking || '',
      badge: propertyData.badge || (propertyData.featured ? 'Featured' : 'Verified'),
      status: propertyData.status || 'Available',
      featured: Boolean(propertyData.featured),
      isInvestment: Boolean(propertyData.isInvestment),
      expectedYield: propertyData.expectedYield || '',
      shortDescription: propertyData.shortDescription || '',
      description: propertyData.description || '',
      features: Array.isArray(propertyData.features) ? propertyData.features : [],
      amenities: Array.isArray(propertyData.amenities) ? propertyData.amenities : [],
      images: Array.isArray(propertyData.images) && propertyData.images.length > 0 
        ? propertyData.images 
        : ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'],
      videos: Array.isArray(propertyData.videos) ? propertyData.videos : [],
      developer: propertyData.developer || 'Aurelia Signature Estates',
      possession: propertyData.possession || 'Ready to Move',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const updated = [newProperty, ...properties];
    localStorage.setItem(PROPERTY_STORAGE_KEY, JSON.stringify(updated));
    return { success: true, property: newProperty, properties: updated };
  } catch (err) {
    console.error('Error saving property:', err);
    return { success: false, error: err.message };
  }
}

export function updateExistingProperty(propertyId, propertyData) {
  try {
    const properties = getStoredProperties();
    const updated = properties.map(prop => {
      if (prop.id === propertyId) {
        return {
          ...prop,
          ...propertyData,
          updated_at: new Date().toISOString()
        };
      }
      return prop;
    });
    localStorage.setItem(PROPERTY_STORAGE_KEY, JSON.stringify(updated));
    return { success: true, properties: updated };
  } catch (err) {
    console.error('Error updating property:', err);
    return { success: false, error: err.message };
  }
}

export function deleteExistingProperty(propertyId) {
  try {
    const properties = getStoredProperties();
    const updated = properties.filter(prop => prop.id !== propertyId);
    localStorage.setItem(PROPERTY_STORAGE_KEY, JSON.stringify(updated));
    return { success: true, properties: updated };
  } catch (err) {
    console.error('Error deleting property:', err);
    return { success: false, error: err.message };
  }
}
