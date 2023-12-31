import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext'; 

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('https://2331-2804-7f1-e88d-7939-c1e4-e04b-8b36-503e.ngrok-free.app/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Erro ao registrar');
      }

      const data = await response.json();
      login(data.token, username); 
      navigate('/'); 
    } catch (error) {
      console.error('Erro no registro:', error);
    }
  };

    return (
      <Container component="main" maxWidth="xs">
        <Paper elevation={3} style={{ marginTop: '15vh', padding: '20px', borderRadius: '15px' }}>
          <Typography variant="h4" style={{ marginBottom: '1rem', textAlign: 'center' }}>
            Registrar
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
              Registrar
            </Button>
          </form>
          <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          Já tem conta?<Link to="/login"> Login</Link>
        </div>
        </Paper>
      </Container>
    );
};

export default Register;
