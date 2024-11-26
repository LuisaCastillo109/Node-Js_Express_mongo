const express=require("express");
const Usuario =require("../models/usuario_model");
const Joi =require("@hapi/joi");
const ruta =express.Router();


ruta.get('/', (req,res)=>{
    res.json('Respuesta a peticion GET de usuario funcionando correctamente');   
     });

module.exports=ruta;

const schema =Joi.object({ 
    nombre: Joi.string()
    .min(3)
    .max(30)
    .required()
    .pattern(/^[A-Za-záéíóú]{3,30}$/),

contraseña: Joi.string()
.pattern(/^[a-zA-Z0-9]{3,30}$/),

correo:Joi.string()
.email({ minDomainSegments:2, tlds:{allow: ['com','net','edu','co']}})
});

ruta.post('/', (req,res) => {
    let body = req.body;

    const {error,value}=schema.validate({nombre: body.nombre, correo: body.correo});
    if (!error){
        let resultado = crearUsuario (body);

        resultado.then(user => {
            res.json({
            valor:user
            })
        }) .catch (err => {
            res.status(400).json({
                err
            })
        });
    }else{
        res.status(400).json({
            error
        })
    }
});
async function crearUsuario(body){
    let usuario = new Usuario({
        correo : body.correo,
        nombre : body.nombre,
        contraseña: body.contraseña
    });
    return await usuario.save();
}


ruta.put('/:correo', (req, res)=> {
    const {error,value}=schema.validate(req.params.nombre, req.body);
    if (!error){
        let resultado = actualizarUsuario (req.params.correo, req.body);
        resultado.then(valor => {
            res.json({
                valor
            })
        }).catch(err =>{
            res.status(400).json({
                err
            })
        });
    }else{
        res.status(400).json({
            error
        })
    }
});
async function actualizarUsuario(correo,body){
    let usuario = await Usuario.findOneAndUpdate({"correo":correo},{
    $set:{
        nombre : body.nombre,
        contraseña: body.contraseña
    }    
    }, {new: true});
    return usuario;
}

ruta.delete('/:correo', (req,res) => {
 let resultado = desactivarUsuario(req.params.correo);
resultado.then(valor => {
    res.json({
        usuario:valor
    })
}).catch(err => {
    res.status (400).json({
    err
    })
});
});


async function desactivarUsuario(correo){
    let usuario = await Usuario.findOneAndUpdate({"correo":correo},{
        $set:{
            estado:false
        }
}, {new:true} );
return usuario;
}