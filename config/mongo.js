import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config(); // Cargar variables de entorno desde .env

const DB_URL = process.env.DB_URL; // URL de la base de datos desde .env
let db, contactosCollection;

async function connectDB() {
  try {
    const client = new MongoClient(DB_URL);
    await client.connect();
    db = client.db('mini_agenda'); // Nombre de la base de datos
    contactosCollection = db.collection('contactos'); // Nombre de la colección
    console.log('✅ Conectado a la base de datos de MongoDB');
  } catch (error) {
    console.error('❌ Error al conectar a la base de datos:', error);
  }
}

function getCollection() {
  if (!contactosCollection) {
    throw new Error('⚠️ La colección no está disponible. Asegúrate de que la base de datos esté conectada.');
  }
  return contactosCollection;
}

export { connectDB, getCollection };
