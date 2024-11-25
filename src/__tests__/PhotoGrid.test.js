import React from 'react';
import { render, screen } from '@testing-library/react';
import PhotoGrid from '../components/PhotoGrid';
import { PhotoCard } from '../components/PhotoCard'; // Mock this component if needed

// Mock the PhotoCard component to focus on PhotoGrid
jest.mock('../components/PhotoCard', () => ({
    PhotoCard: ({ photo }) => <div data-testid="photo-card">{photo.title}</div>,
}));

describe('PhotoGrid Component', () => {

    it('renders the correct number of PhotoCard components', () => {
        const photos = [
            { id: 1, title: 'Photo 1' },
            { id: 2, title: 'Photo 2' },
            { id: 3, title: 'Photo 3' },
        ];
        render(<PhotoGrid photos={photos} />);
        const photoCards = screen.getAllByTestId('photo-card');
        expect(photoCards).toHaveLength(photos.length);
    });

    it('displays the correct photo details', () => {
        const photos = [
            { id: 1, title: 'Photo 1' },
            { id: 2, title: 'Photo 2' },
        ];
        render(<PhotoGrid photos={photos} />);
        photos.forEach((photo) => {
            expect(screen.getByText(photo.title)).toBeInTheDocument();
        });
    });

    it('renders an empty grid if no photos are provided', () => {
        const photos = [];
        render(<PhotoGrid photos={photos} />);
        expect(screen.queryByTestId('photo-card')).not.toBeInTheDocument();
    });
});
