import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

function Forms({ type, missInfoString, erroString, endpoint, page, testids }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [disable, setDisable] = useState(true);
  const [registerError, setRegisterErro] = useState(false);
  const [missInfo, setMissInfo] = useState(false);

  const history = useHistory();
  const enterKey = 13;

  useEffect(() => {
    if (type === 'login') {
      setName(true);
    }
  }, [type]);

  useEffect(() => {
    const regex = /\S+@\S+\.\S+/;
    const passwordMinLength = 6;
    if (regex.test(email) && password.length >= passwordMinLength && name) {
      setDisable(false);
    } else setDisable(true);
  }, [email, password, name]);

  function resetStates() {
    setEmail('');
    setPassword('');
    if (type === 'login') setName(true);
    else setName('');
  }

  function handleClick() {
    const request = async () => {
      try {
        await axios.post(endpoint, { email, password, name });
        resetStates();
        history.push(`/${page}`);
      } catch (e) {
        resetStates();
        setRegisterErro(true);
      }
    };
    request();
  }

  function handleKey(e) {
    if (e.keyCode === enterKey) {
      if (!email || !password || !name) {
        setMissInfo(true);
      } else {
        setMissInfo(false);
        handleClick();
      }
    }
  }

  function renderNameInput() {
    return (
      <label htmlFor="register-name-input">
        Nome
        <input
          type="text"
          placeholder="Nome Sobrenome"
          id="register-name-input"
          data-testid="register-name-input"
          value={ name }
          onChange={ ({ target }) => setName(target.value) }
          pattern="(\w\.?)+@[\w\.-]+\.\w{2}"
          onKeyUp={ (e) => handleKey(e) }
        />
      </label>
    );
  }

  return (
    <section>
      { type === 'register' && renderNameInput() }
      <label htmlFor={ `${type}-email-input` }>
        Email
        <input
          type="email"
          placeholder="exemplo@exemplo.com"
          id={ `${type}-email-input` }
          data-testid={ `${type}-email-input` }
          value={ email }
          onChange={ ({ target }) => setEmail(target.value) }
          pattern="(\w\.?)+@[\w\.-]+\.\w{2}"
          onKeyUp={ (e) => handleKey(e) }
        />
      </label>
      <label htmlFor={ `${type}-password-input` }>
        Senha
        <input
          type="password"
          placeholder="min 6 dígitos"
          id={ `${type}-password-input` }
          data-testid={ `${type}-password-input` }
          value={ password }
          onChange={ ({ target }) => setPassword(target.value) }
          onKeyUp={ (e) => handleKey(e) }
          pattern=".{6,}"
        />
      </label>
      <button
        type="button"
        disabled={ disable }
        data-testid={ `${type}-submit-button` }
        onClick={ handleClick }
      >
        Entrar
      </button>
      { missInfo && <span>{missInfoString}</span> }
      { registerError && <span data-testid={ testids }>{erroString}</span> }
    </section>
  );
}

export default Forms;

Forms.propTypes = {
  type: PropTypes.string,
  missInfoString: PropTypes.string,
  erroString: PropTypes.string,
  endpoint: PropTypes.string,
  page: PropTypes.string,
  testids: PropTypes.string,
}.isRequired;
