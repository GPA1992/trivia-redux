import React from 'react';
import { screen, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import triviaAPI from '../services/triviaAPI';
import { tokenResponse, invalidTokenResponse } from '../../cypress/mocks/token';
import {
  questionsResponse,
  invalidTokenQuestionsResponse,
} from '../../cypress/mocks/questions';

const initialState = {
  player: {
    name: 'Player Name',
    gravatarEmail: 'player@email.com',
    score: 0,
    assertions: 0,
    gravatarImg: '',
    didAnswer: false,
  },
};

describe('Testando a página Settings e seus respectivos componentes', () => {
  beforeEach(() => {
    cleanup();

    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      clear: jest.fn(),
    };

    global.localStorage = localStorageMock;

    global.localStorage.setItem('token', tokenResponse.token);

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(questionsResponse),
    });
  });

  it('Testa se o botão de retornar á página principal funciona', () => {
    const { history } = renderWithRouterAndRedux(
      <App />,
      initialState,
      '/settings'
    );

    const backHomeBtn = screen.getByTestId('btn-go-home2');
    expect(backHomeBtn).toBeInTheDocument();
    userEvent.click(backHomeBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  })

  it('Testa se o botão de Limpar Ranking funciona', () => {
    renderWithRouterAndRedux(
      <App />,
      initialState,
      '/settings'
    );

    const clearRankingBtn = screen.getByTestId('clear-Ranking');
    expect(clearRankingBtn).toBeInTheDocument();
    userEvent.click(clearRankingBtn);
    expect(localStorage.length).toBe(0);
    
  })
});