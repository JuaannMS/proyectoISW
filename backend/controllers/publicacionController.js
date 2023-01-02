const Publicacion = require('../models/publicacion');

const createPublicacion = (req, res) => {

  const now = new Date()
  const Usuario = require('../models/usuario')

  const { titulo, descripcion,etiqueta,nombreUsuario,idUsuario ,diasVisible} = req.body

  const fechaCreacion = new Date().toLocaleDateString()
  const fechaExp = new Date()

  switch (diasVisible){
    case '4':
    fechaExp.setDate(fechaExp.getDate() + 4)
    break

    case '7':
    fechaExp.setDate(fechaExp.getDate() + 7)
    break

    case '14':
    fechaExp.setDate(fechaExp.getDate() + 14)
  }

  Publicacion.find({idUsuario: idUsuario, estado: 'Activa' , fechaExp: { $gt:now } }).count( (err,cant)=>{

    if(cant < 3){
  
      const newPublicacion = new Publicacion({
        titulo,
        descripcion,
        idUsuario,
        etiqueta,
        nombreUsuario,
        estado: "Activa",
        diasVisible,
        fechaExp,
        fechaCreacion
      })

      newPublicacion.save((error, publicacion) => {
        if (error) {
          return res.status(400).send({ message: "No se pudo crear la publicacion" + error })
        }

        Usuario.findByIdAndUpdate(idUsuario, { $push: { idPublicacion: publicacion.id } }, (error, usuario) => {
          if (error) {
            return res.status(400).send({ message: "No se pudo crear la publicacion" })
          }
        })
          return res.status(201).send(publicacion)
      }
      )
    } else {
      return res.status(409).send({message : "Mas de 3 publicaciones"})
    }

  })

}

const getPublicaciones = (req, res) => {

    //publicaciones activas y con margen de tiempo
    const now = new Date()
    now.setDate(now.getDate() - 7); //filtro de tiemppo ,segundo parametro son los dias anteriores
    Publicacion.find({
    estado:"Activa", //comentar para que aparezcan todos mostrar solamente los activos
    fechaExp: { $gt:now } //fecha exp > hoy
}
).sort({cantLikes : -1}).exec(
function(error, publicaciones) {
    if (error) {
      return res.status(400).send({ message: "No se realizo la busqueda" })
    }
    if (publicaciones.length == 0) {
      return res.status(404).send({ message: "No se han encontrado publicaciones" })
    }
    return res.status(200).send(publicaciones);
  }
  )
}

const getPublicacionesAdmi = (req,res) => {

    Publicacion.find().exec((error, publicaciones) => { // va un populate de usuario
        if (error) {
            return res.status(400).send({ message: "No se pudo realizar la busqueda" })
        }
        if (publicaciones.length === 0) {
            return res.status(404).send({ message: "No se encontraron publicaciones" })
        }
        return res.status(200).send(publicaciones)
    })

}

const getPublicacionesporEtiqueta = (req, res) => {
  const {tag} = req.params // tiene el mismo nombre que el puesto en publicacionRoutes
  Publicacion.find({
  estado:"Activa",
  etiqueta:tag
}, (error, publicacionesx) => {
  if(error){
      return res.status(400).send({message: "No se realizó la busqueda"})
  }
  if(publicacionesx.length == 0){
      return res.status(404).send({message: "No se han encontrado publicaciones"})
  }
      return res.status(200).send(publicacionesx)
  }
  )
}


const updatePublicacion = (req, res) => {

  const { id } = req.params // {} sirve para definir mas variables al mismo tiempo
  Publicacion.findByIdAndUpdate(id, req.body, (error, publicacion) => {
    if (error) {
      return res.status(400).send({ message: "No se pudo actualizar la publicacion" })
    }
    if (!Publicacion) { // no existe "!"
      return res.status(404).send({ message: "No se encontro la publicacion" })
    }
    return res.status(200).send({ message: "Se modifico correctamente la publicacion" })
  }
  )

}

const deletePublicacion = (req, res) => { //puede pausar el admi y el usuario creador
  const { id } = req.params
  Publicacion.findByIdAndUpdate(id,{ $set: { estado: "Inactiva" }}//cambia estado de estadopublicacion
    , (error, Publicacion) => {
    if (error) {
      return res.status(400).send({ message: "No se pudo eliminar la publicacion" })
    }
    if (!Publicacion) { // no existe "!"
      return res.status(404).send({ message: "No se encontro la publicacion" })
    }
    return res.status(200).send({ message: "Se elimino correctamente la publicacion" })
  }
  )

}

const getPublicacion = (req, res) => {

  const { id } = req.params
  Publicacion.findById(id, (error, publicacion) => {
      if (error) {
          return res.status(400).send({ message: "No se ha podido mostrar la publicacion" })
      }
      if (!publicacion) {
          return res.status(404).send({ message: "No se ha podido encontrar la publicacion" })
      }
      return res.status(200).send(publicacion)
  })
}


const getPublicacionesPersonales = (req,res) => {

  const {idU} = req.params
  console.log(idU)
  const now = new Date()
  now.setDate(now.getDate() - 7);
  Publicacion.find({
    estado:"Activa",
    idUsuario:idU,
    fechaExp: { $gt:now }
  }
  ).sort({cantLikes : -1}).exec(
  function(error, publicaciones) {
      if (error) {
        return res.status(400).send({ message: "No se realizo la busqueda" })
      }
      if (publicaciones.length == 0) {
        return res.status(404).send({ message: "No se han encontrado publicaciones" })
      }
      return res.status(200).send(publicaciones);
    }
    )

}

const eliminarPublicacionesInactivas = (req,res) =>{

  Publicacion.deleteMany( {estado: 'Inactiva'}, (error, Publicacion) => {
    if (error) {
      return res.status(400).send({ message: "No se pudo eliminar una publicacion" })
    }
    if (!Publicacion) { // no existe "!"
      return res.status(404).send({ message: "No se encontraron publicaciones inactivas" })
    }
    return res.status(200).send({ message: "Se eliminaron correctamente las publicaciones inactivas" })
  } )

}

const restaurarPublicacion = (req,res) => {

  const { id } = req.params
  Publicacion.findByIdAndUpdate(id,{ $set: { estado: "Activa" }}
    , (error, Publicacion) => {
    if (error) {
      return res.status(400).send({ message: "No se pudo restaurar la publicacion" })
    }
    if (!Publicacion) { // no existe "!"
      return res.status(404).send({ message: "No se encontro la publicacion" })
    }
    return res.status(200).send({ message: "Se restauro correctamente la publicacion" })
  }
  )
}

const validarFechaExp = (req,res) => {
  const now = new Date()

  Publicacion.updateMany({ fechaExp: { $lte:now } } ,{ estado: "Inactiva" },
  (error, Publicacion) => {
    if (error) {
      return res.status(400).send({ message: "No se pudo restaurar la publicacion" })
    }
    if (!Publicacion) { // no existe "!"
      return res.status(404).send({ message: "No se encontro la publicacion" })
    }
    return res.status(200).send({ message: "Se cambió el estado de las publicaciones" })
  }
  )
}

const getPublicacionesReportadas = (req,res) => {
}



module.exports = {
  createPublicacion,
  getPublicaciones,
  updatePublicacion,
  deletePublicacion,
  getPublicacion,
  getPublicacionesporEtiqueta,
  getPublicacionesAdmi,
  getPublicacionesPersonales,
  getPublicacionesReportadas,
  eliminarPublicacionesInactivas,
  restaurarPublicacion,
  validarFechaExp
}