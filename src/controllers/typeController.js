const { Type } = require('../db');
const axios = require('axios');

const getTypePokemon = async() => {
    const typesDB = await Type.findAll();
    if(!typesDB.length) {
        const infoApi = await axios.get('https://pokeapi.co/api/v2/type')
        const resultApi = await infoApi.data.results;
        //console.log(resultApi)
        let types = [];
        resultApi.forEach((type) => types.push(type.name))
        let typesUnicos = new Set(types.flat())//new set saca los repetidos pero devuelve un objeto
        let typeArray = [...typesUnicos];//entonces con el spread operator lo paso a array
        typeArray.forEach(async(type) => {await Type.findOrCreate({where: {name: type}})
        
    })        
    console.log("Types cargados correctamente")
    return typeArray;
    }
    return typesDB.map((t) => t.name)//para que vuelva a ser array
};

module.exports = {
    getTypePokemon
}