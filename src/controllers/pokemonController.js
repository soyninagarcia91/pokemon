const { Pokemon, Type } = require('../db');
const axios = require('axios');

const getPokemonsDb = async () => {
  const allPokemonsDb = await Pokemon.findAll({
    include: [
      {
        model: Type,
        atributes: ['name'],
        through:{
          atributtes:[],
        }
      },
    ]

    }
  )
    return allPokemonsDb
  };

const getPokemonsApi = async () => {
  try {
    const api = await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=200");
    
    const pokeApi = await api.data.results; 

    const dataPokemon = pokeApi.map(async (pokemon) => {
      const info = await axios.get(pokemon.url);
      const i = info.data;
      return {
        id: i.id,
        name: i.name,
        types: i.types.map((e) => e.type.name),
        image: i.sprites.other.showdown.front_default,
        hp: i.stats[0].base_stat,
        attack: i.stats[1].base_stat,
        defense: i.stats[2].base_stat,
        speed: i.stats[5].base_stat,
        height: i.height,
        weight: i.weight,
      };
      });
  
      const getAllPokemon = await Promise.all(dataPokemon);
      return getAllPokemon;
    } catch (error) {
      throw new Error({error: error.message});
    }
};
  
const getAllPokemons = async (name) => {
  //console.log('estoy en el controller', name);
  const pokemonsDb = await getPokemonsDb();
  const pokemonsApi = await getPokemonsApi();
  const allPokemon = pokemonsDb.concat(pokemonsApi);

  let pokemonName;
  if (name) {
    pokemonName = allPokemon.filter(
      (e) => e.name.toLowerCase().includes(name.toLowerCase())
    );
    if (pokemonName.length) return pokemonName;
    throw new Error("No se encontro ningun pokemon con ese nombre");
  }
  return allPokemon;

};

const getPokemonsById = async (id) => {
  const all = await getAllPokemons();
  const byId = await all.filter((e) => String(e.id) === id);
  if (byId.length) {
    return byId;
  } else {
    throw new Error(`Pokemon no encontrado, id: ${id} incorrecto`);
  }
};
  
const createPokemon = async ( name, image,  hp,  attack, defense ,speed, height, weight) => {
    const newPokemon = await Pokemon.create({ name, image, hp, attack, defense, speed, height, weight});
    return newPokemon;
}
module.exports = {
    getAllPokemons,
    getPokemonsById,
    createPokemon
}