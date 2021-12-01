import { render, screen } from '@testing-library/react';
import App from './app/App';

test('App test', () => {
  render(<App />);
  const linkElement = screen.getByText('Phone Book');
  expect(linkElement).toBeInTheDocument();
});
