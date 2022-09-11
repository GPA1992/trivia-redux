import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import tokenAPI from '../services/tokenAPI';
import triviaAPI from '../services/triviaAPI';
import { tokenResponse, invalidTokenResponse } from '../../cypress/mocks/token';
import {
  questionsResponse,
  invalidTokenQuestionsResponse,
} from '../../cypress/mocks/questions';

describe('Testando a página Game e seus respectivos componentes', () => {
  beforeEach(cleanup);
  it('verifica se a tela de Game existe', async () => {
    const mockedToken = tokenResponse.token;

    const { history } = renderWithRouterAndRedux(
      <App />,
      {
        player: {
          name: '',
          assertions: 0,
          score: 0,
          gravatarEmail: '',
          gravatarImg: '',
          didAnswer: false,
        },
      },
      '/game'
    );

    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(questionsResponse.results),
    });

    await triviaAPI(mockedToken);

    expect(global.fetch).toBeCalled();

    const { pathname } = history.location;
    expect(pathname).toBe('/game');

    const textTypeQuestions = screen.findByText('Geography');
  });
});
