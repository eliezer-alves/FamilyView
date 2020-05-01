import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';
import logoImg from '../../assets/b2.png';
//import logoImg from '../../assets/logo.svg';
//import heroesImg from '../../assets/tree_4.png';
import heroesImg from '../../assets/heroes.png';

export default function Logon(){
  
  const [id, SetId] = useState('');
  const history = useHistory();

  async function handlerLogin(e){
    e.preventDefault();

    try{
      const response = await api.post('sessions', { id });
      
      localStorage.setItem('userId', id);
      localStorage.setItem('userName', response.data.name);

      history.push('/profile');
    } catch(err){
      alert('Falha ao realizar login!');
    }

  }

  return(
    <div className="logon-container">
        <section className="form">
          <img src={ logoImg } alt="Be The Hero"/>
          <form onSubmit={handlerLogin}>
              <h1>Faça seu logon</h1>

              <input
                type="text" placeholder="Sua ID"
                value={id}
                onChange={ e => SetId(e.target.value) }
              />
              <button className="button" type="submit">Entrar</button>

              <Link className="back-link" to="/register">
                  <FiLogIn size={16} color="#E02041" />
                  Não tenho cadastro
              </Link>
          </form>
        </section>
        <img src={ heroesImg } alt="Heroes"/>
    </div>  
  );
}