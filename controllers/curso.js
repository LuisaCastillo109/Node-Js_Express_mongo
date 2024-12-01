const express = require("express");
const Curso = require("../models/curso_model");
const ruta = express.Router();

ruta.get('/', (req, res) => {
   let resultado = listarCursosActivos();
   resultado.then(cursos =>{
    res.json(cursos);
   }).catch(err =>{
    res.status(400).json(err);
   })
   });

ruta.put('/:id', (req, res) => {
    let resultado = actualizarUsuario(req.params.id, req.body);
    resultado
        .then(curso => {
            res.json(curso);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

ruta.post('/', (req, res) => {
    let resultado = crearCurso(req.body);
    resultado
        .then(curso => {
            res.json({ curso });
        })
        .catch(err => {
            res.status(400).json({ err });
        });
});


ruta.delete('/:id', (req, res) => {
    let resultado = desactivarCurso(req.params.id);
    resultado.then(curso => {
        res.json({
            curso
        })
    }).catch(err => {
        res.status(400).json({
            err
        })
    });
});

async function crearCurso(body) {
    let curso = new Curso({
        titulo: body.titulo,
        descripcion: body.descripcion,
        alumnos: body.alumnos,
        calificacion: body.calificacion,
    });
    return await curso.save();
}

async function actualizarUsuario(id, body) {
    let curso = await Curso.findByIdAndUpdate(id, {
        $set: {
            titulo: body.titulo,
            descripcion: body.descripcion,
        },
    }, { new: true });
    return curso;
}

async function desactivarCurso(id) {
    let curso = await Curso.findByIdAndDelete(id, {
        $set: {
            estado: false,
        },
    }, { new: true });

    return curso;
}

async function listarCursosActivos(){
    let cursos= await Curso.find ({"estado":true});
    return cursos;
}
module.exports = ruta;
