import { render, screen } from '@testing-library/react';
import PluginDashboard from './App';

test('renders learn react link', () => {
  render(<PluginDashboard />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
