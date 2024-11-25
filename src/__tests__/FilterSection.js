import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import FilterSection from '../components/FilterSection';

const createMockPhoto = (overrides = {}) => ({
    id: Math.random().toString(36).substring(2, 9),
    url: 'data:image/jpeg;base64,mockbase64',
    date: '2024-03-24',
    location: 'New York',
    person: 'John',
    fileName: 'test-image.jpg',
    uploadTime: '2024-03-24T10:00:00Z',
    ...overrides
});

describe('FilterSection', () => {
    const mockPhotos = [
        createMockPhoto({ location: 'New York', person: 'John', date: '2024-03-24' }),
        createMockPhoto({ location: 'London', person: 'Emma', date: '2024-03-25' })
    ];

    const mockSetFilters = jest.fn();
    const mockOnSearch = jest.fn();

    test('renders all filter options', () => {
        render(
            <FilterSection
                photos={mockPhotos}
                filters={{ date: '', location: '', person: '' }}
                setFilters={mockSetFilters}
                onSearch={mockOnSearch}
            />
        );

        expect(screen.getByText('Date')).toBeInTheDocument();
        expect(screen.getByText('Location')).toBeInTheDocument();
        expect(screen.getByText('Person')).toBeInTheDocument();
    });

    test('triggers search on button click', () => {
        render(
            <FilterSection
                photos={mockPhotos}
                filters={{ date: '', location: '', person: '' }}
                setFilters={mockSetFilters}
                onSearch={mockOnSearch}
            />
        );

        fireEvent.click(screen.getByText('Search'));
        expect(mockOnSearch).toHaveBeenCalled();
    });
});
