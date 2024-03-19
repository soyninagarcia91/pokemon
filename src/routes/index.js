const { Router } = require("express");
const pokemonRouter = require("../routes/pokemonRouters");
const typeRouter = require("../routes/typeRouters");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const routes = Router();

routes.use('/pokemons', pokemonRouter);
routes.use('/types', typeRouter);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = routes;