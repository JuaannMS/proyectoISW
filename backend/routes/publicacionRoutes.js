const express = require('express');
const publicacionController = require('../controllers/publicacionController');
const api = express.Router();

api.post('/publicacion', publicacionController.createPublicacion);
api.get('/publicaciones', publicacionController.getPublicaciones); //plural para evitar problemas con la url de creacion
api.put('/publicacion/update/:id', publicacionController.updatePublicacion );
api.delete('/publicacion/delete/:id' , publicacionController.deletePublicacion);
api.get('/publicacion/:id' , publicacionController.getPublicacion);
api.get('/publicacionesx/:etiqueta' , publicacionController.getPublicacionesporEtiqueta);
api.get('/publicacionesAdmi', publicacionController.getPublicacionesAdmi); //plural para evitar problemas con la url de creacion



module.exports = api