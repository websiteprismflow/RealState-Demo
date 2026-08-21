import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3500);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="admin-toast-container">
      <div className={`admin-toast ${type}`}>
        {type === 'success' ? (
          <CheckCircle2 size={18} className="toast-icon text-gold" />
        ) : (
          <AlertCircle size={18} className="toast-icon" />
        )}
        <span className="toast-message">{message}</span>
        <button className="toast-close" onClick={onClose}>
          <X size={14} />
        </button>
      </div>

      <style>{`
        .toast-message {
          flex: 1;
        }
        .toast-close {
          color: #A39E94;
          display: flex;
          align-items: center;
        }
        .toast-close:hover {
          color: #FFFFFF;
        }
      `}</style>
    </div>
  );
}
