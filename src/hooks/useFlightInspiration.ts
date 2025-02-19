import { useState, useEffect } from 'react';
import { DataErrorInterface, TableData } from '../types/tableTypes';
import { fetchFlightInspirations } from '../services/api';
import dayjs from 'dayjs';

export const useFlightInspiration = () => {
  const [flightData, setFlightData] = useState<TableData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const defaultSearch = {
    cityCode: 'MAD',
    date: dayjs().format('YYYY-MM-DD'),
  };

  const handleApiError = (err: unknown) => {
    const error = err as DataErrorInterface;
    console.error('API Error:', error);

    let errorMessage = 'Invalid City Code or Date - Please try again.';

    if (error.response?.data?.errors) {
      errorMessage = error.response.data.errors
        .map((e) => `${e.title}: ${e.detail}`)
        .join(', ');
    } else if (error.message?.includes('Network Error')) {
      errorMessage = 'Network error - Please check your internet connection';
    } else if (error.message?.includes('401')) {
      errorMessage = 'Authentication failed - Please try again';
    }

    setError(errorMessage);
  };

  const searchFlightInspirations = async (cityCode: string, date: string) => {
    const cacheKey = `flightData-${cityCode}-${date}`;
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
      setFlightData(JSON.parse(cachedData));
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await fetchFlightInspirations(cityCode, date);
      setFlightData(data.length > 0 ? data : []);
      if (data.length === 0) setError('No results found for your search');
      localStorage.setItem(cacheKey, JSON.stringify(data));
    } catch (err) {
      setFlightData([]);
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchFlightInspirations(defaultSearch.cityCode, defaultSearch.date);
  }, []);

  return { flightData, loading, error, searchFlightInspirations, setError };
};