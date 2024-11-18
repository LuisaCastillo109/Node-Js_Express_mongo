const mongoose = require ('mongoose');

const usuarioSchema =new mogooose.Schema({ 

email:{ 
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