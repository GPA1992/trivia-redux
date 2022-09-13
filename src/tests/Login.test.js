import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import tokenAPI from '../services/tokenAPI';
import triviaAPI from '../services/triviaAPI';
import { tokenResponse, invalidTokenResponse } from '../../cypress/mocks/token';
import { questionsResponse, invalidTokenQuestionsResponse } from '../../cypress/mocks/questions'

const VALID_NAME = 'narutinho';
const INVALID_EMAIL = 'naruto@...';
const VALID_EMAIL = 'naruto@naruto.com';

describe(' Testando a Página Login e seus respectivos componentes', () => {
  beforeEach(cleanup);

  it(' Verifica se a tela de login existe', () => {
    renderWithRouterAndRedux(<App />);

    const inputName = screen.getByPlaceholderText(/Name/i);
    const inputEmail = screen.getByPlaceholderText(/E-mail/i);
    const playBtn = screen.getByRole('button', {
      name: /Play/i,
    });
    const configBtn = screen.getByRole('button', {
      name: /configurações/i,
    });

    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(playBtn).toBeInTheDocument();
    expect(configBtn).toBeInTheDocument();
  });

  it('Verifica se ao renderizar a página, o botão PLAY está desabilitado', () => {
    renderWithRouterAndRedux(<App />);
    const playBtn = screen.getByRole('button', {
      name: /Play/i,
    });

    expect(playBtn).toBeDisabled();
  });

  it('Verifica se ao digitar um nome e email válido, o botão é habilitado', () => {
    renderWithRouterAndRedux(<App />);
    const inputName = screen.getByPlaceholderText(/Name/i);
    const inputEmail = screen.getByPlaceholderText(/E-mail/i);
    const playBtn = screen.getByRole('button', {
      name: /Play/i,
    });

    userEvent.type(inputName, VALID_NAME);
    userEvent.type(inputEmail, VALID_EMAIL);
    expect(playBtn).not.toBeDisabled();
  });

  it('Verifica se ao clicar em "configurações", é direcionado à página "/settings" ', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const ConfigBtn = screen.getByRole('button', {
      name: /configurações/i,
    });
    userEvent.click(ConfigBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/settings');
  });

  it('verifica se ao em "play", é adicionado uma chave token na localStorage e o usuário é redirecionado à página "/game"', async () => {
    const mockedToken = tokenResponse.token;
    const { history } = renderWithRouterAndRedux(<App />);

    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(questionsResponse),
    });

    const inputName = screen.getByPlaceholderText(/Name/i);
    const inputEmail = screen.getByPlaceholderText(/E-mail/i);
    const playBtn = screen.getByRole('button', {
      name: /Play/i,
    });
    
    userEvent.type(inputName, VALID_NAME);
    userEvent.type(inputEmail, VALID_EMAIL);
    userEvent.click(playBtn);
    await triviaAPI(mockedToken);

    const { pathname } = history.location;


    expect(pathname).toBe('/game');
    expect(global.fetch).toBeCalled()
  });
});
