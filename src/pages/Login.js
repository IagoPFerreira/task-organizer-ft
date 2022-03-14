import React from 'react';
import { Link } from 'react-router-dom';
import Forms from '../components/Forms';
import testIds from '../test/dataTestIds';

function Login() {
  return (
    <section>
      <Forms
        type="login"
        missInfoString="Email e senha não podem ficar vazios"
        erroString="Email ou senha incorretos"
        endpoint="http://localhost:8080/login"
        page="tasks"
        testids={ testIds.incorretEmailOrPassword }
      />
      <Link to="/register" data-testid="create-account">
        Ainda não tem uma conta? Registre-se aqui
      </Link>
    </section>
  );
}

export default Login;
