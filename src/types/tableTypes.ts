import { ReactNode } from "react";

export interface TableData {
  [key: string]: string;
}

export interface PaginationInterface {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
export interface DateCellInterface {
  value: string;
  onChange: (value: string) => void;
}
export interface FlightInspirationFormInterface {
  onSearch: (cityCode: string, date: string) => void;
  loading: boolean;
}

export type TableProviderProps = {
  children: React.ReactNode;
};
export interface DataErrorInterface {
  response?: {
    data?: {
      errors?: { title: string; detail: string }[];
    };
  };
  message?: string;
}
export interface DateCellInterface {
  value: string;
  onChange: (value: string) => void;
}
export interface ErrorBoundaryInterface {
  children: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}