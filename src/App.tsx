import React, { useEffect } from 'react';
import { useFlightInspiration } from './hooks/useFlightInspiration';
import { FlightInspirationForm } from './components/FlightInspirationForm';
import { Pagination } from './components/Pagination';
import { Loader } from './components/Loader';
import { ErrorMessage, Container, HeaderContainer, SaveButton } from './components/StyledComponents';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TableProvider, useTableContext } from './context/TableContext';
import { Table } from './components/Table';
import ErrorBoundary from './components/ErrorBoundary';


const AppContent = () => {
  const { state, dispatch } = useTableContext();
  const { flightData, loading, error, searchFlightInspirations } = useFlightInspiration();
  const itemsPerPage = 6;

  useEffect(() => {
    if (flightData.length > 0) {
      dispatch({ type: 'SET_TABLE_DATA', payload: flightData });
    }
  }, [flightData]);


  const totalPages = Math.ceil(state.tableData.length / itemsPerPage); 

  return (
    <Container>
      {loading && <Loader />}
      <HeaderContainer>
        <FlightInspirationForm onSearch={searchFlightInspirations} loading={loading} />
        <SaveButton
          visible={state.tableData.length > 0}
          onClick={() => {

            dispatch({ type: 'SAVE_CHANGES' });
          }}
        >
          Save Changes
        </SaveButton>
      </HeaderContainer>

      {error && <ErrorMessage role="alert">⚠️ {error}</ErrorMessage>}

      {!loading && state.tableData.length > 0 && (
        <>
          <Table />
          {totalPages > 1 && (
            <Pagination
              currentPage={state.currentPage}
              totalPages={totalPages}
              onPageChange={(page) =>
                dispatch({ type: 'SET_CURRENT_PAGE', payload: page })
              }
            />
          )}
        </>
      )}
    </Container>
  );
};
export default function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ErrorBoundary>
        <TableProvider>
          <AppContent />
        </TableProvider>
      </ErrorBoundary>
    </LocalizationProvider>
  );
}