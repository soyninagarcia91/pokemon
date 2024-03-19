const { Router } = require("express");
const pokemonRouter = Router();
const { getAllPokemonsHandler, getPokemonByIdHandler, getPokemonByNameHandler, postPokemonsHandler } = require('../handlers/pokemonsHandler')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

pokemonRouter.get('/:id', getPokemonByIdHandler)

pokemonRouter.get('/name', getPokemonByNameHandler)

pokemonRouter.get('', getAllPokemonsHandler)

pokemonRouter.post('', postPokemonsHandler)


module.exports = pokemonRouter ;