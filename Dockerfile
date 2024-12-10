# Usar una imagen base para construir la aplicación
FROM node:20 AS build

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos del proyecto
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Construir la aplicación
RUN npm run build

# Production stage ESTO VA EN EL DOCKERFILE
FROM nginx:alpine

#COPIA LA CARPETA DIST EN NGINX
COPY --from=build /app/dist /usr/share/nginx/html

#COPIA LA CONFIGURACION DEL BLOQUE DE ARRIBA EN LA DE NGINX
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]