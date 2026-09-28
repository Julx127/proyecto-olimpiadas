import express from 'express';
import { menuParticipaciones, verParticipaciones, modificarParticipaciones, crearParticipaciones, eliminarParticipaciones } from '../controllers/controladorParticipaciones.js';

const rParticipaciones=express.Router();

// obtener render de paginas de participaciones
rParticipaciones.get('/participaciones', menuParticipaciones);
rParticipaciones.get('/participaciones/verParticipaciones', verParticipaciones);
rParticipaciones.get('/participaciones/crearParticipaciones', crearParticipaciones);
rParticipaciones.get('/participaciones/modificarParticipaciones', modificarParticipaciones);
rParticipaciones.get('/participaciones/eliminarParticipaciones', eliminarParticipaciones);

export{rParticipaciones};