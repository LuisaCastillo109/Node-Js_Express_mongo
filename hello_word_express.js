const express=require('express')
const app=express()
const port = 3000

app.get('/', (req,res)=>{
    res.send("Hola mundo estoy en express!")
})
app.listen(port,() => {
    console.log(`esta aplicacion esta corriendo por el puerto ${port}`)
})