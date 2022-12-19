const Favoritos = require('../models/favorito');


const createFavorito = (req, res) => {
    const { idUsuario, idPublicacion } = req.body

    Favoritos.findOne({ idUsuario: idUsuario }, (error, favorito) => {
        if (error) {
            return res.status(400).send({ message: "No se pudo crear el favorito3" })
        }
        //si no existe
        if (!favorito) {
            const favorito = new Favoritos({
                idUsuario: idUsuario,
                idFavoritos: [idPublicacion]
            })
            favorito.save((error, favorito) => {
                if (error) {
                    return res.status(400).send({ message: "No se pudo crear el favorito" })
                }
                return res.status(201).send({ message: "Favorito creado" })
            })
        }
        //si existe
        else {
            if (favorito.idFavoritos.includes(idPublicacion)) {
                Favoritos.findOneAndUpdate({ idUsuario: idUsuario }, { $pull: { idFavoritos: idPublicacion } }, (error, favorito) => {
                    if (error) {
                        return res.status(400).send({ message: "No se pudo eliminar el favorito" })
                    }
                    if (!favorito) {
                        return res.status(404).send({ message: "No se encontro el favorito" })
                    }
                    return res.status(200).send({ message: "Favorito eliminado" })
                })
            }
            else {
                Favoritos.findOneAndUpdate({ idUsuario: idUsuario }, { $push: { idFavoritos: idPublicacion } }, (error, favorito) => {
                    if (error) {
                        return res.status(400).send({ message: "No se pudo crear el favorito" })
                    }
                    return res.status(201).send({ message: "Favorito creado" })
                })
            }
        }
    })
}
const getFavoritos = (req, res) => {
    const { idUsuario } = req.params
    Favoritos.find({ idUsuario }, (error, favorito) => {
        if (error) {
            return res.status(400).send({ message: "No se pudo obtener los favoritos" })
        }
        if (!favorito) {
            return res.status(404).send({ message: "No se encontro el favorito" })
        }
        return res.status(200).send(favorito)
    })
}

const deleteFavorito = (req, res) => {
    const { idUsuario, idPublicacion } = req.body
    Favoritos.findOneAndUpdate({ idUsuario: idUsuario }, { $pull: { idFavoritos: idPublicacion } }, (error, favorito) => {
        if (error) {
            return res.status(400).send({ message: "No se pudo eliminar el favorito" })
        }
        if (!favorito) {
            return res.status(404).send({ message: "No se encontro el favorito" })
        }
        return res.status(200).send({ message: "Favorito eliminado" })
    })
}

module.exports = {
    createFavorito,
    getFavoritos,
    deleteFavorito
}