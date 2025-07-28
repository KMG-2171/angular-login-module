
import React from 'react';

interface SwitchProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Switch: React.FC<SwitchProps> = ({ label, checked, onChange }) => {
  return (
    <label className="flex items-center justify-between cursor-pointer">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
      <div
        className={`relative inline-block w-10 h-6 rounded-full transition-colors duration-300 ${
          checked ? 'bg-brand-primary' : 'bg-gray-300 dark:bg-gray-600'
        }`}
        onClick={(e) => {
            e.preventDefault();
            onChange(!checked);
        }}
      >
        <span
          className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
            checked ? 'transform translate-x-4' : ''
          }`}
        />
      </div>
    </label>
  );
};

export default Switch;
