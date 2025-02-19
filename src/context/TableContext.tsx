import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { TableData } from '../types/tableTypes';

type State = {
    tableData: TableData[];
    editedCells: Set<string>;
    columnFilters: Record<string, string>;
    currentPage: number;
    columnOrder: string[];
};

type Action =
    | { type: 'SET_TABLE_DATA'; payload: TableData[] }
    | { type: 'UPDATE_CELL'; payload: { rowIndex: number; columnId: string; value: string } }
    | { type: 'SAVE_CHANGES' }
    | { type: 'SET_COLUMN_FILTERS'; payload: Record<string, string> }
    | { type: 'SET_CURRENT_PAGE'; payload: number }
    | { type: 'SET_COLUMN_ORDER'; payload: string[] }; 

const initialState: State = {
    tableData: [],
    editedCells: new Set(),
    columnFilters: {},
    currentPage: 1,
    columnOrder: JSON.parse(localStorage.getItem('columnOrder') || '[]'), 
};

const TableContext = createContext<{
    state: State;
    dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

const tableReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_TABLE_DATA':
            return { ...state, tableData: action.payload };
        case 'UPDATE_CELL':
            const newData = [...state.tableData];
            newData[action.payload.rowIndex] = {
                ...newData[action.payload.rowIndex],
                [action.payload.columnId]: action.payload.value,
            };
            return {
                ...state,
                tableData: newData,
                editedCells: new Set(state.editedCells).add(`${action.payload.rowIndex}-${action.payload.columnId}`),
            };
        case 'SAVE_CHANGES':
            localStorage.setItem('tableData', JSON.stringify(state.tableData)); 
            return { ...state, editedCells: new Set() }; 
        case 'SET_COLUMN_FILTERS':
            return { ...state, columnFilters: action.payload };
        case 'SET_CURRENT_PAGE':
            return { ...state, currentPage: action.payload };
        case 'SET_COLUMN_ORDER':
            localStorage.setItem('columnOrder', JSON.stringify(action.payload)); 
            return { ...state, columnOrder: action.payload };
        default:
            return state;
    }
};

export const TableProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(tableReducer, initialState);
    return <TableContext.Provider value={{ state, dispatch }}>{children}</TableContext.Provider>;
};

export const useTableContext = () => useContext(TableContext);