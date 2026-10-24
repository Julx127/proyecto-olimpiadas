import { conectar } from "../database/conexion.js";

const bd= await conectar();

// Render de todas las pags de deportes
export const menuDeportes = (pet, resp) => {
    resp.render('vistasDeportes/menuDeportes');
}
export const crearDeportes = (pet, resp) => {
    resp.render('vistasDeportes/crearDeportes');
}
export const verDeportes = async (pet, resp) => {
    let nombre;
    nombre=pet.query.nombre;
    try {
        if(!nombre){
            let consultaSelect=`SELECT * FROM deportes`;
            const [deportes] = await bd.query(consultaSelect);
            resp.render('vistasDeportes/verDeportes', {deportes: deportes});
        } else{
            let consultaSelect=`SELECT * FROM deportes WHERE LOWER(nombre) LIKE LOWER('%${nombre}%')`;
            const [deportes] = await bd.query(consultaSelect);
            resp.render('vistasDeportes/verDeportes', {deportes: deportes});
        }
        
    } catch (error) {
        console.log('Error en la sentencia: ', error);
        resp.render('vistasDeportes/verDeportes', {
            alertaError: true,
        })
    }
}
export const modificarDeportes = (pet, resp) => {
    resp.render('vistasDeportes/modificarDeportes');
}
export const eliminarDeportes = async (pet, resp) => {
    let nombre;
    nombre=pet.query.nombre;
    try {
        if(!nombre){
            resp.render('vistasDeportes/eliminarDeportes', {deportes: []});
        } else{
            let consultaSelect=`SELECT * FROM deportes WHERE LOWER(nombre) LIKE LOWER('%${nombre}%')`;
            const [deportes] = await bd.query(consultaSelect);
            resp.render('vistasDeportes/eliminarDeportes', {deportes: deportes});
        }
        
    } catch (error) {
        console.log('Error en la sentencia: ', error);
        resp.render('vistasDeportes/eliminarDeportes', {
            alertaError: true,
        })
    }
}

// CRUD deportes
export const crearDeportesSQL= async (pet, resp) => {
    let nombre;
    nombre=pet.body.nombre;
    
    try {
        let consultaInsertar=`INSERT INTO deportes(nombre) VALUES ('${nombre}')`;
        const [registro]=await bd.query(consultaInsertar);
        resp.render('vistasDeportes/crearDeportes', {
            alertaExito: true,
        })
    } catch (error) {
        console.log('Error en la sentencia: ', error);
        resp.render('vistasDeportes/crearDeportes', {
            alertaError: true
        })
    }
}

export const eliminarDeportesSQL= async (pet, resp) => {
    let id;
    id=pet.body.id;
    id=Number(id);
    try {
            let consultaEliminar=`DELETE FROM deportes WHERE iddeporte=${id}`;
            const [registro]=await bd.query(consultaEliminar);
            resp.render('vistasDeportes/eliminarDeportes', {
            alertaExito: true,
            deportes: [] 
        })        
    } catch (error) {
        console.log('Error en la sentencia: ', error);
        resp.render('vistasDeportes/eliminarDeportes', {
            alertaError: true,
        })
    }
}