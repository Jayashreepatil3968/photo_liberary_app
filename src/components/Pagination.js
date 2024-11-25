import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center gap-3">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${currentPage === page ? 'bg-white' : 'bg-black hover:bg-gray-700'
                        }`}
                    aria-label={`Page ${page}`}
                />
            ))}
        </div>
    );
};

export default Pagination;
