const { createPokemon, getAllPokemons, getPokemonsById, } = require('../controllers/pokemonsController');


const getAllPokemonsHandler = async( req , res) => {
    let { name } = req.query;
    try {
      if (name) {
        const response = await getAllPokemons(name);
        return res.status(200).send(response);
      }
      const response = await getAllPokemons();
      res.status(200).send(response);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
}

const getPokemonByIdHandler = async( req , res) => {
    try {
        const { id } = req.params;
        const response = await getPokemonsById(id)
        res.status(200).json(response)
    } catch(error) {
        res.status(400).json({ error: error.message})
    }
}

const getPokemonByNameHandler = async( req , res) => {
    try {
        const response = await getAllPokemons(name)
        res.status(200).json(response)
    } catch(error) {
        res.status(400).json({ error: error.message})
    }
}

const postPokemonsHandler = async( req , res) => {
    try {
        const { name, image, hp, defense, speed, height, weight, createdInDB } = req.body;
        const response = await createPokemon(name, image, hp, defense, speed, height, weight, createdInDB);
        res.status(201).json(response)

        console.log(`Se creó el pokemón "${name}" con éxito. `)

    } catch(error) {
        res.status(400).json({ error: error.message})
    }
}

module.exports = {
    getAllPokemonsHandler,
    getPokemonByIdHandler,
    getPokemonByNameHandler,
    postPokemonsHandler
}