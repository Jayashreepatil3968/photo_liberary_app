import React from 'react';
import { PhotoCard } from './PhotoCard';

const PhotoGrid = ({ photos }) => (
    <div className="grid grid-cols-1 sm:grid-cols-4 px-10 sm:px-20 gap-6 mb-8">
        {photos.map((photo) => (
            <PhotoCard key={photo.id} photo={photo} />
        ))}
    </div>
);

export default PhotoGrid;