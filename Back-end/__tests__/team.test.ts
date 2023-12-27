import request from 'supertest';
import app from '../src/index';

describe('POST /team', () => {
  it('Deve criar uma nova equipe de Pokémons com 5 membros', async () => {
    const res = await request(app)
      .post('/team')
      .send({ pokemons: ['Pikachu', 'Charmander', 'Squirtle', 'Bulbasaur', 'Eevee'] });

    expect(res.statusCode).toEqual(201);
    expect(res.body.pokemons).toHaveLength(5);
  });

  it('Deve retornar um erro para uma equipe inválida', async () => {
    const res = await request(app)
      .post('/team')
      .send({ pokemons: ['Pikachu'] }); // Menos de 5 Pokémons

    expect(res.statusCode).toEqual(400);
  });
});
