import styled from '@emotion/styled';

export const Container = styled.div`
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  overflow-x: auto;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  box-shadow: 1px 0px 7px 2px #d6d5d5;

  @media (max-width: 768px) {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
`;

export const TableHeader = styled.th<{ isDragging?: boolean }>`
  padding: 12px;
  text-align: left;
  background-color: #1976d2;
  color: white;
  min-width: 150px;
  text-transform: capitalize;
  cursor: grab;
  user-select: none;

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px;
  }
`;

export const TableCell = styled.td<{ isEdited: boolean }>`
  padding: 12px;
  border: 1px solid #ddd;
  cursor: pointer;
  background-color: ${({ isEdited }) => (isEdited ? '#fff9c4' : 'transparent')};

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px;
  }
`;

export const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;


export const SaveButton = styled.button<{ visible: boolean }>`
  padding: 8px 16px;
  background: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  width: fit-content;
  &:hover {
    background: #1565c0;
  }
  display: ${({ visible }) => (visible ? 'block' : 'none')};
`;

export const SearchInput = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 80%;
  &:focus {
    outline: 2px solid #1976d2;
    outline-offset: 2px;
  }
`;

export const ErrorMessage = styled.div`
  padding: 10px;
  background-color: #ffebee;
  color: #c62828;
  border-radius: 10px;
  margin-bottom: 20px;
`;

export const SrOnly = styled.div`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;
