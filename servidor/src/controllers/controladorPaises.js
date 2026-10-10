import { conectar } from "../database/conexion.js";

const bd= await conectar();

// Render de todas las pags de paises
export const menuPaises = (pet, resp) => {
    resp.render('vistasPaises/menuPaises');
}
export const crearPaises = (pet, resp) => {
    resp.render('vistasPaises/crearPaises');
}
export const verPaises = async (pet, resp) => {
    // un select de toda la tabla paises
    try {
        let consultaSelect=`SELECT * FROM paises`;
        const [paises] = await bd.query(consultaSelect)
        console.log(paises);
        resp.render('vistasPaises/verPaises', {paises: paises});
    } catch (error) {
        
    }
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

// CREATE paises
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
        resp.render('vistasPaises/crearPaises', {
            alertaError: true
        })
    }
}
