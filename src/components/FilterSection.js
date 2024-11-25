import React from 'react';
import { FilterSelect } from './genericComponents/FormInputFields';
import Button from './genericComponents/Button';

const FilterSection = ({ photos, filters, setFilters, onSearch }) => {
    const getUniqueOptions = (key, formatFn = (val) => val) => {
        const uniqueValues = [...new Set(photos.map(p => p[key]))].sort();
        return uniqueValues.map(value => ({
            value,
            label: formatFn(value)
        }));
    };

    const filterConfigs = [
        {
            key: 'date',
            label: 'Date',
            options: getUniqueOptions('date', (date) => new Date(date).toLocaleDateString())
        },
        {
            key: 'location',
            label: 'Location',
            options: getUniqueOptions('location')
        },
        {
            key: 'person',
            label: 'Person',
            options: getUniqueOptions('person')
        }
    ];

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };


    return (
        <div className="bg-blue-400 p-3 border-2 border-gray-600 mb-8">
            <div className="text-white mb-3 text-center">Filters — Date, Location, Person, .....</div>
            <div className="sm:flex m-2 gap-4">

                {filterConfigs.map(({ key, label, options }) => (
                    <FilterSelect
                        key={key}
                        label={label}
                        options={options}
                        value={filters[key] || ''}
                        onChange={(value) => handleFilterChange(key, value)}
                        selectClassName={'p-1 rounded-md bg-white cursor-pointer'}
                    />
                ))}

                <div className="ml-auto mt-2 sm:mt-0">
                    <Button
                        onClick={onSearch}
                        buttonClassName={"bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 border-2 border-gray-500 transition"}
                    >
                        Search
                    </Button>
                </div>
            </div>
        </div>
    );
};


export default FilterSection;