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
import { getSavedInquiries, updateLeadStatus, deleteLead } from '../data/inquiries';
import { getStoredProperties, saveNewProperty, updateExistingProperty, deleteExistingProperty } from '../data/propertyStore';
import './admin.css';

export default function AdminDashboard({ onLogout, onViewCustomerSite, onViewCustomerProperty }) {
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'leads' | 'properties' | 'settings'
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Data Stores
  const [leads, setLeads] = useState([]);
  const [properties, setProperties] = useState([]);

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

  // Initial Load
  useEffect(() => {
    setLeads(getSavedInquiries());
    setProperties(getStoredProperties());
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Lead Actions
  const handleStatusChange = (leadId, newStatus) => {
    const res = updateLeadStatus(leadId, newStatus);
    if (res.success) {
      setLeads(res.leads);
      if (selectedLead && selectedLead.id === leadId) {
        setSelectedLead(prev => ({ ...prev, status: newStatus }));
      }
      showToast(`Lead status updated to "${newStatus}".`);
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

  const handleConfirmDelete = () => {
    if (deleteModal.itemType === 'lead') {
      const res = deleteLead(deleteModal.itemId);
      if (res.success) {
        setLeads(res.leads);
        if (selectedLead && selectedLead.id === deleteModal.itemId) {
          setSelectedLead(null);
        }
        showToast('Lead permanently deleted.');
      }
    } else if (deleteModal.itemType === 'property') {
      const res = deleteExistingProperty(deleteModal.itemId);
      if (res.success) {
        setProperties(res.properties);
        showToast('Property permanently removed from catalog.');
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

  const handleSavePropertyForm = (formData) => {
    if (editingProperty) {
      // Update existing
      const res = updateExistingProperty(editingProperty.id, formData);
      if (res.success) {
        setProperties(res.properties);
        setPropertyFormOpen(false);
        setEditingProperty(null);
        showToast('Property updated successfully.');
      }
    } else {
      // Add new
      const res = saveNewProperty(formData);
      if (res.success) {
        setProperties(res.properties);
        setPropertyFormOpen(false);
        showToast('New property created successfully.');
      }
    }
  };

  const handleToggleFeatured = (propertyId) => {
    const prop = properties.find(p => p.id === propertyId);
    if (prop) {
      const newFeatured = !prop.featured;
      const res = updateExistingProperty(propertyId, { featured: newFeatured });
      if (res.success) {
        setProperties(res.properties);
        showToast(`Property ${newFeatured ? 'marked as Featured' : 'removed from Featured spotlight'}.`);
      }
    }
  };

  const handleChangePropertyStatus = (propertyId, newStatus) => {
    const res = updateExistingProperty(propertyId, { status: newStatus });
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
            <AdminSettings onShowToast={showToast} />
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
