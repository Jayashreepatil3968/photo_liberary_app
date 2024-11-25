import React, { useState } from 'react';

import { usePhotoStorage } from '../hooks/usePhotoStorage';
import { generateRandomLocation, generateRandomPerson } from '../utils/photoHelpers';
import { PHOTOS_PER_PAGE } from '../utils/constants';
import Pagination from '../components/Pagination';
import PhotoGrid from '../components/PhotoGrid';
import FilterSection from '../components/FilterSection';
import UploadSection from '../components/UploadSection';

const PhotoLibrary = () => {
    const { photos, setPhotos } = usePhotoStorage();
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [filters, setFilters] = useState({ date: '', location: '', person: '' });
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const handleFileSelection = (event) => {
        setSelectedFiles(Array.from(event.target.files));
    };

    const handleUpload = async () => {
        if (selectedFiles.length === 0) return;
        setLoading(true);

        try {
            const newPhotos = await Promise.all(selectedFiles.map(async (file) => {
                return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        resolve({
                            id: Math.random().toString(36).substring(2, 9),
                            url: e.target.result,
                            date: new Date().toISOString().split('T')[0],
                            location: generateRandomLocation(),
                            person: generateRandomPerson(),
                            fileName: file.name,
                            uploadTime: new Date().toISOString()
                        });
                    };
                    reader.readAsDataURL(file);
                });
            }));

            setPhotos(prevPhotos => [...prevPhotos, ...newPhotos]);
            setSelectedFiles([]);
            const fileInput = document.querySelector('input[type="file"]');
            if (fileInput) fileInput.value = '';
        } catch (error) {
            console.error('Error uploading photos:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredPhotos = photos.filter(photo => (
        (!filters.date || photo.date.includes(filters.date)) &&
        (!filters.location || photo.location.toLowerCase().includes(filters.location.toLowerCase())) &&
        (!filters.person || photo.person.toLowerCase().includes(filters.person.toLowerCase()))
    ));

    const currentPhotos = filteredPhotos.slice(
        (currentPage - 1) * PHOTOS_PER_PAGE,
        currentPage * PHOTOS_PER_PAGE
    );
    return (
        <div className="items-center justify-center bg-white p-8">
            <div className="min-h-screen max-w-5xl mx-auto bg-blue-500 border-gray-500 border-2 shadow-xl py-6 px-12">
                <h1 className="text-2xl text-white mb-8 text-center font-semibold">SPA — Photo Library</h1>

                <UploadSection
                    onFileSelection={handleFileSelection}
                    onUpload={handleUpload}
                    loading={loading}
                    hasFiles={selectedFiles.length > 0}
                />

                <FilterSection
                    photos={photos}
                    filters={filters}
                    setFilters={setFilters}
                    onSearch={() => setCurrentPage(1)}
                />

                <PhotoGrid photos={currentPhotos} />

                {photos.length === 0 && (
                    <div className="text-center text-white py-10">
                        <p>Upload your first photo to get started!</p>
                    </div>
                )}

                {loading && (
                    <div className="text-center text-white py-4">
                        <p>Uploading photos...</p>
                    </div>
                )}

                <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(filteredPhotos.length / PHOTOS_PER_PAGE)}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    );
};

export default PhotoLibrary;