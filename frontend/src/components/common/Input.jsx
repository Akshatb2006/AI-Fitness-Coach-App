import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export const Input = ({ 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  className = '',
  ...props 
}) => {
  const { theme } = useTheme();

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`px-4 py-3 rounded-xl ${theme.input} ${theme.text} border focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all ${className}`}
      {...props}
    />
  );
};

export const TextArea = ({ placeholder, value, onChange, className = '', rows = 3 }) => {
  const { theme } = useTheme();

  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows}
      className={`w-full px-4 py-3 rounded-xl ${theme.input} ${theme.text} border focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all resize-none ${className}`}
    />
  );
};

export const Select = ({ value, onChange, options, className = '' }) => {
  const { theme } = useTheme();

  return (
    <select
      value={value}
      onChange={onChange}
      className={`px-4 py-3 rounded-xl ${theme.input} ${theme.text} border focus:border-purple-500 outline-none ${className}`}
    >
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  );
};