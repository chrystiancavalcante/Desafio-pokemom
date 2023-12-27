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

# Comando para rodar o app
CMD ["node", "dist/index.js"]
