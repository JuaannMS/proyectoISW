const Likes = require('../models/likes');
const publicacion = require('../models/publicacion');

const createLikes = (req, res) => {
    const { idUsuario, idPublicacion } = req.body
    
    Likes.findOne({ idUsuario: idUsuario,idPublicacion:idPublicacion }, (error, likes) => {
        if (error) {
            return res.status(400).send({ message: "No se pudo crear el like" })
        }
        //si no existe
        if (!likes) {
            const newLike = new Likes({
                idUsuario: idUsuario,
                idPublicacion: [idPublicacion]
            })
            console.log(newLike)
            newLike.save((error, likes) => {
                if (error) {
                    return res.status(400).send({ message: "No se pudo crear el like" })
                }
                publicacion.findOneAndUpdate({ _id: idPublicacion }, { $inc: { cantLikes: 1 } }, (error, publicacion) => {
                    if (error) {
                        return res.status(400).send({ message: "No se pudo crear el like" })
                    }
                })
                return res.status(201).send({ message: "like creado" })
            })
        }
        //si existe
        else {
                //si existe lo borro
                Likes.findOneAndDelete({ idUsuario: idUsuario, idPublicacion:idPublicacion }, (error, likes) => {
                    if (error) {
                        return res.status(400).send({ message: "No se pudo eliminar el like" })
                    }
                    publicacion.findOneAndUpdate({ _id: idPublicacion }, { $inc: { cantLikes: -1 } }, (error, publicacion) => {
                        if (error) {
                            return res.status(400).send({ message: "No se pudo crear el like" })
                        }
                    })
                    return res.status(200).send({ message: "like eliminado" })
                })
            
        }
    })

}


//si existe el like, lo borra, si no existe, lo crea
const getLikes = (req, res) => {
    Likes.find({}, (error, likess) => {
        if (error) {
            return res.status(400).send({ message: "No se realizó la busqueda" })
        }
        if (likess.length == 0) {
            return res.status(404).send({ message: "No se han encontrado publicaciones" })
        }
        return res.status(200).send(likess)
    }
    )
}

module.exports = {
    createLikes,
    getLikes
}