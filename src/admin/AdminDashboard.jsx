import React, { useState, useEffect } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import DashboardOverview from './DashboardOverview';
import LeadsManagement from './LeadsManagement';
import LeadDetailModal from './LeadDetailModal';
import PropertiesManagement from './PropertiesManagement';
import PropertyFormModal from './PropertyFormModal';
import AdminSettings from './AdminSettings';
import DeleteConfirmModal from './DeleteConfirmModal';
import Toast from './Toast';
import { getSavedInquiries, fetchLiveLeads, updateLeadStatus, deleteLead } from '../data/inquiries';
import { getStoredProperties, fetchLiveProperties, saveNewProperty, updateExistingProperty, deleteExistingProperty } from '../data/propertyStore';
import './admin.css';

export default function AdminDashboard({ onLogout, onViewCustomerSite, onViewCustomerProperty, adminUser }) {
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'leads' | 'properties' | 'settings'
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Data Stores
  const [leads, setLeads] = useState(getSavedInquiries());
  const [properties, setProperties] = useState(getStoredProperties());

  // Modals & Active Item States
  const [selectedLead, setSelectedLead] = useState(null);
  const [editingProperty, setEditingProperty] = useState(null);
  const [propertyFormOpen, setPropertyFormOpen] = useState(false);

  // Delete Confirmation State
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    itemType: 'lead', // 'lead' | 'property'
    itemId: null,
    itemTitle: ''
  });

  // Toast Notification State
  const [toast, setToast] = useState({ message: '', type: 'success' });

  // Initial Asynchronous Load from Supabase
  useEffect(() => {
    async function loadData() {
      try {
        const [liveLeads, liveProps] = await Promise.all([
          fetchLiveLeads(),
          fetchLiveProperties()
        ]);
        if (liveLeads) setLeads(liveLeads);
        if (liveProps) setProperties(liveProps);
      } catch (err) {
        console.warn('Live data fetch notice:', err);
      }
    }
    loadData();
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Lead Actions
  const handleStatusChange = async (leadId, newStatus) => {
    const res = await updateLeadStatus(leadId, newStatus);
    if (res.success) {
      setLeads(res.leads);
      if (selectedLead && selectedLead.id === leadId) {
        setSelectedLead(prev => ({ ...prev, status: newStatus }));
      }
      showToast(`Lead status updated to "${newStatus}".`);
    } else {
      showToast(res.error || 'Failed to update lead status.', 'error');
    }
  };

  const handleDeleteLeadRequest = (lead) => {
    setDeleteModal({
      isOpen: true,
      itemType: 'lead',
      itemId: lead.id,
      itemTitle: lead.name
    });
  };

  const handleConfirmDelete = async () => {
    if (deleteModal.itemType === 'lead') {
      const res = await deleteLead(deleteModal.itemId);
      if (res.success) {
        setLeads(res.leads);
        if (selectedLead && selectedLead.id === deleteModal.itemId) {
          setSelectedLead(null);
        }
        showToast('Lead permanently deleted.');
      } else {
        showToast(res.error || 'Failed to delete lead.', 'error');
      }
    } else if (deleteModal.itemType === 'property') {
      const res = await deleteExistingProperty(deleteModal.itemId);
      if (res.success) {
        setProperties(res.properties);
        showToast('Property permanently removed from catalog.');
      } else {
        showToast(res.error || 'Failed to delete property.', 'error');
      }
    }
    setDeleteModal({ isOpen: false, itemType: 'lead', itemId: null, itemTitle: '' });
  };

  // Property Actions
  const handleOpenAddProperty = () => {
    setEditingProperty(null);
    setPropertyFormOpen(true);
  };

  const handleOpenEditProperty = (prop) => {
    setEditingProperty(prop);
    setPropertyFormOpen(true);
  };

  const handleDeletePropertyRequest = (prop) => {
    setDeleteModal({
      isOpen: true,
      itemType: 'property',
      itemId: prop.id,
      itemTitle: prop.title
    });
  };

  const handleSavePropertyForm = async (formData) => {
    if (editingProperty) {
      // Update existing
      const res = await updateExistingProperty(editingProperty.id, formData);
      if (res.success) {
        setProperties(res.properties);
        setPropertyFormOpen(false);
        setEditingProperty(null);
        showToast('Property updated successfully.');
      } else {
        showToast(res.error || 'Failed to update property.', 'error');
      }
    } else {
      // Add new
      const res = await saveNewProperty(formData);
      if (res.success) {
        setProperties(res.properties);
        setPropertyFormOpen(false);
        showToast('New property created successfully.');
      } else {
        showToast(res.error || 'Failed to create property.', 'error');
      }
    }
  };

  const handleToggleFeatured = async (propertyId) => {
    const prop = properties.find(p => p.id === propertyId);
    if (prop) {
      const newFeatured = !prop.featured;
      const res = await updateExistingProperty(propertyId, { featured: newFeatured });
      if (res.success) {
        setProperties(res.properties);
        showToast(`Property ${newFeatured ? 'marked as Featured' : 'removed from Featured spotlight'}.`);
      }
    }
  };

  const handleChangePropertyStatus = async (propertyId, newStatus) => {
    const res = await updateExistingProperty(propertyId, { status: newStatus });
    if (res.success) {
      setProperties(res.properties);
      showToast(`Property status updated to "${newStatus}".`);
    }
  };

  const pendingCount = leads.filter(l => l.status === 'Pending').length;

  return (
    <div className="admin-root">
      {/* Sidebar */}
      <AdminSidebar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        pendingLeadsCount={pendingCount}
        totalPropertiesCount={properties.length}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={onLogout}
        onViewCustomerSite={onViewCustomerSite}
        adminUser={adminUser}
      />

      {/* Main Workspace */}
      <div className="admin-workspace">
        <AdminHeader 
          activeTab={activeTab}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onViewCustomerSite={onViewCustomerSite}
        />

        <div className="admin-main-container">
          {activeTab === 'dashboard' && (
            <DashboardOverview 
              leads={leads}
              properties={properties}
              onViewLead={(lead) => setSelectedLead(lead)}
              onNavigateTab={(tab) => setActiveTab(tab)}
              onAddNewProperty={handleOpenAddProperty}
            />
          )}

          {activeTab === 'leads' && (
            <LeadsManagement 
              leads={leads}
              onViewLead={(lead) => setSelectedLead(lead)}
              onStatusChange={handleStatusChange}
              onDeleteRequest={handleDeleteLeadRequest}
            />
          )}

          {activeTab === 'properties' && (
            <PropertiesManagement 
              properties={properties}
              onAddNew={handleOpenAddProperty}
              onEdit={handleOpenEditProperty}
              onDeleteRequest={handleDeletePropertyRequest}
              onToggleFeatured={handleToggleFeatured}
              onChangeStatus={handleChangePropertyStatus}
              onViewCustomerProperty={onViewCustomerProperty}
            />
          )}

          {activeTab === 'settings' && (
            <AdminSettings onShowToast={showToast} adminUser={adminUser} />
          )}
        </div>
      </div>

      {/* Lead Detail Modal */}
      <LeadDetailModal 
        lead={selectedLead}
        isOpen={Boolean(selectedLead)}
        onClose={() => setSelectedLead(null)}
        onStatusChange={handleStatusChange}
        onDeleteRequest={handleDeleteLeadRequest}
      />

      {/* Property Form Modal (Add / Edit) */}
      <PropertyFormModal 
        isOpen={propertyFormOpen}
        property={editingProperty}
        onClose={() => { setPropertyFormOpen(false); setEditingProperty(null); }}
        onSave={handleSavePropertyForm}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal 
        isOpen={deleteModal.isOpen}
        itemType={deleteModal.itemType}
        itemTitle={deleteModal.itemTitle}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteModal({ isOpen: false, itemType: 'lead', itemId: null, itemTitle: '' })}
      />

      {/* Toast Notifications */}
      <Toast 
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'success' })}
      />
    </div>
  );
}
