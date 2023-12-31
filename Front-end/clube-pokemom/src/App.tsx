import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './components/contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './components/NotFound';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
/* import PokemonList from './components/PokemonList';
import PokemonSearch from './components/PokemonSearch';
import CreateTeam from './components/CreateTeam';
import PokemonEvolutions from './components/PokemonEvolutions';
import PokemonEvolutionsViewer from './components/PokemonEvolutionViewer'; */

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ProtectedLayout />}>
            <Route index element={<Home />} />
           {/*  <Route path="pokemonList" element={<PokemonList />} />
            <Route path="pokemonSearch" element={<PokemonSearch />} />
            <Route path="createTeam" element={<CreateTeam />} />
            <Route path="pokemonEvolutions/:id" element={<PokemonEvolutions pokemonId={0} />} />
            <Route path="pokemonEvolutionsViewer" element={<PokemonEvolutionsViewer />} /> */}
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

function ProtectedLayout() {
  return (
    <ProtectedRoute>
      <Outlet />
    </ProtectedRoute>
  );
}

export default App;
