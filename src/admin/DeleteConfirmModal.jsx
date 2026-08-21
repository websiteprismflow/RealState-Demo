import React from 'react';
import { AlertTriangle, X, Trash2 } from 'lucide-react';

export default function DeleteConfirmModal({ isOpen, itemType = 'item', itemTitle = '', onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay animate-fade-in" onClick={onCancel}>
      <div 
        className="delete-confirm-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button className="modal-close-btn" onClick={onCancel} aria-label="Cancel">
          <X size={18} />
        </button>

        <div className="delete-icon-wrap">
          <AlertTriangle size={32} className="text-danger" />
        </div>

        <h3 className="delete-title">Are you sure you want to delete this {itemType}?</h3>
        
        {itemTitle && (
          <div className="delete-item-preview">
            <span>"{itemTitle}"</span>
          </div>
        )}

        <p className="delete-warning-text">
          This action cannot be undone. All associated information will be permanently removed from the system.
        </p>

        <div className="delete-actions-row">
          <button 
            type="button" 
            className="btn btn-outline btn-sm delete-cancel-btn"
            onClick={onCancel}
          >
            <span>Cancel</span>
          </button>
          
          <button 
            type="button" 
            className="btn btn-danger-gold btn-sm"
            onClick={onConfirm}
          >
            <Trash2 size={15} />
            <span>Delete {itemType}</span>
          </button>
        </div>
      </div>

      <style>{`
        .delete-confirm-card {
          background: #FFFFFF;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          width: 100%;
          max-width: 440px;
          padding: 32px 28px;
          text-align: center;
          position: relative;
          box-shadow: 0 20px 50px rgba(0,0,0,0.3);
        }

        .delete-icon-wrap {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #FFEBEE;
          border: 1px solid #FFCDD2;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 18px;
        }

        .text-danger {
          color: #C62828;
        }

        .delete-title {
          font-family: var(--font-display);
          font-size: 1.35rem;
          font-weight: 700;
          color: var(--text-charcoal-primary);
          margin-bottom: 8px;
        }

        .delete-item-preview {
          background: var(--bg-cream-light);
          border: 1px solid var(--border-subtle);
          padding: 8px 12px;
          border-radius: var(--radius-xs);
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-charcoal-secondary);
          margin-bottom: 12px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .delete-warning-text {
          font-size: 0.85rem;
          color: var(--text-muted-warm);
          line-height: 1.5;
          margin-bottom: 24px;
        }

        .delete-actions-row {
          display: flex;
          gap: 12px;
          justify-content: center;
        }

        .delete-cancel-btn {
          flex: 1;
        }

        .btn-danger-gold {
          flex: 1.2;
          background: #C62828;
          color: #FFFFFF;
          border: 1px solid #B71C1C;
        }

        .btn-danger-gold:hover {
          background: #B71C1C;
          box-shadow: 0 4px 14px rgba(198, 40, 40, 0.4);
        }
      `}</style>
    </div>
  );
}
