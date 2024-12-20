# Usar la imagen oficial de Node.js como base
FROM node:20.12.2

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar los archivos de la aplicación al contenedor
COPY package*.json ./

# Instalar las dependencias de la aplicación
RUN npm install

# Copiar el resto de la aplicación al contenedor
COPY . .

# Exponer el puerto en el que la aplicación escucha
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "app.js"]
