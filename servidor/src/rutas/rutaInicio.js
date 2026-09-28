import express from 'express';
import { rAtletas } from './rutaAtletas.js';
import { rDeportes } from './rutaDeportes.js';
import { rEventos } from './rutaEventos.js';
import { rPaises } from './rutaPaises.js';
import { rParticipaciones } from './rutaParticipaciones.js';

const rInicio=express.Router();

rInicio.get('/', (pet, resp)=>{
    resp.render('index');
})

rInicio.use(rAtletas);
rInicio.use(rDeportes);
rInicio.use(rEventos);
rInicio.use(rPaises)
rInicio.use(rParticipaciones);

export{rInicio}; 