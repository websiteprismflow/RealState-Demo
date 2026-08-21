import { supabase, isSupabaseConfigured, recordAuditLog } from '../lib/supabase';

const STORAGE_KEY = 'aurelia_leads_inquiries';

const INITIAL_MOCK_LEADS = [
  {
    id: 'lead-1001',
    name: 'Rajesh & Meenakshi Khanna',
    phone: '+91 98112 34567',
    email: 'rajesh.khanna@investcorp.in',
    property_type: 'Residence',
    location: 'Gurgaon',
    budget: '₹ 7 Cr - ₹ 15 Cr',
    timeline: 'Immediate (0-1 Month)',
    purpose: 'Self Use',
    requirements: 'Looking for an ultra-luxury 4BHK penthouse or sky villa on Golf Course Road with a minimum 4,000 sq.ft floor plate and private elevator foyer.',
    property_id: 'prop-101',
    property_title: 'The Solitaire Sky Villa — Golf Course Road',
    created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
    status: 'Pending'
  },
  {
    id: 'lead-1002',
    name: 'Sunil Mittal & Co (Family Office)',
    phone: '+91 99990 12345',
    email: 'sunil.m@capitalgrowth.com',
    property_type: 'Commercial',
    location: 'Gurgaon',
    budget: 'Above ₹ 15 Cr',
    timeline: '1 - 3 Months',
    purpose: 'Investment',
    requirements: 'Seeking pre-leased Grade-A corporate office suites in Cyber City or Horizon center with long-term Fortune 500 tenants and net yield > 8.0%.',
    property_id: 'prop-103',
    property_title: 'The Capital Apex — Cyber City Corporate Suites',
    created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
    status: 'Accepted'
  },
  {
    id: 'lead-1003',
    name: 'Dr. Devika Sengupta',
    phone: '+91 97118 89900',
    email: 'devika.sengupta@maxhealthcare.com',
    property_type: 'Plots',
    location: 'Panipat',
    budget: 'Under ₹ 1 Cr',
    timeline: '3 - 6 Months',
    purpose: 'Investment',
    requirements: 'Interested in gated residential plotted townships along GT Karnal road corridor. Need clear freehold title and immediate registry.',
    property_id: 'prop-105',
    property_title: 'The Horizon Plotted Boulevard — GT Road',
    created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
    status: 'Pending'
  },
  {
    id: 'lead-1004',
    name: 'Amitabh Bansal',
    phone: '+91 98200 54321',
    email: 'abansal@globaltrade.net',
    property_type: 'Residence',
    location: 'Delhi',
    budget: 'Above ₹ 15 Cr',
    timeline: 'Immediate (0-1 Month)',
    purpose: 'Self Use',
    requirements: 'Looking for an independent floor or bungalow in South Delhi (Vasant Vihar, Shanti Niketan or Golf Links) with park facing.',
    property_id: 'prop-104',
    property_title: 'The Grand Ambassador Manor — South Delhi',
    created_at: new Date(Date.now() - 3600000 * 72).toISOString(),
    status: 'Accepted'
  },
  {
    id: 'lead-1005',
    name: 'Karan Malhotra',
    phone: '+91 94170 11223',
    email: 'karan.m@gmail.com',
    property_type: 'Commercial',
    location: 'Noida',
    budget: '₹ 1 Cr - ₹ 3 Cr',
    timeline: 'Exploring Market',
    purpose: 'Rental Income',
    requirements: 'Inquiring about high-street retail shops in Sector 62. Looking for low entry ticket with flexible payment plan.',
    property_id: 'prop-107',
    property_title: 'Avenue 62 High-Street Retail & Dining',
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
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading saved inquiries:', err);
    return INITIAL_MOCK_LEADS;
  }
}

/**
 * Fetches real leads from Supabase `public.leads` for authorized administrators
 */
export async function fetchLiveLeads() {
  if (!isSupabaseConfigured()) {
    return getSavedInquiries();
  }

  try {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('[Leads] Supabase query notice:', error.message);
      return getSavedInquiries();
    }

    if (data && data.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return data;
    }

    return getSavedInquiries();
  } catch (err) {
    console.error('[Leads] Fetch error:', err);
    return getSavedInquiries();
  }
}

/**
 * Validates, sanitizes, and submits a customer inquiry to Supabase `public.leads`
 */
export async function saveInquiry(inquiryData) {
  // 1. Validation & Input Sanitization
  const name = String(inquiryData.name || '').trim().slice(0, 100);
  const phone = String(inquiryData.phone || '').trim().slice(0, 20);
  const email = String(inquiryData.email || '').trim().slice(0, 100);
  const property_type = String(inquiryData.property_type || 'Residence').trim().slice(0, 50);
  const location = String(inquiryData.location || 'Any / All Locations').trim().slice(0, 100);
  const budget = String(inquiryData.budget || 'Flexible').trim().slice(0, 50);
  const timeline = String(inquiryData.timeline || 'Immediate (0-1 Month)').trim().slice(0, 50);
  const purpose = String(inquiryData.purpose || 'Self Use').trim().slice(0, 50);
  const requirements = String(inquiryData.requirements || '').trim().slice(0, 1000);
  const property_id = inquiryData.property_id ? String(inquiryData.property_id).slice(0, 50) : null;
  const property_title = inquiryData.property_title ? String(inquiryData.property_title).slice(0, 200) : null;

  if (!name || !phone) {
    return { success: false, error: 'Please provide both your name and phone number.' };
  }

  const enrichedRequirements = property_title 
    ? (requirements ? `${requirements} (Property: ${property_title})` : `Inquired for: ${property_title}`)
    : requirements;

  const newInquiry = {
    id: 'lead-' + Date.now().toString().slice(-6) + '-' + Math.random().toString(36).substr(2, 4),
    name,
    phone,
    email,
    property_type,
    location,
    budget,
    timeline,
    purpose,
    requirements: enrichedRequirements,
    property_id,
    property_title,
    created_at: new Date().toISOString(),
    status: 'Pending'
  };

  try {
    if (isSupabaseConfigured()) {
      // Direct insertion conforming cleanly to standard Supabase columns
      const dbRecord = {
        name,
        phone,
        email: email || null,
        property_type,
        location,
        budget,
        timeline,
        purpose,
        requirements: enrichedRequirements,
        property_id: property_id || null,
        status: 'Pending'
      };

      const { data, error } = await supabase
        .from('leads')
        .insert([dbRecord])
        .select()
        .maybeSingle();

      if (error) {
        console.warn('[Leads] Supabase insert warning (falling back to cache):', error.message);
      } else if (data) {
        newInquiry.id = data.id || newInquiry.id;
      }
    }

    const existing = getSavedInquiries();
    const updated = [newInquiry, ...existing];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    return { success: true, inquiry: newInquiry };
  } catch (err) {
    console.error('Error saving inquiry:', err);
    return { success: false, error: err.message };
  }
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
