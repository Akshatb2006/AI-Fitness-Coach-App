import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Modal } from './common/Modal';

export const ImageModal = ({ isOpen, onClose, item, imageUrl, loading }) => {
  const { theme, darkMode } = useTheme();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={item?.name} loading={loading}>
      {imageUrl && (
        <>
          <div className={`aspect-video rounded-xl overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
            <img
              src={imageUrl}
              alt={item?.name}
              className="w-full h-full object-cover"
            />
          </div>
          <p className={`mt-3 text-sm ${theme.subtext} text-center`}>
            {item?.type === 'exercise'
              ? 'Visual demonstration of the exercise'
              : 'AI-generated food image'}
          </p>
        </>
      )}
    </Modal>
  );
};