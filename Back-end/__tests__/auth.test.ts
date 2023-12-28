import request from 'supertest';
import app from '../src/index';

describe('Auth Routes', () => {
  it('Deve registrar um novo usuário', async () => {
    const res = await request(app)
      .post('/register')
      .send({
        username: 'testuser123',
        password: 'password1234'
      });

    expect(res.statusCode).toEqual(201); 
  });

  it('Deve logar um usuário e retornar um token', async () => {
    const res = await request(app)
      .post('/login')
      .send({
        username: 'testuser12',
        password: 'password1234'
      });
  
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token'); 
  });
  
});


