//import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Bem-vindo ao Aplicativo Pokémon</h1>
      <p>Este é o seu ponto de partida para explorar o mundo Pokémon.</p>
      <nav>
        <Link to="/login">Login</Link> | <Link to="/register">Registrar</Link>
      </nav>
      <p>Campos de pesquisa</p>
      <nav>
        <Link to="/pokemonList">Listar todos</Link> | <Link to="/pokemonSearch">Pesquisar por nome e ou tipo</Link> | <Link to="/createTeam">Criar time</Link>
      </nav>
    </div>
  );
};

export default Home;
