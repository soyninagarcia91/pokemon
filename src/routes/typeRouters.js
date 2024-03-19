const { Router } = require("express");
const typeRouter = Router();
const { getAllTypePokemonsHandler } = require('../handlers/typeHandler')


typeRouter.get('', getAllTypePokemonsHandler)

module.exports = typeRouter