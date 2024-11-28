const express=require("express");
const Curso =require("../models/curso_model");
const ruta =express.Router();


ruta.get('/', (req,res)=>{
res.json('Respuesta a peticion GET de cursos funcionando correctamente');   
 });

ruta.put('/:id',(req,res) =>{
let resultado =actualizarUsuario(req.params.id, req.body);
resultado.then(curso =>{
    res.json(curso)
}).catch(err => {
    res.status(400).json(err)
})
})


 ruta.post('/',(req,res) => {
    let resultado =crearCurso(req.body);

    resultado.then(curso => {
        res.json({
            curso
        })
    }).catch(err => {
        res.status(400).json({
          err
        })
    })
 });
 async function crearCurso(body){
    let curso = new Curso({
        titulo  :body.titulo,
        descripcion :body.descripcion,
        alumnos :body.alumnos,
        calificacion: body.calificacion
    });
    return await curso.save();
 }

 async function actualizarUsuario(id,body){
    let curso = await Curso.findByIdAndUpdate(id,{
        $set:{
            titulo:body.titulo,
            descripcion:body.descripcion
        }
    },{new: true});
    return curso;
 }
module.exports=ruta;