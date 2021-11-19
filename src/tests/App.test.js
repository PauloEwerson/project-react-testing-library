import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Testa o component App.js', () => {
  test('Testa os links do App.js', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', {
      name: /home/i,
    });
    expect(homeLink).toBeInTheDocument();
    userEvent.click(homeLink);

    const homePath = history.location.pathname;
    expect(homePath).toBe('/');

    const aboutLink = screen.getByRole('link', {
      name: /about/i,
    });
    expect(aboutLink).toBeInTheDocument();
    userEvent.click(aboutLink);

    const aboutPath = history.location.pathname;
    expect(aboutPath).toBe('/about');

    const favoriteLink = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    expect(favoriteLink).toBeInTheDocument();
    userEvent.click(favoriteLink);

    const favoritePath = history.location.pathname;
    expect(favoritePath).toBe('/favorites');

    history.push('/pagina-desconhecida');
    const notFound = screen.getByText('Page requested not found');
    expect(notFound).toBeInTheDocument();
  });
});
