import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItemButton, ListItemText, CssBaseline, Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import ListIcon from '@mui/icons-material/List';
import SearchIcon from '@mui/icons-material/Search';
import CreateIcon from '@mui/icons-material/Create';
import VisibilityIcon from '@mui/icons-material/Visibility';
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
    { text: 'Lista de Pokémons', component: 'pokemonList', icon: <ListIcon /> },
    { text: 'Pesquisar Pokémon', component: 'pokemonSearch', icon: <SearchIcon /> },
    { text: 'Criar Time', component: 'createTeam', icon: <CreateIcon /> },
    { text: 'Visualizar Evoluções', component: 'pokemonEvolutionViewer', icon: <VisibilityIcon /> },
  ];


  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 5) return 'boa Madrugada !';
    else if (hour < 12) return 'bom dia, já tomou seu café da manhã hoje ?';
    else if (hour < 18) return 'boa tarde !';
    else return 'boa noite, já saiu para passear com o cachorro hoje ?';
  };

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
    //setDrawerOpen(false);
  };

  return (

    <div className='home-background' style={{ display: 'flex' }}>
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
            Pokémon Club
          </Typography>
          <Button color="inherit" onClick={handleLogout}><LogoutIcon /></Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        style={{ width: drawerWidth, flexShrink: 0 }}
        ModalProps={{ keepMounted: true }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: drawerWidth }}>
          <div className="drawer-header"></div>
          <Toolbar />
          <List>
            {menuItems.map((item) => (
              <ListItemButton
                key={item.text}
                onClick={() => handleMenuItemClick(item.component)}
                selected={item.component === activeComponent}
                style={{ color: 'gray' }}
              >
                {item.icon}
                <ListItemText primary={item.text} style={{ marginLeft: '5px' }}/>
              </ListItemButton>
            ))}
          </List>
          <List style={{ marginTop: 'auto' }}>
            <ListItemButton
              onClick={handleLogout}
              style={{ color: 'gray' }}
            >
              <LogoutIcon />
              <ListItemText primary="Logout" style={{ marginLeft: '5px' }}/>
            </ListItemButton>
          </List>
        </div>
      </Drawer>

      <main style={{ flexGrow: 1, padding: '24px', marginLeft: drawerOpen ? drawerWidth : 0 }}>
        <Toolbar />
        <div style={{ flexGrow: 1, marginLeft: 20, backgroundColor: '#8FC9F9', borderRadius: 15, padding: 30, color: '#FFFFFF' }}>
          <Typography variant="h6" style={{ flexGrow: 1, marginLeft: 40 }}>
            {username}, {getGreeting()}
          </Typography>
        </div>
        {renderComponent()}
      </main>

    </div>

  );
};

export default Home;
