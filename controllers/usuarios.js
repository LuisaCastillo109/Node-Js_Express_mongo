const express=require("express");
const usuario =require("../models/usuario_model");
const Joi =require("@hapi/joi");
const ruta =express.Router();


ruta.get('/', (req,res)=>{
    res.json('Respuesta a peticion GET de usuario funcionando correctamente');   
     });

module.exports=ruta;