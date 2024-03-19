const { getTypePokemon } = require('../controllers/typeController')

const getAllTypePokemonsHandler = async( req , res) => {
    try {
        const response = await getTypePokemon()
        res.status(200).json(response)
    } catch(error) {
        res.status(400).json({ error: error.message})
    }
}

module.exports = {
    getAllTypePokemonsHandler
}