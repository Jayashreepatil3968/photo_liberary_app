import React from 'react';

export const PhotoCard = ({ photo }) => (
    <div className="aspect-[4/3] bg-white rounded-lg overflow-hidden shadow-lg group relative">
        <img
            src={photo.url}
            alt={photo.fileName}
            className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-50 text-white text-sm transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <p className="truncate">{photo.location}</p>
            <p className="truncate">{photo.person}</p>
            <p className="truncate">{new Date(photo.date).toLocaleDateString()}</p>
        </div>
    </div>
);
