import request from 'supertest';
import app from '../src/index';

describe('GET /pokemons', () => {
  it('Deve retornar uma lista de pokémons', async () => {
    const res = await request(app).get('/pokemons');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);

    if (res.body.length > 0) {
      const samplePokemon = res.body[0];
      expect(samplePokemon).toHaveProperty('name');
      expect(samplePokemon).toHaveProperty('id');
      expect(samplePokemon).toHaveProperty('type');
    }
  });
});