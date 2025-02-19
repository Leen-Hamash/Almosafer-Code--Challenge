import { render } from '@testing-library/react';
import App from '../App';


jest.mock('../components/Loader', () => ({
  Loader: () => <div role="progressbar">Loading...</div>,
}));

describe('App', () => {
  it('renders loading state', () => {
    render(<App />);
  });
});