import { render, screen } from '@testing-library/react';
import App from './App';

test('testing home page rendering', () => {
  render(<App />);
  expect(screen.getByText(/You searched these words today/i)).toBeInTheDocument();
});
