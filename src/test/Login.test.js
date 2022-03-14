import React from 'react'
import App from '../App';
import renderWithRouter from './renderWithRouter';
import userEvent from '@testing-library/user-event';
import testIds from './dataTestIds';

describe('Testando a página de login', () => {  
  it('verificando se os componentes são renderizados corretamente', async () => {
    const { history, getByTestId } = renderWithRouter(<App />);
    const { pathname } = history.location;

    const loginEmailInput = getByTestId(testIds.loginEmailInput);
    const loginPasswordInput = getByTestId(testIds.loginPasswordInput);
    const loginButton = getByTestId(testIds.loginSubmitButton);
    const createAccount = getByTestId(testIds.createAccount);

    expect(pathname).toBe('/login');
    expect(loginEmailInput).toBeInTheDocument();
    expect(loginPasswordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(createAccount).toBeInTheDocument();
  });

  describe('verificando o comportamento da página de login', () => {
    it('se o usuário não estiver cadastrado', async () => {
      const { history, getByTestId, findByTestId } = renderWithRouter(<App />);
      const { pathname } = history.location;

      const loginEmailInput = getByTestId(testIds.loginEmailInput);
      const loginPasswordInput = getByTestId(testIds.loginPasswordInput);
      const loginButton = getByTestId(testIds.loginSubmitButton);

      expect(pathname).toBe('/login');

      expect(loginEmailInput).toHaveValue('');
      expect(loginPasswordInput).toHaveValue('');
      expect(loginButton).toBeDisabled();

      userEvent.type(loginEmailInput, 'yarpenzigrinsr@anao.com');
      userEvent.type(loginPasswordInput, '123456789');

      expect(loginEmailInput).toHaveValue('yarpenzigrinsr@anao.com');
      expect(loginPasswordInput).toHaveValue('123456789');
      
      expect(loginButton).toBeEnabled();

      userEvent.click(loginButton);

      const nonExistentUser = await findByTestId(testIds.incorretEmailOrPassword);

      expect(nonExistentUser).toBeInTheDocument();
      expect(loginEmailInput).toHaveValue('');
      expect(loginPasswordInput).toHaveValue('');
      expect(loginButton).toBeDisabled();
    });

    describe('se os dados estiverem faltando', () => {
      it('e-mail fantando', async () => {
        const { history, getByTestId } = renderWithRouter(<App />);
        const { pathname } = history.location;

        const loginEmailInput = getByTestId(testIds.loginEmailInput);
        const loginPasswordInput = getByTestId(testIds.loginPasswordInput);
        const loginButton = getByTestId(testIds.loginSubmitButton);

        expect(pathname).toBe('/login');
        
        expect(loginEmailInput).toHaveValue('');
        expect(loginPasswordInput).toHaveValue('');
        expect(loginButton).toBeDisabled();

        userEvent.type(loginPasswordInput, '123456789');

        expect(loginEmailInput).toHaveValue('');
        expect(loginPasswordInput).toHaveValue('123456789');
        
        expect(loginButton).toBeDisabled();
      });

      it('senha faltando', async () => {
        const { history, getByTestId } = renderWithRouter(<App />);
        const { pathname } = history.location;

        const loginEmailInput = getByTestId(testIds.loginEmailInput);
        const loginPasswordInput = getByTestId(testIds.loginPasswordInput);
        const loginButton = getByTestId(testIds.loginSubmitButton);

        expect(pathname).toBe('/login');

        expect(loginEmailInput).toHaveValue('');
        expect(loginPasswordInput).toHaveValue('');
        expect(loginButton).toBeDisabled();

        userEvent.type(loginEmailInput, 'yarpenzigrinsr@anao.com');

        expect(loginEmailInput).toHaveValue('yarpenzigrinsr@anao.com');
        expect(loginPasswordInput).toHaveValue('');
        
        expect(loginButton).toBeDisabled();
      });
    });
  });

  it('verificando se a aplicação é redirecionada para a página de registro ao clicar no botão de criar um novo usuário', async () => {
    const { history, getByTestId } = renderWithRouter(<App />);
    const { pathname } = history.location;

    const createAccount = getByTestId(testIds.createAccount);  

    expect(pathname).toBe('/login');

    userEvent.click(createAccount);

    const currentPathname = history.location.pathname

    expect(currentPathname).toBe('/register');
  });
});