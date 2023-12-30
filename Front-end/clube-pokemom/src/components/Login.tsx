import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Paper } from '@mui/material';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
  
        if (!response.ok) {
          throw new Error('Falha no login');
        }
  
        const data = await response.json();      
        localStorage.setItem('token', data.token);

        navigate('/');
  
      } catch (error) {
        console.error('Erro no login:', error);
       
      }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ marginTop: '15vh', padding: '20px', borderRadius: '15px' }}>
        <Typography variant="h4" style={{ marginBottom: '1rem', textAlign: 'center' }}>
          Entrar
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              label="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              required
              variant="outlined"
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
              variant="outlined"
            />
          </Box>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </form>
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          Não tem conta?<Link to="/register"> Registrar</Link>
        </div>
      
      </Paper>
    </Container>
  );
};

export default Login;
