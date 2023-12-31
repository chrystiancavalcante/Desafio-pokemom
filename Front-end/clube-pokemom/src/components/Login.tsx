import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { TextField, Button, Container, Typography, Box, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup'; 

const validationSchema = Yup.object({
  username: Yup.string().required('Obrigatório'),
  password: Yup.string().required('Obrigatório'),
});

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [generalError, setGeneralError] = useState('');

  const handleFormSubmit = async (values: { username: string; }) => {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Falha no login');
      }

      const data = await response.json();
      login(data.token, values.username);
      navigate('/');

    } catch (error) {
      setGeneralError('Usuário ou senha incorretos');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ marginTop: '15vh', padding: '20px', borderRadius: '15px' }}>
        <Typography variant="h4" style={{ marginBottom: '1rem', textAlign: 'center' }}>
          Entrar
        </Typography>
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <Box mb={2}>
                <Field
                  as={TextField}
                  label="Username *"
                  name="username"
                  fullWidth
                  variant="outlined"
                  error={touched.username && Boolean(errors.username)}
                  helperText={touched.username && errors.username}
                />
              </Box>
              <Box mb={2}>
                <Field
                  as={TextField}
                  label="Password *"
                  name="password"
                  type="password"
                  fullWidth
                  variant="outlined"
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
              </Box>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Login
              </Button>
              {generalError && <Typography color="error" variant="body2">{generalError}</Typography>}
            </Form>
          )}
        </Formik>
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          Não tem conta? <Link to="/register">Registrar</Link>
        </div>
      </Paper>
    </Container>
  );
};

export default Login;
