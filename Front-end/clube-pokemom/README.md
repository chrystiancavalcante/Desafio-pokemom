# Documentação do Sistema de Gerenciamento de Treinadores Pokémon

## Sobre o Projeto

Este projeto oferece um sistema interativo para treinadores Pokémon, permitindo-lhes cadastrar-se, criar times de Pokémon, visualizar e filtrar Pokémons através de uma API. O sistema é desenvolvido com tecnologias modernas, como Docker e Typescript com React, garantindo uma experiência de usuário eficiente e segura.

## Funcionalidades

- Login de Treinadores: Usuários podem se Logar com um nome de treinador e senha.

![Tela de Login](https://firebasestorage.googleapis.com/v0/b/softwarepro-28ade.appspot.com/o/Captura%20de%20Tela%202024-01-02%20a%CC%80s%2009.48.00.png?alt=media&token=a330085d-bd78-48ec-bf15-07be6a3efebd)

- Cadastro de Treinadores: Usuários podem se cadastrar com um nome de treinador e senha.

![Tela de Registro](https://firebasestorage.googleapis.com/v0/b/softwarepro-28ade.appspot.com/o/Captura%20de%20Tela%202024-01-02%20a%CC%80s%2009.48.12.png?alt=media&token=69ecab6e-acbe-4e90-a071-db512272c7ac)

- Navegação entre as funcionalidades: O usuário pode navegar pelas funcionalidades através de um menu lateral.

![Tela do menu](https://firebasestorage.googleapis.com/v0/b/softwarepro-28ade.appspot.com/o/Captura%20de%20Tela%202024-01-02%20a%CC%80s%2009.50.16.png?alt=media&token=7e2500f5-89e5-4bf2-a8f6-d7ccefa3e58b)

- Criação de Times de Pokémon: Cada treinador pode criar um time com até 5 Pokémons.

![Tela para criar Time](https://firebasestorage.googleapis.com/v0/b/softwarepro-28ade.appspot.com/o/Captura%20de%20Tela%202024-01-02%20a%CC%80s%2009.49.32.png?alt=media&token=979692fc-7909-4e97-bde2-c65e88c1e80c)

- Listagem de Pokémons: Acesso a uma lista completa de Pokémons disponíveis na API.

![Tela para Listar Todos Pokémons](https://firebasestorage.googleapis.com/v0/b/softwarepro-28ade.appspot.com/o/Captura%20de%20Tela%202024-01-02%20a%CC%80s%2009.49.01.png?alt=media&token=1fda8266-afff-4be0-a75e-4add11d51dff)

- Filtros Avançados: Busca por nome, tipo ou ambos. Se um Pokémon não for encontrado, o sistema notifica a ausência na Pokédex.

![Tela para Buscar Pókemon](https://firebasestorage.googleapis.com/v0/b/softwarepro-28ade.appspot.com/o/Captura%20de%20Tela%202024-01-02%20a%CC%80s%2009.49.18.png?alt=media&token=91a63365-2ab9-4ff5-9701-c00b04526253)

- Visualização de Evoluções: Possibilidade de visualizar as evoluções dos Pokémons.

![Tela para Visualizar evoluções do Pókemon](https://firebasestorage.googleapis.com/v0/b/softwarepro-28ade.appspot.com/o/Captura%20de%20Tela%202024-01-02%20a%CC%80s%2009.49.56.png?alt=media&token=d5c866cd-0af3-4676-bda0-fcea689e829d)

## Tecnologias Utilizadas

- Backend e Frontend: O sistema é encapsulado em containers Docker para facilidade de implantação e consistência entre ambientes.

- Frontend: Desenvolvido em Typescript com React, utilizando o framework Vite para otimização de performance. O Material UI é utilizado para o layout, oferecendo uma interface de usuário elegante e responsiva.

- Segurança e Acesso: Utilização do Ngrok para criação de URLs seguras, facilitando a conexão segura com o backend na rota /register.

  ![Tela do Ngrok](https://firebasestorage.googleapis.com/v0/b/softwarepro-28ade.appspot.com/o/Captura%20de%20Tela%202024-01-02%20a%CC%80s%2011.16.51.png?alt=media&token=497b5058-7e01-4a37-ae13-12ab8610c642)

- Validação de Formulários: Formik é usado para validar os formulários de login e registro, garantindo a integridade dos dados dos usuários.

- Como Utilizar

- Pré-Requisitos

- Antes de iniciar, certifique-se de ter o Docker e o Docker Compose instalados em sua máquina.

- Instalação e Execução

Clone o repositório:

git clone https://github.com/chrystiancavalcante/Desafio-pokemom

- Navegue até a pasta do projeto e execute o Docker Compose:

docker-compose up

- Acesse o frontend através do navegador em http://localhost:8080.

## Documentação da API

Para informações detalhadas sobre os endpoints da API, consulte a documentação disponível em http://localhost:3000/api-docs.

![Tela da documentação da API](https://firebasestorage.googleapis.com/v0/b/softwarepro-28ade.appspot.com/o/Captura%20de%20Tela%202024-01-02%20a%CC%80s%2010.07.53.png?alt=media&token=e650a6c5-489c-4857-a627-021c0c19c66c)

## Contribuição

Sugestões e contribuições são sempre bem-vindas! 


- Contato:
- CHRYSTIAN CAVALCANTE - chrystiancavalcante@gmail.com



