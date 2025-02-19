import { render, screen } from '@testing-library/react';
import { Pagination } from '../components/Pagination';
import '@testing-library/jest-dom/extend-expect'; 

describe('Pagination', () => {
  it('displays correct page information', () => {
    const mockProps = {
      currentPage: 2,
      totalPages: 5,
      onPageChange: jest.fn(),
    };
    
    render(<Pagination {...mockProps} />);
    expect(screen.getByText('2 of 5')).toBeInTheDocument();
  });
});