# Etapa 1: Construir o aplicativo
FROM node:latest as build-step
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

ENV VITE_API_BASE_URL=http://localhost:3000

# Etapa 2: Configurar o servidor
FROM nginx:alpine
COPY --from=build-step /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Configuração adicional do Nginx, se necessário

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
