import React from 'react'
import App from '../App';
import renderWithRouter from './renderWithRouter';
import userEvent from '@testing-library/user-event';
import testIds from './dataTestIds';

describe('Testando a página de registro', () => {  
  it('verificando se os componentes são renderizados corretamente', async () => {
    const { history, getByTestId } = renderWithRouter(<App />);
    
    const createAccount = getByTestId(testIds.createAccount);
    
    userEvent.click(createAccount)
    const { pathname } = history.location;

    const registerNameInput = getByTestId(testIds.registerNameInput);
    const registerEmailInput = getByTestId(testIds.registerEmailInput);
    const registerPasswordInput = getByTestId(testIds.registerPasswordInput);
    const registerButton = getByTestId(testIds.registerSubmitButton);

    expect(pathname).toBe('/register');
    expect(registerNameInput).toBeInTheDocument();
    expect(registerEmailInput).toBeInTheDocument();
    expect(registerPasswordInput).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  });

  describe('verificando o comportamento da página de registro', () => {
    describe('se os dados estiverem faltando', () => {
      it('nome faltando', async () => {
        const { history, getByTestId } = renderWithRouter(<App />);
        
        const createAccount = getByTestId(testIds.createAccount);
      
        userEvent.click(createAccount)
        const { pathname } = history.location;

        const registerNameInput = getByTestId(testIds.registerNameInput);
        const registerEmailInput = getByTestId(testIds.registerEmailInput);
        const registerPasswordInput = getByTestId(testIds.registerPasswordInput);
        const registerButton = getByTestId(testIds.registerSubmitButton);

        expect(pathname).toBe('/register');

        expect(registerNameInput).toHaveValue('');
        expect(registerEmailInput).toHaveValue('');
        expect(registerPasswordInput).toHaveValue('');
        expect(registerButton).toBeDisabled();

        userEvent.type(registerEmailInput, 'yarpenzigrinsr@anao.com');
        userEvent.type(registerPasswordInput, '123456789');

        expect(registerNameInput).toHaveValue('');
        expect(registerEmailInput).toHaveValue('yarpenzigrinsr@anao.com');
        expect(registerPasswordInput).toHaveValue('123456789');
        
        expect(registerButton).toBeDisabled();
      });
    
      it('e-mail fantando', async () => {
        const { history, getByTestId } = renderWithRouter(<App />);
        
        const createAccount = getByTestId(testIds.createAccount);
      
        userEvent.click(createAccount)
        const { pathname } = history.location;

        const registerNameInput = getByTestId(testIds.registerNameInput);
        const registerEmailInput = getByTestId(testIds.registerEmailInput);
        const registerPasswordInput = getByTestId(testIds.registerPasswordInput);
        const registerButton = getByTestId(testIds.registerSubmitButton);

        expect(pathname).toBe('/register');

        expect(registerNameInput).toHaveValue('');
        expect(registerEmailInput).toHaveValue('');
        expect(registerPasswordInput).toHaveValue('');
        expect(registerButton).toBeDisabled();

        userEvent.type(registerNameInput, 'Yarpen Zigrin Sr');
        userEvent.type(registerPasswordInput, '123456789');

        expect(registerNameInput).toHaveValue('Yarpen Zigrin Sr');
        expect(registerEmailInput).toHaveValue('');
        expect(registerPasswordInput).toHaveValue('123456789');
        
        expect(registerButton).toBeDisabled();
      });

      it('senha faltando', async () => {
        const { history, getByTestId } = renderWithRouter(<App />);
        
        const createAccount = getByTestId(testIds.createAccount);
      
        userEvent.click(createAccount)
        const { pathname } = history.location;

        const registerNameInput = getByTestId(testIds.registerNameInput);
        const registerEmailInput = getByTestId(testIds.registerEmailInput);
        const registerPasswordInput = getByTestId(testIds.registerPasswordInput);
        const registerButton = getByTestId(testIds.registerSubmitButton);

        expect(pathname).toBe('/register');

        expect(registerNameInput).toHaveValue('');
        expect(registerEmailInput).toHaveValue('');
        expect(registerPasswordInput).toHaveValue('');
        expect(registerButton).toBeDisabled();

        userEvent.type(registerNameInput, 'Yarpen Zigrin Sr');
        userEvent.type(registerEmailInput, 'yarpenzigrinsr@anao.com');

        expect(registerNameInput).toHaveValue('Yarpen Zigrin Sr');
        expect(registerEmailInput).toHaveValue('yarpenzigrinsr@anao.com');
        expect(registerPasswordInput).toHaveValue('');
        
        expect(registerButton).toBeDisabled();
      });
    });
  });

  it('verificando se um novo usuário é registrado', async () => {
    const { history, getByTestId } = renderWithRouter(<App />);

    const createAccount = getByTestId(testIds.createAccount);
      
    userEvent.click(createAccount)
    const { pathname } = history.location;

    const response = {
      "data": {
        "name": "Yarpen Zigrin Sr",
        "email": "yarpenzigrinsr@anao.com",
        "userId": "622f4716ab2d9822ba41eb6c"
      }
    }

    const registerNameInput = getByTestId(testIds.registerNameInput);
    const registerEmailInput = getByTestId(testIds.registerEmailInput);
    const registerPasswordInput = getByTestId(testIds.registerPasswordInput);
    const registerButton = getByTestId(testIds.registerSubmitButton);

    expect(pathname).toBe('/register');

    expect(registerNameInput).toHaveValue('');
    expect(registerEmailInput).toHaveValue('');
    expect(registerPasswordInput).toHaveValue('');
    expect(registerButton).toBeDisabled();

    userEvent.type(registerNameInput, 'Yarpen Zigrin Sr');
    userEvent.type(registerEmailInput, 'yarpenzigrinsr@anao.com');
    userEvent.type(registerPasswordInput, '123456789');

    expect(registerNameInput).toHaveValue('Yarpen Zigrin Sr');
    expect(registerEmailInput).toHaveValue('yarpenzigrinsr@anao.com');
    expect(registerPasswordInput).toHaveValue('123456789');
    
    expect(registerButton).toBeEnabled();

    jest.spyOn(global, 'fetch');

    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(history.push('/login')),
    });

    userEvent.click(registerButton)
    jest.clearAllMocks();

    const currentPathname = history.location.pathname

    expect(currentPathname).toBe('/login');
  });
});