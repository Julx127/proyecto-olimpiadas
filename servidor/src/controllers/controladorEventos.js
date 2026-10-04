import { conectar } from "../database/conexion.js";

const bd= await conectar();

// Render de todas las pags de eventos
export const menuEventos = (pet, resp) => {
    resp.render('vistasEventos/menuEventos');
}
export const crearEventos = (pet, resp) => {
    resp.render('vistasEventos/crearEventos');
}
export const verEventos = (pet, resp) => {
    resp.render('vistasEventos/verEventos');
}
export const modificarEventos = (pet, resp) => {
    resp.render('vistasEventos/modificarEventos');
}
export const eliminarEventos = (pet, resp) => {
    resp.render('vistasEventos/eliminarEventos');
}
export const eventosId1 = (pet, resp) => {
    resp.render('vistasEventos/eventosId1');
}
export const eventosMasParticipantes = (pet, resp) => {
    resp.render('vistasEventos/eventosMasParticipantes');
}