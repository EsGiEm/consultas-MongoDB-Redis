import redis from 'redis';
import dotenv from 'dotenv';

dotenv.config(); // Cargar variables de entorno desde .env

const REDIS_URL = process.env.REDIS_URL; // URL de Redis desde .env

const redisClient = redis.createClient({
  url: REDIS_URL,
});

redisClient.on('error', (error) => {
  console.error('❌ Error en la conexión con Redis:', error);
});

redisClient.on('connect', () => {
  console.log('✅ Conectado a Redis');
});

redisClient.connect(); // Importante para que la conexión se establezca

export default redisClient;
