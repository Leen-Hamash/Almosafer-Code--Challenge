import React from 'react';
import styled from '@emotion/styled';
import { PaginationInterface } from '../types/tableTypes';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
  }
`;

const PaginationButton = styled.button`
  padding: 8px 16px;
  background: linear-gradient(135deg, #1976d2, #1565c0);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background: linear-gradient(135deg, #1565c0, #1976d2);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }

  @media (max-width: 768px) {
    width: 15%;
  }
`;
const PageIndicator = styled.span`
  font-size: 14px;
  color: #333;
  margin: 0 8px;
`;

export const Pagination: React.FC<PaginationInterface> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <PaginationContainer>
      <PaginationButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </PaginationButton>
      <PageIndicator>
        {currentPage} of {totalPages}
      </PageIndicator>
      <PaginationButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </PaginationButton>
    </PaginationContainer>
  );
};