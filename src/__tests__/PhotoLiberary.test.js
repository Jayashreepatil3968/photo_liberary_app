import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import PhotoLibrary from '../pages/PhotoLiberary';

describe('PhotoLibrary Component', () => {
    beforeEach(() => {
        // Clear localStorage before each test
        localStorage.clear();
    });

    test('renders empty state message when no photos exist', () => {
        const { getByText } = render(<PhotoLibrary />);
        expect(getByText('Upload your first photo to get started!')).toBeInTheDocument();
    });

    test('upload button is disabled when no files are selected', () => {
        const { getByText } = render(<PhotoLibrary />);
        const uploadButton = getByText('Upload');
        expect(uploadButton).toBeDisabled();
    });
});