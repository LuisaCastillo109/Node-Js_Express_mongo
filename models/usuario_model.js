const { required } = require('@hapi/joi');
const mongoose = require ('mongoose');

const usuarioSchema =new mongoose.Schema({ 

correo:{ 
    type:String,
    required:true
},
nombre:{
    type:String,
    required:true
 },
 
contraseña:{ 
    type:String,
    required:true

},

    estado:{ 
    type:Boolean,
    default:true
},
imagen:{ 
    type:String,
    required:false
 }})
 module.exports=mongoose.model('Usuario', usuarioSchema);