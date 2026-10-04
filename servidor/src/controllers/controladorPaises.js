import { conectar } from "../database/conexion.js";

const bd= await conectar();

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

// CRUD paises
export const crearPaisesSQL= async (pet, resp) => {
    let ISO, nombre, continente;
    ISO=pet.body.ISO;
    nombre=pet.body.nombre;
    continente=pet.body.continente;
    
    try {
        let consultaInsertar=`INSERT INTO paises(ISO, nombre, continente) VALUES ('${ISO}', '${nombre}', '${continente}')`;
        const [registro]=await bd.query(consultaInsertar);
        resp.redirect('/paises/verPaises');
    } catch (error) {
        console.log('Error en la sentencia: ', error);
    }
}