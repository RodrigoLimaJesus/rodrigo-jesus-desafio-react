import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

jest.mock('axios');

describe('Testes para página de busca', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('Os elementos corretos estão em tela', () => {
    render(<App />, { wrapper: BrowserRouter });

    const inputLabel = screen.getByTestId('label-input-username');
    expect(inputLabel).toBeInTheDocument();
    expect(inputLabel.textContent).toBe('Buscar Repositório no github');

    const inputUsername = screen.getByTestId('input-username');
    expect(inputUsername).toBeInTheDocument();

    const submitFormBtn = screen.getByTestId('submit-form-btn');
    expect(submitFormBtn).toBeInTheDocument();
  });

  it('Ao buscar com um nome vazio, é retornado o erro esperado', () => {
    render(<App />, { wrapper: BrowserRouter });
    const message = 'Informe um nome de usuário válido no github.';

    let emptyError = screen.queryByTestId('error-empty-user');
    expect(emptyError).not.toBeInTheDocument();

    const submitFormBtn = screen.getByTestId('submit-form-btn');
    userEvent.click(submitFormBtn);

    emptyError = screen.queryByTestId('error-empty-user');
    expect(emptyError).toBeInTheDocument();
    expect(emptyError.textContent).toBe(message);
  });

  it('Ao buscar com um nome inválido, é retornado o erro esperado', async () => {
    render(<App />, { wrapper: BrowserRouter });
    axios.get.mockImplementation(() => {
      throw new Error('qualquer coisa');
    });

    const message =
      'Usuário não encontrado no github. Verifique se você digitou o nome corretamente.';

    let invalidUserError = screen.queryByTestId('error-empty-user');
    expect(invalidUserError).not.toBeInTheDocument();

    const inputUsername = screen.getByTestId('input-username');

    userEvent.type(inputUsername, 'esseUsuarioNaoExiste');

    const submitFormBtn = screen.getByTestId('submit-form-btn');

    userEvent.click(submitFormBtn);

    invalidUserError = await screen.findByTestId('error-invalid-user');
    expect(invalidUserError).toBeInTheDocument();
    expect(invalidUserError.textContent).toBe(message);
  });

  it('Ao buscar com os dados certos, tem o retorno esperado', async () => {
    render(<App />, { wrapper: BrowserRouter });
    jest
      .spyOn(axios, 'get')
      .mockReturnValueOnce({ userInfo: {} })
      .mockReturnValueOnce({ userRepos: [] });

    const inputUsername = screen.getByTestId('input-username');

    userEvent.type(inputUsername, 'RodrigoLimaJesus');

    const submitFormBtn = screen.getByTestId('submit-form-btn');

    userEvent.click(submitFormBtn);

    await screen.findByTestId('go-back-btn');

    const url = window.location.pathname;
    expect(url).toBe('/detalhes');
  });
});
