import React from 'react'
import { render } from '@testing-library/react'
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testando a página de login', () => {
  it('verificando se os componentes são renderizados de corretamente', async () => {
    const { history } = renderWithRouter(<App />);
  });
});