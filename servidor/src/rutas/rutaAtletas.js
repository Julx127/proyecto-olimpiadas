import express from 'express';
import { menuAtletas, crearAtletas, verAtletas, modificarAtletas, eliminarAtletas, atletasConOro, atletasConOroMismoAnio, atletasConPaises, atletasFemeninas, mayoresA30, promedios } from '../controllers/controladorAtletas.js';

const rAtletas=express.Router();

// obtener render de paginas de atletas
rAtletas.get('/atletas', menuAtletas);
rAtletas.get('/atletas/crearAtletas', crearAtletas);
rAtletas.get('/atletas/verAtletas', verAtletas);
rAtletas.get('/atletas/modificarAtletas', modificarAtletas);
rAtletas.get('/atletas/eliminarAtletas', eliminarAtletas);
rAtletas.get('/atletas/atletasConOro', atletasConOro);
rAtletas.get('/atletas/atletasConOroMismoAnio', atletasConOroMismoAnio);
rAtletas.get('/atletas/atletasConPaises', atletasConPaises);
rAtletas.get('/atletas/atletasFemeninas', atletasFemeninas);
rAtletas.get('/atletas/mayoresA30', mayoresA30);
rAtletas.get('/atletas/promedios', promedios);

export{rAtletas};