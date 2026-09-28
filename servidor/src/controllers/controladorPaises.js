import { conectar } from "../database/conexion.js";

const bd=conectar();

// Render de todas las pags de paises
export const menuPaises = (pet, resp) => {
    resp.render('vistasPaises/menuPaises');
}
export const crearPaises = (pet, resp) => {
    resp.render('vistasPaises/crearPaises');
}
export const verPaises = (pet, resp) => {
    resp.render('vistasPaises/verPaises');
}
export const modificarPaises = (pet, resp) => {
    resp.render('vistasPaises/modificarPaises');
}
export const eliminarPaises = (pet, resp) => {
    resp.render('vistasPaises/eliminarPaises');
}
export const paisesConSusAtletas = (pet, resp) => {
    resp.render('vistasPaises/paisesConSusAtletas');
}
export const paisesMasMedallas = (pet, resp) => {
    resp.render('vistasPaises/paisesMasMedallas');
}
export const paisesSinMedalla = (pet, resp) => {
    resp.render('vistasPaises/paisesSinMedalla');
}