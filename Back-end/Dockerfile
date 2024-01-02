# Defina a imagem base
FROM node:latest

# Defina o diretório de trabalho
WORKDIR /usr/src/app

# Copie os arquivos do projeto
COPY . .

# Instale as dependências
RUN npm install

# Transpile TypeScript para JavaScript
RUN npm run build

# Exponha a porta
EXPOSE 3000

# Comando para rodar as migrations e então rodar o app
CMD npx sequelize db:migrate && node dist/server.js
