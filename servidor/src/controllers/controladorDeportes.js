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
    let id;
    id=pet.query.id;
    id=Number(id);
    try {
        if(!id){
            let consultaSelect=`SELECT * FROM deportes`;
            const [deportes] = await bd.query(consultaSelect);
            resp.render('vistasDeportes/verDeportes', {deportes: deportes});
        } else{
            let consultaSelect=`SELECT * FROM deportes WHERE iddeporte=${id}`;
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