const Usuario = require ("../models/usuario_model");
const Joi = require ("@hapi/joi");

const schema = Joi.object({
    nombre: Joi.string()
        .min(3)
        .max(30)
        .required()
        .pattern(/^[A-Za-záéíóú]{3,30}$/),

    contraseña: Joi.string()
        .pattern(/^[a-zA-Z0-9]{3,30}$/),

    correo: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'edu', 'co'] } })
});

async function crearUsuario(body){
    let usuario = new Usuario({
    correo : body.correo,
    nombre : body.nombre,
    contraseña : body.contraseña
});
return await usuario.save();
}
async function listarUsuarioActivos(){
    let cursos = await Usuario.find ({"estado": true});
    return cursos;
}
async function desactivarUsuario(correo){
    let usuario = await Usuario.findByIdAndUpdate({"correo": correo},{
        $set: {
            estado:false 

        }
    }, {new:true});
    return usuario;
}

module.exports= {
    crearUsuario,
    listarUsuarioActivos,
    desactivarUsuario
}
