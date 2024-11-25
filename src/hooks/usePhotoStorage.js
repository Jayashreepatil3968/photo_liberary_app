import { useState, useEffect } from 'react';
import { STORAGE_KEY } from '../utils/constants';

export const usePhotoStorage = () => {
    const [photos, setPhotos] = useState(() => {
        const savedPhotos = localStorage.getItem(STORAGE_KEY);
        return savedPhotos ? JSON.parse(savedPhotos) : [];
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(photos));
    }, [photos]);

    return { photos, setPhotos };
};