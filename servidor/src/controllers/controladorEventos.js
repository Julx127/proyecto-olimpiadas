import { conectar } from "../database/conexion.js";

const bd= await conectar();

// Render de todas las pags de eventos
export const menuEventos = (pet, resp) => {
    resp.render('vistasEventos/menuEventos');
}
export const crearEventos = (pet, resp) => {
    resp.render('vistasEventos/crearEventos');
}
export const verEventos = (pet, resp) => {
    resp.render('vistasEventos/verEventos');
}
export const modificarEventos = (pet, resp) => {
    resp.render('vistasEventos/modificarEventos');
}
export const eliminarEventos = (pet, resp) => {
    resp.render('vistasEventos/eliminarEventos');
}
export const eventosId1 = (pet, resp) => {
    resp.render('vistasEventos/eventosId1');
}
export const eventosMasParticipantes = (pet, resp) => {
    resp.render('vistasEventos/eventosMasParticipantes');
}

// CRUD eventos
export const crearEventosSQL= async (pet, resp) => {
    let nombreDeporte, descripcion;
    nombreDeporte=pet.body.deporte;
    descripcion=pet.body.descripcion;
    
    try {
        const consultaDeporte = `SELECT iddeporte FROM deportes WHERE nombre COLLATE utf8_unicode_ci='${nombreDeporte}'`; // el collate se usa para que se ignoren las mayusculas, minusculas y tildes
        const [resultadoDeporte]=await bd.query(consultaDeporte);
        const idDeporte=resultadoDeporte[0].iddeporte;

        let consultaInsertar=`INSERT INTO eventos(deportes_iddeporte, descripcion) VALUES ('${idDeporte}', '${descripcion}')`;
        const [registro]=await bd.query(consultaInsertar);
        resp.redirect('/eventos/verEventos');
    } catch (error) {
        console.log('Error en la sentencia: ', error);
        resp.render('vistasEventos/crearEventos', {
            alertaError: true
        })
    }
}