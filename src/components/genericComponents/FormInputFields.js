import React from 'react';

// Generic Select component
export const FilterSelect = ({ label, options, value, onChange }) => (
    <div className="mb-4">
        <select
            className="w-full p-2 border rounded-md"
            value={value}
            onChange={(e) => onChange(e.target.value)}
        >
            <option value="">{label}</option>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    </div>
)