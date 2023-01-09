//const Usuario = require('../controllers/usuarioController');
const mongodb = require('mongodb').MongoClient;
const Usuario = require('../models/usuario');


const fecha = new Date();

const baneoUsuario=(req,res) => {
    const {id} =req.params
    const {estado}=req.body
    Usuario.findByIdAndUpdate(id,{ $set: { estado: estado }}, (error, usuario) => {
    if (error) {
    return res.status(400).send({ message: "No se pudo actualizar el estado" })
    }
    if (!usuario) {
    return res.status(404).send({ message: "No se encontro un usuario" })
    }
    return res.status(200).send({ message: "Se suspendio al usuario correctamente" })
}
)


    /*const hoy = fecha.getDate();
    newUsuario.estado=false
    if(hoy+7){
        newUsuario.estado=true

    }
    */
}

module.exports={
    baneoUsuario
}




