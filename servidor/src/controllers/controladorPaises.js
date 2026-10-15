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
    let ISO;
    ISO=pet.query.ISO;

    try {
        if(!ISO){
            let consultaSelect=`SELECT * FROM paises`;
            const [paises] = await bd.query(consultaSelect);
            resp.render('vistasPaises/verPaises', {paises: paises});
        } else{
            ISO=ISO.toUpperCase();
            let consultaSelect=`SELECT * FROM paises WHERE ISO='${ISO}'`;
            const [paises] = await bd.query(consultaSelect);
            resp.render('vistasPaises/verPaises', {paises: paises});
        }
        
    } catch (error) {
        console.log('Error en la sentencia: ', error);
        resp.render('vistasPaises/verPaises', {
            alertaError: true,
        })
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
    ISO=ISO.toUpperCase();
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
