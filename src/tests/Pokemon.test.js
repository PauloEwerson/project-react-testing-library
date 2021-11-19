import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from '../services/renderWithRouter';

describe('Testa o componente Pokemon.js', () => {
  test('Testa se renderiza um card com as infos de um pokemon', () => {
    renderWithRouter(<App />);

    const pokeName = screen.getByTestId('pokemon-name');
    expect(pokeName).toHaveTextContent(pokemons[0].name);

    const pokeType = screen.getByTestId('pokemon-type');
    expect(pokeType).toHaveTextContent(pokemons[0].type);

    const pokeWeight = screen.getByTestId('pokemon-weight');
    const { value } = pokemons[0].averageWeight;
    const unit = pokemons[0].averageWeight.measurementUnit;
    expect(pokeWeight).toHaveTextContent(`Average weight: ${value} ${unit}`);

    const pokeImg = screen.getAllByRole('img');
    expect(pokeImg[0]).toHaveAttribute('src', pokemons[0].image);
    expect(pokeImg[0]).toHaveAttribute('alt', `${pokemons[0].name} sprite`);
  });

  test('Teste para verificar se contem o link "pokemons/<id>"', () => {
    const { history } = renderWithRouter(<App />);

    const pokeLink = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(pokeLink).toBeInTheDocument();

    userEvent.click(pokeLink);
    const pokeUrl = history.location.pathname;
    expect(pokeUrl).toBe(`/pokemons/${pokemons[0].id}`);
  });

  test('Teste se existe a imagem "estrela" no pokemon favoritado', () => {
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${pokemons[0].id}`);

    const pokeCheckbox = screen.getByRole('checkbox');
    userEvent.click(pokeCheckbox);

    const pokeLink = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    userEvent.click(pokeLink);

    const pokeImg = screen.getByRole('img', {
      name: `${pokemons[0].name} is marked as favorite`,
    });

    expect(pokeImg).toHaveAttribute('src', '/star-icon.svg');
  });
});
