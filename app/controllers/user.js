const models = require('../models')
const makeController = require('./factory')
module.exports = makeController(models.user)
