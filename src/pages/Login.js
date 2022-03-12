import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [disable, setDisable] = useState(true);

  function handleChanges(event, setState, setValid) {
    const { value } = event.target;
    setState(value);
    if (event.target.checkValidity() === true) setValid(true);
  }

  return (
    <section>
      <label htmlFor="login-email-input">
        Email
        <input
          type="email"
          placeholder="exemplo@exemplo.com"
          id="login-email-input"
          data-testid="login-email-input"
          value={ email }
          onChange={ (e) => handleChanges(e, setEmail, setValidEmail) }
          pattern="/\S+@\S+\.\S+/"
        />
      </label>
      <label htmlFor="login-password-input">
        Senha
        <input
          type="password"
          placeholder="min 6 dígitos"
          id="login-password-input"
          data-testid="login-password-input"
          value={ password }
          onChange={ (e) => handleChanges(e, setPassword, setValidPassword) }
          pattern=".{6,}"
        />
      </label>
      <button
        type="button"
        disabled={ disable }
        data-testid="login-button-input"
      >
        Entrar
      </button>
      <Link to="/register" data-testid="create-account">
        Ainda não tem uma conta? Registre-se aqui
      </Link>
    </section>
  );
}

export default Login;
