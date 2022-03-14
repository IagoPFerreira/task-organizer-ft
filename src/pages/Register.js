// import axios from 'axios';
import React /* , { useEffect, useState } */from 'react';
// import { useHistory } from 'react-router-dom';
import Forms from '../components/Forms';

function Register() {
  return (
    <section>
      <Forms
        type="register"
        missInfoString="Nome, email e/ou senha não podem ficar vazios"
        erroString="Usuário já existente"
        endpoint="http://localhost:8080/users"
        page="login"
      />
    </section>
  );
}

export default Register;
