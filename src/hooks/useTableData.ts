import { useState, useEffect, useMemo, useCallback } from 'react';
import debounce from 'lodash/debounce';
import { TableData } from '../types/tableTypes';

export const useTableData = (initialData: TableData[] = []) => {
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [editedCells, setEditedCells] = useState<Set<string>>(new Set());
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;


  useEffect(() => {
    if (initialData && initialData.length > 0) {
      setTableData(initialData);
    }
  }, [initialData]);

  const saveChanges = useCallback(() => {
    localStorage.setItem('tableData', JSON.stringify(tableData));
    setEditedCells(new Set());
  }, [tableData]);

  const updateCell = useCallback((rowIndex: number, columnId: string, value: string) => {
    setTableData((prevData) => {
      const newData = [...prevData];
      newData[rowIndex] = { ...newData[rowIndex], [columnId]: value };
      return newData;
    });
    setEditedCells((prev) => new Set(prev).add(`${rowIndex}-${columnId}`));
  }, []);

  const debouncedFilter = useMemo(
    () =>
      debounce((column: string, value: string) => {
        setColumnFilters((prev) => {
          const newFilters = { ...prev };
          if (value === '') {
            delete newFilters[column];
          } else {
            newFilters[column] = value;
          }
          return newFilters;
        });
      }, 300),
    []
  );


  const filteredData = useMemo(() => {
    const hasActiveFilters = Object.values(columnFilters).some(value => value !== '');

    if (!hasActiveFilters) return tableData;

    return tableData.filter((row) =>
      Object.entries(columnFilters).every(([column, filterValue]) => {
        if (!filterValue) return true;
        const cellValue = String(row[column] || '').toLowerCase();
        return cellValue.includes(filterValue.toLowerCase());
      })
    );
  }, [tableData, columnFilters]);


  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return {
    data: paginatedData,
    editedCells,
    updateCell,
    saveChanges,
    debouncedFilter,
    currentPage,
    totalPages,
    setCurrentPage,
  };
};
