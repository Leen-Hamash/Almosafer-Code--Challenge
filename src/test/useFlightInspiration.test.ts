import { renderHook, waitFor } from '@testing-library/react';
import { useFlightInspiration } from '../hooks/useFlightInspiration';
import { fetchFlightInspirations } from '../services/api';

jest.mock('../services/api');

describe('useFlightInspiration', () => {
  it('fetches flight data', async () => {

    (fetchFlightInspirations as jest.Mock).mockResolvedValue([
      { origin: 'NYC', destination: 'LON', price: '500' }
    ]);

    const { result } = renderHook(() => useFlightInspiration());


    await waitFor(() => {
      expect(result.current.flightData).toEqual([
        { origin: 'NYC', destination: 'LON', price: '500' }
      ]);
    });
  });
});