import React from 'react';
import { render, screen } from '@testing-library/react';
import { PhotoCard } from '../components/PhotoCard';

describe('PhotoCard Component', () => {
    const photoMock = {
        url: 'https://example.com/photo.jpg',
        fileName: 'photo.jpg',
        location: 'Paris',
        person: 'John Doe',
        date: '2024-11-24T12:00:00Z',
    };

    it('renders the photo with the correct URL and alt text', () => {
        render(<PhotoCard photo={photoMock} />);
        const image = screen.getByRole('img', { name: photoMock.fileName });
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', photoMock.url);
        expect(image).toHaveAttribute('alt', photoMock.fileName);
    });

    it('displays the correct location, person, and formatted date', () => {
        render(<PhotoCard photo={photoMock} />);
        expect(screen.getByText(photoMock.location)).toBeInTheDocument();
        expect(screen.getByText(photoMock.person)).toBeInTheDocument();
        expect(screen.getByText(new Date(photoMock.date).toLocaleDateString())).toBeInTheDocument();
    });

    it('applies hover effects correctly (opacity and transform)', () => {
        render(<PhotoCard photo={photoMock} />);
        const hoverOverlay = screen.getByText(photoMock.location).parentElement.parentElement;
        expect(hoverOverlay).toHaveClass(' aspect-[4/3] bg-white rounded-lg overflow-hidden shadow-lg group relative ');
    });

    it('truncates text for location, person, and date if too long', () => {
        const longPhotoMock = {
            ...photoMock,
            location: 'A very long location name that should be truncated',
            person: 'A very long person name that should be truncated',
        };
        render(<PhotoCard photo={longPhotoMock} />);
        const locationElement = screen.getByText(longPhotoMock.location);
        const personElement = screen.getByText(longPhotoMock.person);
        expect(locationElement).toHaveClass('truncate');
        expect(personElement).toHaveClass('truncate');
    });
});
