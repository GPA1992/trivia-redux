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

// setei o local storage no teste
//
describe('Testando a página Game e seus respectivos componentes', () => {
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

  it('verifica se redireciona para tela de login quando não possui token', async () => {
    global.localStorage.clear();
    jest.restoreAllMocks();

    global.localStorage.setItem('token', invalidTokenResponse.token);

    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(invalidTokenQuestionsResponse),
    });

    const { history } = renderWithRouterAndRedux(
      <App />,
      initialState,
      '/game'
    );
    await waitFor(() => {
      const { pathname } = history.location;
      expect(pathname).toBe('/');
    });
  });

  it('verifica se a borda muda para verde quando clicado numa pergunta correta', async () => {
    renderWithRouterAndRedux(<App />, initialState, '/game');

    const allBtns = await screen.findAllByRole('button');
    // * primeira pergunta é verdadeiro ou falso
    expect(allBtns).toHaveLength(2);

    const correctBtn = await screen.findByTestId('correct-answer');
    expect(correctBtn).toBeInTheDocument();
    userEvent.click(correctBtn);
    expect(correctBtn.className).toBe('correct__answer');

    const nextQuestionBtn = await screen.findByTestId('btn-next');
    expect(nextQuestionBtn).toBeInTheDocument();
    userEvent.click(nextQuestionBtn);
  });

  it('verifica se a borda muda para vermerlho quando clicado numa pergunta incorreta', async () => {
    renderWithRouterAndRedux(<App />, initialState, '/game');

    const allBtns = await screen.findAllByRole('button');
    // * primeira pergunta é verdadeiro ou falso
    expect(allBtns).toHaveLength(2);

    const wrongBtn = await screen.findByTestId('wrong-answer-0');
    expect(wrongBtn).toBeInTheDocument();
    userEvent.click(wrongBtn);
    expect(wrongBtn.className).toBe('wrong__answer');
  });
});
