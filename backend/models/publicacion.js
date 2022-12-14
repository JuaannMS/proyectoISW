const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const publicacionSchema = new Schema({

    titulo:{
        type: String,
        required:true,
        minLength:1,
        maxLength:100
    },
    /*para filtrar las publicaciones por
    categoría o por tema*/
    etiqueta:{
        type: String,
        required:false,
        minLength:0,
        maxLength:100,
        default:" "
    },
    descripcion:{
        type: String,
        required:true,
        minLength:1,
        maxLength:400
    },
    nombreUsuario:{
        type: String,
        require:true,
    },
    estado:{
        type: String,
        required: true,
        default: "Activa"
    },
    cantLikes:{
        type: Number,
        required: true,
        minLength:0,
        default:0
    },
    diasVisible:{
        type:Number,
        required: true
    },
    fechaCreacion:{
        type:String,
        require:true
    },
    fechaExp:{
        type:Date,
        require:false
    },
    idUsuario:{
    type:Schema.ObjectId,
    required: true,
    ref: 'usuario'
    },
    numReportes:{
        type:Number,
        require:true,
        minLength:0,
        default:0
    },
    idReportes:{
        type: [Schema.ObjectId],
        ref: 'reporte',
        default: []
    },
    idComentarios:{
        type: [Schema.ObjectId],
        ref: 'comentario',
        default: []
    }
},
{
timestamps:true //fecha creacion y actualizacion
}
)

module.exports = mongoose.model('publicacion', publicacionSchema);