/* import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from '../services/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa funcionalidades da Pokedex.js', () => {
  test('Se a pagina contem a texto "Enconteured pokemons"', () => {
    const { history } = RenderWithRouter(<App />);
    history.push('/');

    const headingPokedex = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    expect(headingPokedex).toBeInTheDocument();
  });

  test('Teste se é exibido o próximo Pokémon da lista quando o botão `Próximo pokémon` é clicado.', () => {
    const { history } = RenderWithRouter(<App />);
    history.push('/');

    const nextPokeButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(nextPokeButton).toBeInTheDocument();
    userEvent.click(nextPokeButton);
  });
}); */
