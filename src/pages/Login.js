import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <section>
      <label htmlFor="login-email-input">
        Email
        <input
          type="email"
          placeholder="exemplo@exemplo.com"
          id="login-email-input"
          data-testid="login-email-input"
        />
      </label>
      <label htmlFor="login-password-input">
        Senha
        <input
          type="password"
          placeholder="min 6 dígitos"
          id="login-password-input"
          data-testid="login-password-input"
        />
      </label>
      <button type="button" disabled data-testid="login-button-input">
        Entrar
      </button>
      <Link to="/register" data-testid="create-account">
        Ainda não tem uma conta? Registre-se aqui
      </Link>
    </section>
  );
}

export default Login;
