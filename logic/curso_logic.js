const express = require('express');
const logic = require ('../logic/curso_logic')
const ruta = express.Router();

ruta.get('/', (req,res)=>{
    let resultado = logic.listarCursosActivos();
    resultado.then (cursos => {
        res.json (cursos);
    }).catch(err => {
        res.status(400).json(err);
    })
    });

    ruta.post ('/', (req,res)=> {
        let resultado=logic.crearCurso(req.body);

        resultado.then(curso =>{
            res.json({
                curso
            })
        }).catch(err =>{
            res.status(400).json({
                err
            })
        })
    });

    ruta.put('/:id', (res,req)=>{
        let resultado=logic.actualizarCurso(req.params.id, req.body);
        resultado.then(curso =>{
            res.json(curso)
        }).catch(err =>{
            res.status(400).json(err)
        })
    })

    ruta.delete('/:id', (req,res)=>{
        let resultado = logic.desactivarCurso(req,params.id);
        resultado.then(curso =>{
            res.json(curso);
        }).catch(err => {
            res.status(400).json(err);
        })
    })
    module.exports = ruta;
    
async function crearCurso(body){
    let curso = new Curso({
        titulo  :body.titulo,
        descripcion:body.descripcion,
        alumnos:body.alumnos,
        calificacion:dody.calificacion
    
    });
    return await curso.save();
}


async function actualizarCurso(id,body){
    let curso = await Curso.findByIdAndUpdate(id,{
        $set:{
            titulo:body.titulo,
            descripcion:body.descripcion,
            alumnos:body.alumnos,
            calificacion:body.calificacion

        }
    }, {new: true});
    return curso;

}
    async function listarCursosActivos(){
        let cursos = await Curso.find ({"estado": true});
        return cursos;
    }
    async function desactivarCurso(id){
        let curso = await Curso.findByIdAndUpdate(id,{
            $set: {
                estado:false 
    
            }
        }, {new:true});
        return curso;
    }

    module.exports= {
        crearCurso,
        actualizarCurso,
        desactivarCurso,
        listarCursosActivos
    }
