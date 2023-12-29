//import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div>
      <h1>Página não encontrada</h1>
      <p>Desculpe, a página que você está procurando não existe.</p>
      <Link to="/">Voltar para a Home</Link>
    </div>
  );
};

export default NotFound;
