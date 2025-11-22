import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { X, Loader2 } from 'lucide-react';

export const Modal = ({ isOpen, onClose, title, children, loading }) => {
  const { theme } = useTheme();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className={`${theme.card} rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className={`font-bold ${theme.text}`}>{title}</h3>
          <button
            onClick={onClose}
            className={`p-1 rounded-lg ${theme.hover} ${theme.text}`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className={`w-10 h-10 ${theme.text} animate-spin mb-2`} />
            <p className={theme.subtext}>Generating...</p>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
};
