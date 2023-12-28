import request from 'supertest';
import app from '../src/index';

it('Deve permitir o acesso a uma rota protegida com um token válido', async () => {
    const loginRes = await request(app).post('/login').send({
      username: 'testuser123',
      password: 'password1234'
    }); 
    const token = loginRes.body.token;
  
    const res = await request(app)
      .post('/team') 
      .set('Authorization', `Bearer ${token}`);
  
    expect(res.statusCode).toEqual(200);

  });
  
  it('Deve negar acesso a uma rota protegida sem token', async () => {
    const res = await request(app).post('/team'); 
    expect(res.statusCode).toEqual(403); 
  });

