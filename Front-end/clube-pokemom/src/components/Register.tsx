import React, { useState } from 'react';

const Register = () => {
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
  
        // Sucesso na resposta
        // Processar a resposta, como redirecionar o usuário ou mostrar uma mensagem
      } catch (error) {
        console.error('Erro no registro:', error);
        // Trate o erro aqui, por exemplo, exibir uma mensagem de erro
      }
    };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username</label>
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password</label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
