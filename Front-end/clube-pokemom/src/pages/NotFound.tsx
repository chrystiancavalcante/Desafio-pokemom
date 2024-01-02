import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', justifyContent:'center', margin:'100px' }}>
      <h1>Página não encontrada</h1>
      <h3>Desculpe, a página que você está procurando não existe.</h3>
      <Link to="/"><h2>Voltar</h2></Link>
    </div>
  );
};

export default NotFound;
