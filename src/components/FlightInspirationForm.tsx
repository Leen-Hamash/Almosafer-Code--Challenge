import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';
import { styled } from '@mui/material/styles';
import { FlightInspirationFormInterface } from '../types/tableTypes';

const FormContainer = styled('div')`
  background: #f5f5f5;
  border-radius: 8px;
  padding: 20px;
  width: 100%;
  max-width: 600px;
  @media (max-width: 768px) {
    padding: 10px;
  max-width: -webkit-fill-available;
  }
`;

const Input = styled('input')`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 15px;
  border-color: ${({ required }) => (required ? 'red' : '#ddd')};

  @media (max-width: 768px) {
    width: auto;
  }
`;

const Button = styled('button')`
  padding: 8px 16px;
  background: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
  margin: 0 15px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;


  &:hover {
    background: #1565c0;
  }
`;

const StyledDatePicker = styled(DatePicker)({
  '& .MuiInputBase-input': {
    padding: '5px',
    background: 'transparent',
    cursor: 'pointer',
    backgroundColor: 'white',
  },
  '& .MuiInputBase-root': {
    '&:before, &:after': {
      display: 'none',
    },
  },
});

export const FlightInspirationForm: React.FC<FlightInspirationFormInterface> = ({ onSearch, loading }) => {
  const [cityCode, setCityCode] = useState('');
  const [date, setDate] = useState<Dayjs | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cityCode && date) {
      onSearch(cityCode, date.format('YYYY-MM-DD'));
    }
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit} className="display-flex">
        <Input
          data-testid="city-code-input"
          aria-label="City code (3-letter IATA)"
          placeholder="City Code"
          required
          type="text"
          value={cityCode}
          onChange={(e) => setCityCode(e.target.value)}
          maxLength={3}
          pattern="[A-Za-z]{3}"
          title="3-letter city code"
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StyledDatePicker
            value={date}
            onChange={(newDate) => setDate(newDate)}
            disablePast
            slotProps={{
              textField: {
                size: "small",
                error: !date,
                required: true,
                inputProps: {
                  'data-testid': 'date-picker-input',
                },
              },
            }}
          />
        </LocalizationProvider>

        <Button type="submit" disabled={loading} aria-label="Search flights">
          Search
        </Button>
      </form>
    </FormContainer>
  );
};
