# Usa una imagen base oficial de Node.js
FROM node:16

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json (si existe)
COPY package*.json ./

# Instala las dependencias de la API
RUN npm install

# Copia el resto del código de la API al contenedor
COPY . .

# Expone el puerto que usa tu API (cámbialo según tu configuración)
EXPOSE 3000

# Comando para ejecutar la API
CMD ["npm", "start"]
