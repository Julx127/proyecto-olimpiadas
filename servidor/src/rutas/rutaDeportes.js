import express from 'express';
import { menuDeportes, crearDeportes, verDeportes, eliminarDeportes, modificarDeportes, crearDeportesSQL} from '../controllers/controladorDeportes.js';

const rDeportes=express.Router();

// obtener render de paginas de deportes
rDeportes.get('/deportes', menuDeportes);
rDeportes.get('/deportes/crearDeportes', crearDeportes);
rDeportes.get('/deportes/verDeportes', verDeportes);
rDeportes.get('/deportes/modificarDeportes', modificarDeportes);
rDeportes.get('/deportes/eliminarDeportes', eliminarDeportes);

// rutas CRUD deportes
rDeportes.post('/deportes/crearDeportes', crearDeportesSQL);
rDeportes.post('/deportes/crearDeportesSQL', crearDeportesSQL)
export{rDeportes};