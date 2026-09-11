import { supabase, isSupabaseConfigured, recordAuditLog } from '../lib/supabase';

const STORAGE_KEY = 'aurelia_leads_inquiries';

const INITIAL_MOCK_LEADS = [
  {
    id: 'lead-1001',
    name: 'Client XYZ — Showcase Profile',
    phone: '+91 00000 11111',
    email: 'xyz.client1@demo-showcase.xyz',
    property_type: 'Residence',
    location: 'XYZ Demo Zone',
    budget: '₹ 7 Cr - ₹ 15 Cr',
    timeline: 'Immediate (Demo Showcase)',
    purpose: 'Self Use',
    requirements: 'Fictional demo inquiry: looking for a sample luxury residence in XYZ Fictional Sector.',
    property_id: 'prop-101',
    property_title: 'The Solitaire Sky Villa — XYZ Demo Boulevard',
    created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
    status: 'Pending'
  },
  {
    id: 'lead-1002',
    name: 'XYZ Enterprise (Demo Entity)',
    phone: '+91 00000 22222',
    email: 'xyz.corporate@demo-showcase.xyz',
    property_type: 'Commercial',
    location: 'XYZ Cyber Hub',
    budget: 'Above ₹ 15 Cr',
    timeline: '1 - 3 Months',
    purpose: 'Investment',
    requirements: 'Fictional demo inquiry: seeking corporate commercial suite in XYZ Fictional Business Hub.',
    property_id: 'prop-103',
    property_title: 'The Capital Apex — XYZ Corporate Suites',
    created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
    status: 'Accepted'
  },
  {
    id: 'lead-1003',
    name: 'Demo Buyer XYZ',
    phone: '+91 00000 33333',
    email: 'xyz.buyer@demo-showcase.xyz',
    property_type: 'Plots',
    location: 'XYZ Plotted Corridor',
    budget: 'Under ₹ 1 Cr',
    timeline: '3 - 6 Months',
    purpose: 'Investment',
    requirements: 'Fictional demo inquiry: interested in sample plotted land along XYZ Highway Corridor.',
    property_id: 'prop-105',
    property_title: 'The Horizon Plotted Boulevard — XYZ Highway',
    created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
    status: 'Pending'
  },
  {
    id: 'lead-1004',
    name: 'XYZ Investor Sample',
    phone: '+91 00000 44444',
    email: 'xyz.investor@demo-showcase.xyz',
    property_type: 'Residence',
    location: 'XYZ Diplomatic Zone',
    budget: 'Above ₹ 15 Cr',
    timeline: 'Immediate (Demo Showcase)',
    purpose: 'Self Use',
    requirements: 'Fictional demo inquiry: sample independent floor in XYZ Diplomatic Enclave.',
    property_id: 'prop-104',
    property_title: 'The Grand Ambassador Manor — XYZ Enclave',
    created_at: new Date(Date.now() - 3600000 * 72).toISOString(),
    status: 'Accepted'
  },
  {
    id: 'lead-1005',
    name: 'Retailer XYZ (Showcase Only)',
    phone: '+91 00000 55555',
    email: 'xyz.retail@demo-showcase.xyz',
    property_type: 'Commercial',
    location: 'Sector XYZ',
    budget: '₹ 1 Cr - ₹ 3 Cr',
    timeline: 'Exploring Demo',
    purpose: 'Rental Income',
    requirements: 'Fictional demo inquiry: retail demo space in Sector XYZ Commercial Park.',
    property_id: 'prop-107',
    property_title: 'Avenue 62 High-Street Retail & Dining — Sector XYZ',
    created_at: new Date(Date.now() - 3600000 * 96).toISOString(),
    status: 'Rejected'
  }
];

export function getSavedInquiries() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_MOCK_LEADS));
      return INITIAL_MOCK_LEADS;
    }
    const parsed = JSON.parse(raw);
    // Ensure that if old non-XYZ data was stored, we re-seed with clean XYZ fictional records
    if (parsed.length > 0 && !parsed[0].email?.includes('xyz')) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_MOCK_LEADS));
      return INITIAL_MOCK_LEADS;
    }
    return parsed;
  } catch (err) {
    console.error('Error reading saved inquiries:', err);
    return INITIAL_MOCK_LEADS;
  }
}

/**
 * Returns fake showcase leads for the demo admin panel
 */
export async function fetchLiveLeads() {
  return getSavedInquiries();
}

/**
 * Form submissions in Showcase Demo mode:
 * Validates inputs but strictly does NOT collect or store any data into database or storage.
 */
export async function saveInquiry(inquiryData) {
  const name = String(inquiryData.name || '').trim().slice(0, 100);
  const phone = String(inquiryData.phone || '').trim().slice(0, 20);

  if (!name || !phone) {
    return { success: false, error: 'Please provide both your name and phone number.' };
  }

  // DEMO MODE: Do not collect, transmit, or store any form data into Supabase or localStorage
  return { 
    success: true, 
    isDemo: true, 
    message: 'Showcase Demo: No data has been collected or stored.' 
  };
}

/**
 * Updates lead status in Supabase and local cache
 */
export async function updateLeadStatus(leadId, newStatus) {
  try {
    if (isSupabaseConfigured()) {
      const { error } = await supabase
        .from('leads')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', leadId);

      if (error) {
        console.warn('[Leads] Supabase status update warning:', error.message);
      }
    }

    await recordAuditLog({
      action: 'LEAD_STATUS_CHANGED',
      entityType: 'LEAD',
      entityId: leadId,
      metadata: { newStatus },
    });

    const existing = getSavedInquiries();
    const updated = existing.map(lead => 
      lead.id === leadId ? { ...lead, status: newStatus, updated_at: new Date().toISOString() } : lead
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return { success: true, leads: updated };
  } catch (err) {
    console.error('Error updating lead status:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Deletes lead from Supabase and local cache
 */
export async function deleteLead(leadId) {
  try {
    if (isSupabaseConfigured()) {
      const { error } = await supabase
        .from('leads')
        .delete()
        .eq('id', leadId);

      if (error) {
        console.warn('[Leads] Supabase delete warning:', error.message);
      }
    }

    await recordAuditLog({
      action: 'LEAD_DELETED',
      entityType: 'LEAD',
      entityId: leadId,
    });

    const existing = getSavedInquiries();
    const updated = existing.filter(lead => lead.id !== leadId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return { success: true, leads: updated };
  } catch (err) {
    console.error('Error deleting lead:', err);
    return { success: false, error: err.message };
  }
}
