// Lead & Inquiry Storage Layer (Mirrors future Supabase table `inquiries`)

const STORAGE_KEY = 'aurelia_leads_inquiries';

export function getSavedInquiries() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Error reading saved inquiries:', err);
    return [];
  }
}

export function saveInquiry(inquiryData) {
  try {
    const existing = getSavedInquiries();
    const newInquiry = {
      id: 'lead-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9),
      name: inquiryData.name || '',
      phone: inquiryData.phone || '',
      email: inquiryData.email || '',
      property_type: inquiryData.property_type || 'Residence',
      location: inquiryData.location || 'Any / All Locations',
      budget: inquiryData.budget || 'Flexible',
      timeline: inquiryData.timeline || 'Immediate',
      purpose: inquiryData.purpose || 'Self Use',
      requirements: inquiryData.requirements || '',
      property_id: inquiryData.property_id || null,
      property_title: inquiryData.property_title || null,
      created_at: new Date().toISOString(),
      status: 'new'
    };

    const updated = [newInquiry, ...existing];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return { success: true, inquiry: newInquiry };
  } catch (err) {
    console.error('Error saving inquiry:', err);
    return { success: false, error: err.message };
  }
}
