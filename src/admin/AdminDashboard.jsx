import React, { useState, useEffect } from 'react';
import { ShieldAlert } from 'lucide-react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import DashboardOverview from './DashboardOverview';
import LeadsManagement from './LeadsManagement';
import LeadDetailModal from './LeadDetailModal';
import PropertiesManagement from './PropertiesManagement';
import PropertyFormModal from './PropertyFormModal';
import AdminSettings from './AdminSettings';
import DeleteConfirmModal from './DeleteConfirmModal';
import DemoNoticeModal from './DemoNoticeModal';
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

  // Demo Showcase Notice State (Blocks persists on confirm)
  const [demoNotice, setDemoNotice] = useState({
    isOpen: false,
    title: 'Demo Showcase Notice',
    message: 'This is a demo, so no changes are saved.'
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

  const handleShowDemoNotice = (message = 'This is a demo, so no changes are saved.', title = 'Demo Showcase Notice') => {
    setDemoNotice({
      isOpen: true,
      title,
      message
    });
  };

  // Lead Actions
  const handleStatusChange = async (leadId, newStatus) => {
    // Status can be updated by admin as allowed by requirements
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

  const handleConfirmDelete = () => {
    const itemTypeLabel = deleteModal.itemType === 'lead' ? 'client lead' : 'property listing';
    // Close delete confirm modal and display demo notice screen
    setDeleteModal({ isOpen: false, itemType: 'lead', itemId: null, itemTitle: '' });
    handleShowDemoNotice(
      `This is a demo, so no changes or deletions are saved. The ${itemTypeLabel} has been kept unchanged.`,
      'Demo Showcase Notice'
    );
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
    // Admin can edit and change things in form, but after confirming show demo notice screen
    const isEdit = Boolean(editingProperty);
    setPropertyFormOpen(false);
    setEditingProperty(null);
    handleShowDemoNotice(
      isEdit 
        ? 'This is a demo, so no changes to property details are saved.' 
        : 'This is a demo, so new property listings are not saved.',
      'Demo Showcase Notice'
    );
  };

  const handleToggleFeatured = (propertyId) => {
    handleShowDemoNotice('This is a demo, so featured spotlight changes are not saved.', 'Demo Showcase Notice');
  };

  const handleChangePropertyStatus = (propertyId, newStatus) => {
    handleShowDemoNotice('This is a demo, so property status changes are not saved.', 'Demo Showcase Notice');
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
          {/* Global Demo Disclaimer Banner */}
          <div className="admin-demo-disclaimer-banner">
            <ShieldAlert size={20} className="text-gold flex-shrink-0" />
            <div className="admin-demo-disclaimer-content">
              <strong className="disclaimer-bold">DEMO SHOWCASE ENVIRONMENT:</strong>
              <span>
                All client leads, customer contacts, emails, property assets, and addresses displayed in this Admin Panel are 100% fictional / fake and only showcased for demonstration purposes.
              </span>
            </div>
          </div>

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
            <AdminSettings 
              onShowToast={showToast} 
              onShowDemoNotice={handleShowDemoNotice}
              adminUser={adminUser} 
            />
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

      {/* Demo Notice Screen / Modal (Appears after confirming any edit/addition/deletion) */}
      <DemoNoticeModal 
        isOpen={demoNotice.isOpen}
        title={demoNotice.title}
        message={demoNotice.message}
        onClose={() => setDemoNotice({ isOpen: false, title: 'Demo Showcase Notice', message: '' })}
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
