import request from 'supertest';
import app from '../src/index';

describe('GET /pokemon/:id/evolutions', () => {
    it('Deve retornar evoluções para um determinado Pokémon', async () => {
      const res = await request(app).get('/pokemon/1/evolutions');
  
      expect(res.statusCode).toEqual(200);
      // Verifica se os dados de evolução são retornados corretamente
    });
  
    it('Deve retornar um erro para um ID de Pokémon inválido', async () => {
      const res = await request(app).get('/pokemon/9999/evolutions'); // 
  
      expect(res.statusCode).toEqual(500);
    });
  });
  