import { conectar } from "../database/conexion.js";

const bd= await conectar();

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

// CRUD deportes
export const crearDeportesSQL= async (pet, resp) => {
    let nombre;
    nombre=pet.body.nombre;
    
    try {
        let consultaInsertar=`INSERT INTO deportes(nombre) VALUES ('${nombre}')`;
        const [registro]=await bd.query(consultaInsertar);
        resp.redirect('/deportes/verDeportes');
    } catch (error) {
        console.log('Error en la sentencia: ', error);
    }
}