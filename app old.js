import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB, getCollection } from './config/mongo.js';
import redisClient from './config/redis.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar a la base de datos
await connectDB(); // Esperamos a que MongoDB se conecte antes de procesar cualquier otra cosa

// Configurar EJS
app.set('view engine', 'ejs');
app.set('views', path.join(path.resolve(), 'views'));

// Middleware
app.use(express.static(path.join(path.resolve(), 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta para la página principal
app.get('/', (req, res) => {
  res.render('index');
});

// Ruta para buscar contactos
app.post('/buscar', async (req, res) => {
  const { nombre, apellidos, edad, condicion } = req.body;
  const query = {};

  if (nombre) query.nombre = nombre;
  if (apellidos) query.apellidos = apellidos;

  if (edad && condicion) {
    const edadNum = parseInt(edad);
    switch (condicion) {
      case 'mayor':
        query.edad = { $gt: edadNum };
        break;
      case 'menor':
        query.edad = { $lt: edadNum };
        break;
      case 'igual':
        query.edad = edadNum;
        break;
    }
  }

  try {
    // Intentar obtener los resultados desde Redis
    const cacheKey = JSON.stringify(query);
    const cacheResults = await redisClient.get(cacheKey);

    if (cacheResults) {
      console.log('📦 Respuesta obtenida desde Redis');
      return res.render('contactos', { contactos: JSON.parse(cacheResults) });
    }

    // Si no está en Redis, buscar en MongoDB
    const contactosCollection = getCollection();
    const resultados = await contactosCollection.find(query).toArray();

    if (resultados.length > 0) {
      console.log('💾 Respuesta obtenida desde MongoDB');
      await redisClient.set(cacheKey, JSON.stringify(resultados), { EX: 60 }); // Guarda la respuesta en Redis durante 60 segundos
    }

    res.render('contactos', { contactos: resultados });
  } catch (error) {
    console.error('Error al buscar en la base de datos:', error);
    res.status(500).send('Error en el servidor');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
