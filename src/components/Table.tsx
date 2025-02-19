import React, { useState, useEffect } from 'react';
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  horizontalListSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useTableContext } from '../context/TableContext';
import { TableHeader, TableCell, StyledTable, HeaderContent, SearchInput } from './StyledComponents';
import { DateCell } from './DateCell';

interface SortableHeaderProps {
  column: string;
  columnFilters: Record<string, string>;
  dispatch: any;
}

const SortableHeader = ({ column, columnFilters, dispatch }: SortableHeaderProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: column });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <TableHeader
      ref={setNodeRef}
      style={style}
      isDragging={isDragging}
      {...attributes}
      {...listeners}
    >
      <HeaderContent>
        <span>{column}</span>
        <SearchInput
          placeholder={`Search ${column}...`}
          onChange={(e) => dispatch({
            type: 'SET_COLUMN_FILTERS',
            payload: { ...columnFilters, [column]: e.target.value }
          })}
          onClick={(e) => e.stopPropagation()}
        />
      </HeaderContent>
    </TableHeader>
  );
};

export const Table = () => {
  const { state, dispatch } = useTableContext();
  const { tableData, editedCells, currentPage, columnFilters, columnOrder } = state;
  const itemsPerPage = 6;

  const [columns, setColumns] = useState(columnOrder);

  useEffect(() => {
    if (tableData.length > 0 && columnOrder.length === 0) {
      const initialColumns = Object.keys(tableData[0]);
      dispatch({ type: 'SET_COLUMN_ORDER', payload: initialColumns });
      setColumns(initialColumns);
    } else {
      setColumns(columnOrder);
    }
  }, [columnOrder, tableData, dispatch]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  if (tableData.length === 0) return null;

  const paginatedData = tableData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over || active.id === over.id) return;

    const oldIndex = columns.indexOf(active.id as string);
    const newIndex = columns.indexOf(over.id as string);

    const newColumns = [...columns];
    newColumns.splice(oldIndex, 1);
    newColumns.splice(newIndex, 0, active.id as string);
    
    setColumns(newColumns);
    dispatch({ type: 'SET_COLUMN_ORDER', payload: newColumns });

    const reorderedData = tableData.map(row => {
      const newRow: Record<string, string> = {};
      newColumns.forEach(col => {
        newRow[col] = row[col];
      });
      return newRow;
    });

    dispatch({ type: 'SET_TABLE_DATA', payload: reorderedData });
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <StyledTable>
        <thead>
          <tr>
            <SortableContext
              items={columns}
              strategy={horizontalListSortingStrategy}
            >
              {columns.map((column) => (
                <SortableHeader
                  key={column}
                  column={column}
                  columnFilters={columnFilters}
                  dispatch={dispatch}
                />
              ))}
            </SortableContext>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column) => (
                <TableCell
                  key={`${rowIndex}-${column}`}
                  isEdited={editedCells.has(`${rowIndex}-${column}`)}
                >
                  {['departureDate', 'returnDate'].includes(column) ? (
                    <DateCell
                      value={row[column]}
                      onChange={(value) => dispatch({
                        type: 'UPDATE_CELL',
                        payload: { rowIndex, columnId: column, value }
                      })}
                    />
                  ) : (
                    <input
                      value={row[column]}
                      onChange={(e) => dispatch({
                        type: 'UPDATE_CELL',
                        payload: { 
                          rowIndex, 
                          columnId: column, 
                          value: e.target.value 
                        }
                      })}
                    />
                  )}
                </TableCell>
              ))}
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </DndContext>
  );
};