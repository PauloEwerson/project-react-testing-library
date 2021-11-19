import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa o componente PokemonsDetails.js', () => {
  test('Testa informaçoes detalhadas do Pokemon na tela', () => {
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${pokemons[0].id}`);

    const pokeNameHeading = screen.getByRole('heading', {
      name: `${pokemons[0].name} Details`,
      level: 2,
    });
    expect(pokeNameHeading).toBeInTheDocument();

    const summaryHeading = screen.getByRole('heading', {
      name: 'Summary',
      level: 2,
    });
    expect(summaryHeading).toBeInTheDocument();

    const pokeDetails = screen.getByText(`${pokemons[0].summary}`);
    expect(pokeDetails).toBeInTheDocument();
  });

  test('Testa se existe mapas com localização do pokémon', () => {
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${pokemons[0].id}`);

    const locationHeading = screen.getByRole('heading', {
      name: `Game Locations of ${pokemons[0].name}`,
      level: 2,
    });
    expect(locationHeading).toBeInTheDocument();

    const pokeLocation = [];
    pokemons[0].foundAt.map((pokemon) => {
      pokeLocation.push(pokemon);
      return pokeLocation;
    });
    pokeLocation.forEach((poke) => {
      const location = screen.getByText(poke.location);
      expect(location).toBeInTheDocument();
    });

    const pokesImg = screen.getAllByAltText(`${pokemons[0].name} location`);
    pokemons[0].foundAt.forEach((pokemon, index) => {
      expect(pokesImg[index]).toHaveAttribute('src', pokemon.map);
      expect(pokesImg[index]).toHaveAttribute('alt', `${pokemons[0].name} location`);
    });
  });

  test('Testa se o usuario consegue favoritar o Pokemon', () => {
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${pokemons[0].id}`);

    const pokeLabel = screen.getByLabelText('Pokémon favoritado?');
    expect(pokeLabel).toBeInTheDocument();

    const pokeCheckbox = screen.getByRole('checkbox', {
      name: /pokémon favoritado?/i,
    });
    userEvent.click(pokeCheckbox);
    const pokeFavorite = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    userEvent.click(pokeFavorite);

    const pikachuName = screen.getByText('Pikachu');
    expect(pikachuName).toBeInTheDocument();

    const pokeDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(pokeDetails);
    userEvent.click(pokeCheckbox);
    userEvent.click(pokeFavorite);

    expect(pikachuName).not.toBeInTheDocument();
  });
});
