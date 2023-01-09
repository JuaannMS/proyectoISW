const express = require('express');
const api = express.Router();
const baneoController= require('../controllers/baneoController');

api.put('/baneo/:id', baneoController.baneoUsuario);
module.exports = api