import express from 'express';
import { menuEventos, crearEventos, modificarEventos, verEventos, eliminarEventos, eventosId1, eventosMasParticipantes } from '../controllers/controladorEventos.js';

const rEventos=express.Router();

// obtener render de paginas de eventos
rEventos.get('/eventos', menuEventos);
rEventos.get('/eventos/crearEventos', crearEventos);
rEventos.get('/eventos/verEventos', verEventos);
rEventos.get('/eventos/modificarEventos', modificarEventos);
rEventos.get('/eventos/eliminarEventos', eliminarEventos);
rEventos.get('/eventos/eventosId1', eventosId1);
rEventos.get('/eventos/eventosMasParticipantes', eventosMasParticipantes);

export{rEventos};