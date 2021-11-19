import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa o componente FavoritePokemons.js', () => {
  test('Verificar mensagem se nao ha pokemon favoritado', () => {
    render(<FavoritePokemons />);

    const text = screen.getByText('No favorite pokemon found');

    expect(text).toBeInTheDocument();
  });
  test('Testa se é exibido card de um pokemon favoritado', () => {
    const { history } = renderWithRouter(<App />);

    history.push(`/pokemons/${pokemons[0].id}`);

    const pokeCheckbox = screen.getByRole('checkbox', {
      name: /pokémon favoritado/i,
    });
    userEvent.click(pokeCheckbox);

    const favoriteLink = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    userEvent.click(favoriteLink);

    const pokeName = screen.getByText(/pikachu/i);
    expect(pokeName).toBeInTheDocument();
  });
});
