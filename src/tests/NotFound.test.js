import { render, screen } from '@testing-library/react';
import React from 'react';
import NotFound from '../components/NotFound';

test('Testes na pagina NotFound.js', () => {
  render(<NotFound />);

  const headerNotFound = screen.getByRole('heading', {
    name: /page requested not found/i,
    level: 2,
  });
  expect(headerNotFound).toBeInTheDocument();

  const imageNotFound = screen.getAllByRole('img');
  expect(imageNotFound[1]).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
