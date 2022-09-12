import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { tokenResponse } from '../../cypress/mocks/token';
import { questionsResponse } from '../../cypress/mocks/questions';

const initialState = {
  player: {
    name: 'Player Name',
    gravatarEmail: 'player@email.com',
    score: 100,
    assertions: 4,
    gravatarImg: '',
    didAnswer: false,
  },
};

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
    // global.localStorage.setItem('ranking', rankingLocalStorage.ranking);

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(questionsResponse),
    });
  });

  it('testa se ao clicar em Sair, o usuário é redirecionado à tela de Login', () => {
    const { history } = renderWithRouterAndRedux(
      <App />,
      initialState,
      '/ranking'
    );

    const backHomeBtn = screen.getByTestId('btn-go-home');
    expect(backHomeBtn).toBeInTheDocument();
    userEvent.click(backHomeBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('testa se existem dois jogadores no ranking', async () => {
    const { history } = renderWithRouterAndRedux(
      <App />,
      initialState,
      '/game'
    );

    let correctBtn = await screen.findByTestId('correct-answer');
    expect(correctBtn).toBeInTheDocument();
    userEvent.click(correctBtn);

    let nextQuestionBtn = await screen.findByText('Next');
    expect(nextQuestionBtn).toBeInTheDocument();
    userEvent.click(nextQuestionBtn);

    correctBtn = await screen.findByTestId('correct-answer');
    expect(correctBtn).toBeInTheDocument();
    userEvent.click(correctBtn);
    nextQuestionBtn = await screen.findByText('Next');
    expect(nextQuestionBtn).toBeInTheDocument();
    userEvent.click(nextQuestionBtn);

    correctBtn = await screen.findByTestId('correct-answer');
    expect(correctBtn).toBeInTheDocument();
    userEvent.click(correctBtn);
    nextQuestionBtn = await screen.findByText('Next');
    expect(nextQuestionBtn).toBeInTheDocument();
    userEvent.click(nextQuestionBtn);

    correctBtn = await screen.findByTestId('correct-answer');
    expect(correctBtn).toBeInTheDocument();
    userEvent.click(correctBtn);
    nextQuestionBtn = await screen.findByText('Next');
    expect(nextQuestionBtn).toBeInTheDocument();
    userEvent.click(nextQuestionBtn);

    correctBtn = await screen.findByTestId('correct-answer');
    expect(correctBtn).toBeInTheDocument();
    userEvent.click(correctBtn);
    const Feedback = await screen.findByText('Feedback');
    expect(Feedback).toBeInTheDocument();
    userEvent.click(Feedback);

    let { pathname } = history.location;
    expect(pathname).toBe('/feedback');

    const playAgainBtn = screen.getByTestId('btn-ranking');
    expect(playAgainBtn).toBeInTheDocument();
    userEvent.click(playAgainBtn);

    pathname  = history.location.pathname;
    expect(pathname).toBe('/ranking');

    const player1 = screen.getByTestId('player-score-0');
    const player2 = screen.getByTestId('player-score-1');

    expect(player1).toBeInTheDocument()
    expect(player2).toBeInTheDocument()

  });
});
