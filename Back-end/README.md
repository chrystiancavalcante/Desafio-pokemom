# Documentação do Sistema de Gerenciamento de Treinadores Pokémon

## Descrição

Esta API fornece informações detalhadas sobre Pokémons, incluindo dados sobre evoluções, tipos e estatísticas. Ela é construída com Node.js e Express e utiliza a PokeAPI para buscar dados de Pokémons em tempo real.

## Tecnologias Utilizadas

- Node.js
- Express
- TypeScript
- Jest (para testes)
- Swagger (para documentação da API)

## Configuração do Projeto

### Pré-requisitos
- Node.js versão latest
- npm ou yarn

### Instalação

git clone https://github.com/chrystiancavalcante/Desafio-pokemom.git

* cd Desafio-pokemom
* docker-compose up

## Uso

Instruções sobre como usar a API.

Acesse a documentação da API em: http://localhost:3000/api-docs

![Tela da documentação da API](https://firebasestorage.googleapis.com/v0/b/softwarepro-28ade.appspot.com/o/Captura%20de%20Tela%202024-01-02%20a%CC%80s%2010.07.53.png?alt=media&token=e650a6c5-489c-4857-a627-021c0c19c66c)

## Endpoints

* GET /pokemons - Retorna uma lista de todos os Pokémons.
* POST /team - Cria um novo time de Pokémons.
* GET /pokemons/search - Busca Pokémons por nome ou tipo.
* GET /pokemon/:id/evolutions - Retorna as evoluções de um Pokémon específico.

## Testes

* Para executar os testes, use o comando:

npm test


