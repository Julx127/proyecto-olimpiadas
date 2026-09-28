import { conectar } from "../database/conexion.js";

const bd=conectar();

// Render de todas las paginas de atletas
export const menuAtletas = (pet, resp) => {
    resp.render('vistasAtletas/menuAtletas');
}
export const crearAtletas = (pet, resp) => {
    resp.render('vistasAtletas/crearAtletas');
}
export const verAtletas = (pet, resp) => {
    resp.render('vistasAtletas/verAtletas');
}
export const modificarAtletas = (pet, resp) => {
    resp.render('vistasAtletas/modificarAtletas');
}
export const eliminarAtletas = (pet, resp) => {
    resp.render('vistasAtletas/eliminarAtletas');
}
export const atletasConOro = (pet, resp) => {
    resp.render('vistasAtletas/atletasConOro');
}
export const atletasConOroMismoAnio = (pet, resp) => {
    resp.render('vistasAtletas/atletasConOroMismoAnio');
}
export const atletasConPaises = (pet, resp) => {
    resp.render('vistasAtletas/atletasConPaises');
}
export const atletasFemeninas = (pet, resp) => {
    resp.render('vistasAtletas/atletasFemeninas');
}
export const mayoresA30 = (pet, resp) => {
    resp.render('vistasAtletas/mayoresA30');
}
export const promedios = (pet, resp) => {
    resp.render('vistasAtletas/promedios');
}
