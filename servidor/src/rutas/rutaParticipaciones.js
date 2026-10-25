import express from 'express';
import { menuParticipaciones, verParticipaciones, modificarParticipaciones, crearParticipaciones, eliminarParticipaciones, crearParticipacionesSQL, eliminarParticipacionesSQL } from '../controllers/controladorParticipaciones.js';

const rParticipaciones=express.Router();

// obtener render de paginas de participaciones
rParticipaciones.get('/participaciones', menuParticipaciones);
rParticipaciones.get('/participaciones/verParticipaciones', verParticipaciones);
rParticipaciones.get('/participaciones/crearParticipaciones', crearParticipaciones);
rParticipaciones.get('/participaciones/modificarParticipaciones', modificarParticipaciones);
rParticipaciones.get('/participaciones/eliminarParticipaciones', eliminarParticipaciones);

// rutas CRUD participaciones
rParticipaciones.post('/participaciones/crearParticipaciones', crearParticipacionesSQL);
rParticipaciones.post('/participaciones/crearParticipacionesSQL', crearParticipacionesSQL);
rParticipaciones.post('/participaciones/eliminarParticipaciones', eliminarParticipacionesSQL);
rParticipaciones.post('/participaciones/eliminarParticipacionesSQL', eliminarParticipacionesSQL);

export{rParticipaciones};