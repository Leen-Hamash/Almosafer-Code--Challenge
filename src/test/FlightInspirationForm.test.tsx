import { render, screen, fireEvent } from '@testing-library/react';
import { FlightInspirationForm } from '../components/FlightInspirationForm';

describe('FlightInspirationForm', () => {
  it('validates form inputs', () => {
    render(<FlightInspirationForm onSearch={jest.fn()} loading={false} />);
    
    fireEvent.click(screen.getByText('Search'));
    

    const cityInput = screen.getByTestId('city-code-input');
    const dateInput = screen.getByTestId('date-picker-input');
    

  });
});