import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../components/Pagination';

describe('Pagination Component', () => {
    const mockOnPageChange = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('does not render when totalPages is 1 or less', () => {
        const { container } = render(<Pagination currentPage={1} totalPages={1} onPageChange={mockOnPageChange} />);
        expect(container.firstChild).toBeNull();

        render(<Pagination currentPage={1} totalPages={0} onPageChange={mockOnPageChange} />);
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('renders the correct number of page buttons', () => {
        const totalPages = 5;
        render(<Pagination currentPage={1} totalPages={totalPages} onPageChange={mockOnPageChange} />);
        const pageButtons = screen.getAllByRole('button', { name: /Page \d+/ });
        expect(pageButtons).toHaveLength(totalPages);
    });

    it('applies the correct class to the active page', () => {
        const currentPage = 3;
        render(<Pagination currentPage={currentPage} totalPages={5} onPageChange={mockOnPageChange} />);
        const activePageButton = screen.getByLabelText(`Page ${currentPage}`);
        expect(activePageButton).toHaveClass('bg-white');
    });

    it('applies the correct class to inactive pages', () => {
        const currentPage = 2;
        render(<Pagination currentPage={currentPage} totalPages={4} onPageChange={mockOnPageChange} />);
        const inactivePageButtons = screen.getAllByRole('button', { name: /Page \d+/ }).filter((button) => !button.classList.contains('bg-white'));
        inactivePageButtons.forEach((button) => {
            expect(button).toHaveClass('bg-black');
        });
    });

    it('calls onPageChange with the correct page number when a button is clicked', () => {
        const totalPages = 5;
        render(<Pagination currentPage={1} totalPages={totalPages} onPageChange={mockOnPageChange} />);
        const pageButton = screen.getByLabelText('Page 3');
        fireEvent.click(pageButton);
        expect(mockOnPageChange).toHaveBeenCalledWith(3);
    });
});
