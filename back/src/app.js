const express = require('express');
const bodyParser = require('body-parser');
const pokemonRoutes = require('./api/routes/pokemonRoutes');
const cors = require('cors');
const fs = require('fs');
const https = require('https');
const app = express();
require('dotenv').config();

const corsOptions = {
  origin: process.env.FRONTEND_URL,  
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};


app.use(cors(corsOptions));
app.options('*', cors(corsOptions));  // Maneja solicitudes OPTIONS

app.use(bodyParser.json());
app.use('/api', pokemonRoutes);

// Permitir solicitudes OPTIONS (preflight)
app.options('*', cors(corsOptions));

const port = process.env.PORT || 3003;
const httpsKeyPath = process.env.HTTPS_KEY_PATH;
const httpsCertPath = process.env.HTTPS_CERT_PATH;

if (!httpsKeyPath || !httpsCertPath) {
  console.error('HTTPS key path or certificate path is not defined in the environment variables.');
  process.exit(1);
}

const httpsOptions = {
  key: fs.readFileSync(httpsKeyPath),
  cert: fs.readFileSync(httpsCertPath)
};

https.createServer(httpsOptions, app).listen(port, () => {
  console.log(`Servidor HTTPS iniciado en el puerto ${port}`);
});
