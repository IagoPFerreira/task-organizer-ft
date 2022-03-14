import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disable, setDisable] = useState(true);
  const [loginError, setLoginError] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const regex = /\S+@\S+\.\S+/;
    const passwordMinLength = 6;
    if (regex.test(email) && password.length >= passwordMinLength) setDisable(false);
    else setDisable(true);
  }, [email, password]);

  function handleClick() {
    const request = async () => {
      console.log('entrei');
      try {
        await axios.post('http://localhost:8080/login', { email, password }).then(({ data }) => localStorage.setItem('tasks-organizer', data.token));
        history.push('/tasks');
      } catch (e) {
        setEmail('');
        setPassword('');
        setLoginError(true);
      }
    };
    request();
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
          onChange={ ({ target }) => setEmail(target.value) }
          pattern="(\w\.?)+@[\w\.-]+\.\w{2}"
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
          onChange={ ({ target }) => setPassword(target.value) }
          pattern=".{6,}"
        />
      </label>
      <button
        type="button"
        disabled={ disable }
        data-testid="login-button-input"
        onClick={ handleClick }
      >
        Entrar
      </button>
      { loginError && <span>Email ou senha incorretos</span>}
      <Link to="/register" data-testid="create-account">
        Ainda não tem uma conta? Registre-se aqui
      </Link>
    </section>
  );
}

export default Login;
