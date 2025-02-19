import { TableData } from "../types/tableTypes";

export const getAccessToken = async () => {
  const response = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: process.env.REACT_APP_API_KEY || '',
      client_secret: process.env.REACT_APP_API_SECRET || '',
    }),
  });

  const data = await response.json();
  return data.access_token;
};

export const fetchFlightInspirations = async (cityCode: string, date: string): Promise<TableData[]> => {
  const accessToken = await getAccessToken();
  const response = await fetch(`https://test.api.amadeus.com/v1/shopping/flight-destinations?origin=${cityCode}&departureDate=${date}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();
  return data.data.map((flight: any) => ({
    type: flight.type,
    origin: flight.origin,
    destination: flight.destination,
    departureDate: flight.departureDate,
    returnDate: flight.returnDate,
    price: flight.price.total,
    links: JSON.stringify(flight.links.flightDates),
  })) as TableData[];
};