import React from 'react'
import { screen } from '@testing-library/react'
import App from '../App';
import renderWithRouter from './renderWithRouter';
import userEvent from '@testing-library/user-event';

describe('Testando a página de login', () => {
  const { history, findByTestId } = renderWithRouter(<App />);
  const { pathname } = history.location;

  const loginEmailInput = findByTestId('login-email-input');
  const loginPasswordInput = findByTestId('login-password-input');
  const loginButton = findByTestId('login-submit-button');
  const createAccount = findByTestId('create-account');  
  
  it('verificando se os componentes são renderizados corretamente', async () => {
    expect(pathname).toBe('/login');

    expect(loginEmailInput).toBeInTheDocument();
    expect(loginPasswordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(createAccount).toBeInTheDocument();
  });

  it('verificando o comportamento da página de login', async () => {
    expect(pathname).toBe('/login');

    expect(loginEmailInput).toHaveValue('');
    expect(loginPasswordInput).toHaveValue('');
    expect(loginButton).toBeDisable();

    userEvent.type(loginEmailInput, 'yarpenzigrin@anao.com');
    userEvent.type(loginPasswordInput, '123456789');

    expect(loginEmailInput).toHaveValue('yarpenzigrin@anao.com');
    expect(loginPasswordInput).toHaveValue('123456789');
    expect(loginButton).not.toBeDisable();

    userEvent.click(loginButton);

    expect(loginEmailInput).toHaveValue('');
    expect(loginPasswordInput).toHaveValue('');
    expect(loginButton).toBeDisable();

    const nonExistentUser = await findByTestId('non-existent-user');

    expect(nonExistentUser).toBeInTheDocument();
  });

  it('verificando se a aplicação é redirecionada para a página de registro ao clicar no botão de criar um novo usuário', async () => {
    expect(pathname).toBe('/login');

    userEvent.click(createAccount);

    const currentPathname = history.location.pathname

    expect(currentPathname).toBe('/register');
  });
});