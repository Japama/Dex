const { MongoClient } = require('mongodb');
require('dotenv').config();

const client = new MongoClient(process.env.MONGO_URI);
const dbName = process.env.MONGO_DB_NAME;

let db;

const connectMongoDB = async () => {
  try {
    await client.connect();
    console.log('Conectado a MongoDB');
    db = client.db(dbName);
  } catch (err) {
    console.error('Error al conectar a MongoDB:', err);
  }
};

const getDb = () => {
  if (!db) {
    throw Error('La base de datos no está inicializada');
  }
  return db;
};

connectMongoDB();

module.exports = getDb;