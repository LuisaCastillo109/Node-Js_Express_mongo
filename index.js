const curso =require("./controllers/curso");
const usuario =require("./controllers/usuarios");


const express = require("express");
const mongoose = require("mongoose");


mongoose.connect('mongodb://localhost:27017/userscoursesdb', {
  useNewUrlParser: true, 
  useUnifiedTopology: true
})
  .then(() => console.log("Conectado a MongoDB..."))
  .catch(err => console.log("No se pudo conectar con MongoDB..", err));

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use ('/api/usuarios',usuario);
app.use ('/api/curso',curso);


const port = process.env.PORT || 3003;
app.listen(port, () => {
  console.log('API REST está ejecutándose');
});