import { render, screen } from '@testing-library/react';
import App from './App';

test('renders timer screen', () => {
  render(<App />);
  const linkElement = screen.getByText('Start')
  expect(linkElement).toBeInTheDocument();
});

test('timer is set to 0', () => {
  const { getByTestId } = render(<App/>);
  expect(getByTestId('timer')).toHaveTextContent(0);
});