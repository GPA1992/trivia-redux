import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { tokenResponse } from '../../cypress/mocks/token';
import {
  questionsResponse,
} from '../../cypress/mocks/questions';

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

  it('testa se o numero de acertos for maior ou igual a 3, a mensagem será:"Well Done!" ', () => {
    renderWithRouterAndRedux(<App />, initialState, '/feedback');

    const endMsg = screen.getByRole('heading', {
      level: 1,
      name: /Well Done!/i,
    });
    const totalScore = screen.getByTestId('feedback-total-score');
    const totalAssertions = screen.getByTestId('feedback-total-question');

    expect(totalScore).toBeInTheDocument();
    expect(totalScore.textContent).toBe('100');
    expect(totalAssertions).toBeInTheDocument();
    expect(totalAssertions).toHaveTextContent('4');
    expect(endMsg).toBeInTheDocument();
  });

  it('testa se o numero de acertos for menor que 3, a mensagem será:"Could be better.." ', () => {
    jest.resetAllMocks();

    const initialState = {
      player: {
        name: 'Player Name',
        gravatarEmail: 'player@email.com',
        score: 10,
        assertions: 2,
        gravatarImg: '',
        didAnswer: false,
      },
    };

    renderWithRouterAndRedux(<App />, initialState, '/feedback');

    const endMsg = screen.getByRole('heading', {
      level: 1,
      name: /Could be better.../i,
    });
    const totalScore = screen.getByTestId('feedback-total-score');
    const totalAssertions = screen.getByTestId('feedback-total-question');

    expect(totalScore).toBeInTheDocument();
    expect(totalScore.textContent).toBe('10');
    expect(totalAssertions).toBeInTheDocument();
    expect(totalAssertions).toHaveTextContent('2');
    expect(endMsg).toBeInTheDocument();
  });

  it('testa se ao clicar em "Play Again", usuário é redirecionado para a página de login e o Score é zerado ', () => {
    const { history } = renderWithRouterAndRedux(
      <App />,
      initialState,
      '/feedback'
    );

    const playAgainBtn = screen.getByTestId('btn-play-again');
    expect(playAgainBtn).toBeInTheDocument();
    userEvent.click(playAgainBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('testa se ao clicar em "Ranking", usuário é redirecionado para a página de ranking e o Score é armazenado ', () => {
    const { history } = renderWithRouterAndRedux(
      <App />,
      initialState,
      '/feedback'
    );

    const playAgainBtn = screen.getByTestId('btn-ranking');
    expect(playAgainBtn).toBeInTheDocument();
    userEvent.click(playAgainBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/ranking');
  });
});
