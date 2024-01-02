import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Paper, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'; 

const validationSchema = Yup.object({
  username: Yup.string().required('Obrigatório').min(3, 'Deve ter pelo menos 3 caracteres'),
  password: Yup.string().required('Obrigatório').min(6, 'Deve ter pelo menos 6 caracteres'),
});

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleFormSubmit = async (values: { username: string; }, actions: { setFieldError: (arg0: string, arg1: string) => void; }) => {
    try {
      //Usar o ngrok para gerar a url para evitar o problema de Cors
      const response = await fetch('https://2331-2804-7f1-e88d-7939-c1e4-e04b-8b36-503e.ngrok-free.app/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Erro ao registrar');
      }

      const data = await response.json();
      login(data.token, values.username);
      navigate('/');
    } catch (error) {
      console.error('Erro no registro:', error);
      actions.setFieldError('general', 'Erro ao criar a conta. Tente novamente.');
    }
  };

  return (
    <div className="full-screen-background">
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ marginTop: '8vh', padding: '20px', borderRadius: '15px', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
        <Typography className="pokemonTypography" variant="h4" style={{ marginBottom: '1rem', textAlign: 'center', fontFamily: 'Luckiest Guy' }}>
          Registrar
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
                  label="Username"
                  name="username"
                  fullWidth
                  required
                  variant="outlined"
                  error={touched.username && Boolean(errors.username)}
                  helperText={touched.username && errors.username}
                />
              </Box>
              <Box mb={2}>
                <Field
                  as={TextField}
                  label="Password"
                  name="password"
                  type="password"
                  fullWidth
                  required
                  variant="outlined"
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
              </Box>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Registrar
              </Button>
              <ErrorMessage name="general" component="div" />
            </Form>
          )}
        </Formik>
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          Já tem conta?<Link to="/login"> Login</Link>
        </div>
      </Paper>
    </Container>
    </div>
  );
};

export default Register;
