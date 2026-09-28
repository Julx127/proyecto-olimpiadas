import { conectar } from "../database/conexion.js";

const bd=conectar();

// Render de todas las pags de participaciones
export const menuParticipaciones = (pet, resp) => {
    resp.render('vistasParticipaciones/menuParticipaciones');
}
export const crearParticipaciones = (pet, resp) => {
    resp.render('vistasParticipaciones/crearParticipaciones');
}
export const verParticipaciones = (pet, resp) => {
    resp.render('vistasParticipaciones/verParticipaciones');
}
export const modificarParticipaciones = (pet, resp) => {
    resp.render('vistasParticipaciones/modificarParticipaciones');
}
export const eliminarParticipaciones = (pet, resp) => {
    resp.render('vistasParticipaciones/eliminarParticipaciones');
}