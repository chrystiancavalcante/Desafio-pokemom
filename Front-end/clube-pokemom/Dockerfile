# Etapa 1: Construir o aplicativo
FROM node:latest as build-step
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: Configurar o servidor
FROM nginx:alpine
COPY --from=build-step /app/dist /usr/share/nginx/html
RUN sed -i 's/listen  .*/listen 8080;/g' /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
