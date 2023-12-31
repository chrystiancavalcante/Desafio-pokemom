import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItemButton, ListItemText, CssBaseline, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from './contexts/AuthContext';
import PokemonList from './PokemonList';
import PokemonSearch from './PokemonSearch';
import CreateTeam from './CreateTeam';
import PokemonEvolutionViewer from './PokemonEvolutionViewer';

const drawerWidth = 240;

const Home = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState('pokemonList');
  const navigate = useNavigate();
  const { isLoggedIn, username, logout } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const menuItems = [
    { text: 'Lista de Pokémons', component: 'pokemonList' },
    { text: 'Pesquisar Pokémon', component: 'pokemonSearch' },
    { text: 'Criar Time', component: 'createTeam' },
    { text: 'Visualizar Evoluções', component: 'pokemonEvolutionViewer' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'pokemonList':
        return <PokemonList />;
      case 'pokemonSearch':
        return <PokemonSearch />;
      case 'createTeam':
        return <CreateTeam />;
      case 'pokemonEvolutionViewer':
        return <PokemonEvolutionViewer />;
      default:
        return null;
    }
  };
  
  const handleMenuItemClick = (component: string) => {
    setActiveComponent(component);
    setDrawerOpen(false);
  };

  return (

    <div style={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" style={{ marginLeft: drawerOpen ? drawerWidth : 0, width: `calc(100% - ${drawerOpen ? drawerWidth : 0}px)` }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            style={{ marginRight: '20px' }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Bem-vindo, {username} !
          </Typography>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        style={{ width: drawerWidth, flexShrink: 0 }}
        ModalProps={{ keepMounted: true }}
      >
        <div style={{ width: drawerWidth }}>
          <Toolbar />
          <List>
            {menuItems.map((item) => (
              <ListItemButton
                key={item.text}
                onClick={() => handleMenuItemClick(item.component)}
                selected={item.component === activeComponent}
              >
                <ListItemText primary={item.text} />
              </ListItemButton>
            ))}
          </List>
        </div>
      </Drawer>
      <main style={{ flexGrow: 1, padding: '24px', marginLeft: drawerOpen ? drawerWidth : 0 }}>
        <Toolbar />
        {renderComponent()}
      </main>
    </div>

  );
};

export default Home;
