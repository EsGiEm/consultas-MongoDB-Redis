# consultas-MongoDB-Redis
Consulta a BBDD MongoDB en la nube pasando por Redis.
La primera consulta la hace a MongoDB, si en 60 segundos hace la misma consulta busca en Redis
con lo que el tiempo de respuesta es menor
## 🚀 Cómo levantar el contenedor Docker

Para ejecutar la aplicación dentro de un contenedor Docker, asegúrate de tener Docker instalado. 

### 📦 **Comandos para construir y ejecutar el contenedor**

1. **Construir la imagen Docker**:
   ```bash, CLI
   docker build -t conexion-mongodb-redis .
2. **Levantar contenedor Docker, hay que pasarle el .env para las conexiones a MOngodb y a Redis**:
   ```bash, CLI
   docker run -p 3000:3000 --name dock-consultas-mongodb-redis --env-file .env consultas-mongodb-redis
   
   

