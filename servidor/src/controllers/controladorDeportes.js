import { conectar } from "../database/conexion.js";

const bd=conectar();

// Render de todas las pags de deportes
export const menuDeportes = (pet, resp) => {
    resp.render('vistasDeportes/menuDeportes');
}
export const crearDeportes = (pet, resp) => {
    resp.render('vistasDeportes/crearDeportes');
}
export const verDeportes = (pet, resp) => {
    resp.render('vistasDeportes/verDeportes');
}
export const modificarDeportes = (pet, resp) => {
    resp.render('vistasDeportes/modificarDeportes');
}
export const eliminarDeportes = (pet, resp) => {
    resp.render('vistasDeportes/eliminarDeportes');
}