
import React from 'react';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

interface Option {
  value: string;
  label: string;
}

interface OptionsSelectorProps {
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const OptionsSelector: React.FC<OptionsSelectorProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className="w-full">
      <label htmlFor={label} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <select
          id={label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-white border border-gray-300 rounded-md py-2 px-3 pr-8 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-shadow"
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};

export default OptionsSelector;
