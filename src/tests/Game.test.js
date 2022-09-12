import React from 'react';
import { screen, cleanup } from '@testing-library/react';
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
  }
}


// setei o local storage no teste
//
describe('Testando a página Game e seus respectivos componentes', () => {
  beforeEach(() => {
    cleanup()

    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      clear: jest.fn()
    };

    global.localStorage = localStorageMock;

    localStorage.setItem('token', tokenResponse.token);

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(questionsResponse),
    });
  });

  it('verifica se a tela de Game existe', async () => {
    const { history } = renderWithRouterAndRedux(
      <App />,
      initialState,
      '/game'
    );

    const { pathname } = history.location;
    expect(pathname).toBe('/game');
    const teste = await screen.findByTestId('question-category');
    expect(teste).toBeInTheDocument();
  });

  // it('verifica se redireciona para tela de login quando não possui token', async () => {
  //   localStorage.clear();
  //   localStorage.setItem('token', invalidTokenResponse.token);

  //   jest.spyOn(global, 'fetch').mockResolvedValueOnce({
  //     json: jest.fn().mockResolvedValueOnce(invalidTokenQuestionsResponse),
  //   });

  //   const { history } = renderWithRouterAndRedux(
  //     <App />,
  //     initialState,
  //     '/game'
  //   );

  //   const { pathname } = history.location;
  //   expect(pathname).toBe('/');

  // })

});

