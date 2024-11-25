import React from 'react';
import Button from './genericComponents/Button';

const UploadSection = ({ onFileSelection, onUpload, loading, hasFiles }) => (
    <div className="mb-6 items-center justify-center sm:flex gap-3">
        <input
            type="file"
            accept="image/*"
            onChange={onFileSelection}
            multiple
            className="sm:flex-grow p-1 max-w-56 sm:max-w-3xl bg-white text-gray-700"
            disabled={loading}
        />

        <Button
            onClick={onUpload}
            buttonClassName={"mt-2 sm:mt-0 px-8 py-1 bg-black text-white rounded hover:bg-gray-800 transition-colors"}
            disabled={loading || !hasFiles}
        >
            Upload</Button>
        {/* <button
            onClick={onUpload}
            className="mt-2 sm:mt-0 px-8 py-1 bg-black text-white rounded hover:bg-gray-800 transition-colors"
            disabled={loading || !hasFiles}
        >
            Upload
        </button> */}
    </div >
);


export default UploadSection;
