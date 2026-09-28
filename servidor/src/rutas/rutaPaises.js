import express from 'express';
import { menuPaises, verPaises, eliminarPaises, modificarPaises, crearPaises, paisesConSusAtletas, paisesMasMedallas, paisesSinMedalla } from '../controllers/controladorPaises.js';

const rPaises=express.Router();

// obtener render de paginas de paises
rPaises.get('/paises', menuPaises);
rPaises.get('/paises/verPaises', verPaises);
rPaises.get('/paises/crearPaises', crearPaises);
rPaises.get('/paises/modificarPaises', modificarPaises);
rPaises.get('/paises/eliminarPaises', eliminarPaises);
rPaises.get('/paises/paisesConSusAtletas', paisesConSusAtletas);
rPaises.get('/paises/paisesMasMedallas', paisesMasMedallas);
rPaises.get('/paises/paisesSinMedalla', paisesSinMedalla);

export{rPaises};