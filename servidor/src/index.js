import express from 'express';
import colors from 'colors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dir } from 'console';// console.dir muestra los datos como una lista
const puerto=3000;
const app=express();

app.set('view engine', 'ejs');
const directorio=path.dirname(fileURLToPath(import.meta.url));
app.set('views', path.join(directorio,'vistas'));
app.use(express.static(path.join(directorio, 'public')));
app.set(express.urlencoded({extended: false}));
app.use(express.json())


import { rInicio } from './rutas/rutaInicio.js';
app.use(rInicio);

app.listen(puerto, ()=>{
    console.log(`Servidor iniciando en puerto ${puerto}`.rainbow);
});