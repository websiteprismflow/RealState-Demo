import { PROPERTIES_DATA } from './properties';
import { supabase, isSupabaseConfigured, recordAuditLog } from '../lib/supabase';

const PROPERTY_STORAGE_KEY = 'aurelia_admin_properties';

/**
 * Synchronously retrieves properties from local memory/cache
 */
export function getStoredProperties() {
  try {
    const raw = localStorage.getItem(PROPERTY_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(PROPERTY_STORAGE_KEY, JSON.stringify(PROPERTIES_DATA));
      return PROPERTIES_DATA;
    }
    const parsed = JSON.parse(raw);
    // If cache has old non-XYZ addresses, reset to clean XYZ demo assets
    if (parsed.length > 0 && !parsed[0].subLocation?.includes('XYZ')) {
      localStorage.setItem(PROPERTY_STORAGE_KEY, JSON.stringify(PROPERTIES_DATA));
      return PROPERTIES_DATA;
    }
    return parsed;
  } catch (err) {
    console.error('Error reading properties from storage:', err);
    return PROPERTIES_DATA;
  }
}

/**
 * Returns demo properties catalog with fictional XYZ addresses
 */
export async function fetchLiveProperties() {
  return getStoredProperties();
}

/**
 * Saves a new property to Supabase and updates local cache
 */
export async function saveNewProperty(propertyData) {
  const newProperty = {
    id: 'prop-' + Date.now().toString().slice(-6),
    title: (propertyData.title || '').trim() || 'Untitled Luxury Asset',
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

  try {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('properties')
        .insert([newProperty])
        .select()
        .single();

      if (error) {
        console.warn('[Properties] Supabase insert warning (falling back to cache):', error.message);
      } else if (data) {
        newProperty.id = data.id || newProperty.id;
      }
    }

    await recordAuditLog({
      action: 'PROPERTY_CREATED',
      entityType: 'PROPERTY',
      entityId: newProperty.id,
      metadata: { title: newProperty.title, price: newProperty.price, location: newProperty.location },
    });

    const current = getStoredProperties();
    const updated = [newProperty, ...current];
    localStorage.setItem(PROPERTY_STORAGE_KEY, JSON.stringify(updated));

    return { success: true, property: newProperty, properties: updated };
  } catch (err) {
    console.error('Error saving property:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Updates an existing property in Supabase and local cache
 */
export async function updateExistingProperty(propertyId, propertyData) {
  try {
    const updatePayload = {
      ...propertyData,
      updated_at: new Date().toISOString()
    };

    if (isSupabaseConfigured()) {
      const { error } = await supabase
        .from('properties')
        .update(updatePayload)
        .eq('id', propertyId);

      if (error) {
        console.warn('[Properties] Supabase update warning:', error.message);
      }
    }

    await recordAuditLog({
      action: 'PROPERTY_UPDATED',
      entityType: 'PROPERTY',
      entityId: propertyId,
      metadata: updatePayload,
    });

    const current = getStoredProperties();
    const updated = current.map(prop => {
      if (prop.id === propertyId) {
        return { ...prop, ...updatePayload };
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

/**
 * Deletes a property in Supabase and local cache
 */
export async function deleteExistingProperty(propertyId) {
  try {
    if (isSupabaseConfigured()) {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', propertyId);

      if (error) {
        console.warn('[Properties] Supabase delete warning:', error.message);
      }
    }

    await recordAuditLog({
      action: 'PROPERTY_DELETED',
      entityType: 'PROPERTY',
      entityId: propertyId,
    });

    const current = getStoredProperties();
    const updated = current.filter(prop => prop.id !== propertyId);
    localStorage.setItem(PROPERTY_STORAGE_KEY, JSON.stringify(updated));

    return { success: true, properties: updated };
  } catch (err) {
    console.error('Error deleting property:', err);
    return { success: false, error: err.message };
  }
}
