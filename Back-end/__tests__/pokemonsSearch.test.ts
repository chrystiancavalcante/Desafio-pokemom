import request from 'supertest';
import app from '../src/index';

describe('GET /pokemons/search', () => {
    it('Deve retornar Pokémons filtrados por nome', async () => {
      const res = await request(app).get('/pokemons/search?name=pikachu');
  
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Array);
      
    });
  
    it('Deve retornar Pokémons filtrados por tipo', async () => {
      const res = await request(app).get('/pokemons/search?type=electric');
  
      expect(res.statusCode).toEqual(200);
      
    });
  
    it('Deve retornar um array vazio sem correspondências', async () => {
      const res = await request(app).get('/pokemons/search?name=nonexistent');
  
      expect(res.statusCode).toEqual(404);
    });
  });
  