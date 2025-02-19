import { render, screen } from '@testing-library/react';
import { Table } from '../components/Table';
import { TableProvider } from '../context/TableContext';

const mockData = [
  { origin: 'NYC', destination: 'LON', price: '500' },
  { origin: 'PAR', destination: 'BER', price: '300' }
];

describe('Table', () => {
  it('renders table headers and data', () => {
    render(
      <TableProvider>
        <Table />
      </TableProvider>
    );

    screen.debug();

  });
});