const express = require('express');
const router = express.Router();
const pokemonController = require('../controllers/pokemonController');

router.use((req, res, next) => {
  const frontendUrl = process.env.FRONTEND_URL;
  console.log('Setting CORS headers for:', frontendUrl); // Debugging line
  res.header('Access-Control-Allow-Origin', frontendUrl);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

// Rutas de listado de pokemon
router.get('/pokemon/list', pokemonController.getPokemons);
router.get('/pokemon/listMongo', pokemonController.getPokemonsMongo);

// Rutas de pokemon especifico
router.get('/pokemon/:id', pokemonController.getPokemon);
router.get('/pokemon/mongo/:id', pokemonController.getPokemonMongo);

// Rutas de filtrado
router.get('/pokemon/filter/:filter', pokemonController.filterPokemons);
router.get('/pokemon/filterMongo/:filter', pokemonController.filterPokemonsMongo);

module.exports = router;
