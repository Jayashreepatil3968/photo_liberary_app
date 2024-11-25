import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import UploadSection from '../components/UploadSection';

describe('UploadSection Component', () => {
    const onFileSelectionMock = jest.fn();
    const onUploadMock = jest.fn();

    test('renders correctly', () => {
        render(
            <UploadSection
                onFileSelection={onFileSelectionMock}
                onUpload={onUploadMock}
                loading={false}
                hasFiles={true}
            />
        );

        // Check if the file input and upload button are rendered
        expect(screen.getByRole('button', { name: 'Upload' })).toBeInTheDocument();
    });

    test('calls onUpload when the button is clicked', () => {
        render(
            <UploadSection
                onFileSelection={onFileSelectionMock}
                onUpload={onUploadMock}
                loading={false}
                hasFiles={true}
            />
        );

        const uploadButton = screen.getByRole('button', { name: 'Upload' });
        fireEvent.click(uploadButton);

        // Verify that onUploadMock is called
        expect(onUploadMock).toHaveBeenCalledTimes(1);
    });

    test('disables the upload button when loading or no files', () => {
        const { rerender } = render(
            <UploadSection
                onFileSelection={onFileSelectionMock}
                onUpload={onUploadMock}
                loading={true}
                hasFiles={true}
            />
        );

        const uploadButton = screen.getByRole('button', { name: 'Upload' });

        // Button should be disabled when loading is true
        expect(uploadButton).toBeDisabled();

        // Rerender with hasFiles set to false
        rerender(
            <UploadSection
                onFileSelection={onFileSelectionMock}
                onUpload={onUploadMock}
                loading={false}
                hasFiles={false}
            />
        );

        // Button should be disabled when no files are selected
        expect(uploadButton).toBeDisabled();
    });
});
