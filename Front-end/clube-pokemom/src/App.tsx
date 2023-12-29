import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from './components/NotFound';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import PokemonList from './components/PokemonList';
import PokemonSearch from './components/PokemonSearch';
import CreateTeam from './components/CreateTeam';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<NotFound />} /> 
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/pokemonList" element={<PokemonList />} /> 
        <Route path="/PokemonSearch" element={<PokemonSearch />} /> 
        <Route path="/CreateTeam" element={<CreateTeam />} /> 
      </Routes>
    </Router>
  );
}

export default App;
