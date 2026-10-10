import { conectar } from "../database/conexion.js";

const bd= await conectar();

// Render de todas las pags de participaciones
export const menuParticipaciones = (pet, resp) => {
    resp.render('vistasParticipaciones/menuParticipaciones');
}
export const crearParticipaciones = (pet, resp) => {
    resp.render('vistasParticipaciones/crearParticipaciones');
}
export const verParticipaciones = (pet, resp) => {
    resp.render('vistasParticipaciones/verParticipaciones');
}
export const modificarParticipaciones = (pet, resp) => {
    resp.render('vistasParticipaciones/modificarParticipaciones');
}
export const eliminarParticipaciones = (pet, resp) => {
    resp.render('vistasParticipaciones/eliminarParticipaciones');
}

// CRUD participaciones
export const crearParticipacionesSQL= async (pet, resp) => {
    let nombreAtleta, descripcionEvento, anio, medalla;
    nombreAtleta=pet.body.nombreAtleta;
    descripcionEvento=pet.body.descripcionEvento;
    anio=pet.body.anio;
    medalla=pet.body.medalla;

    try {
        const consultaAtleta = `SELECT idatleta FROM atletas WHERE nombre COLLATE utf8_unicode_ci='${nombreAtleta}'`;
        const [resultadoAtleta]=await bd.query(consultaAtleta);
        const idAtleta=resultadoAtleta[0].idatleta;

        const consultaEvento = `SELECT idevento FROM eventos WHERE descripcion COLLATE utf8_unicode_ci='${descripcionEvento}'`;
        const [resultadoEvento]=await bd.query(consultaEvento);
        const idEvento=resultadoEvento[0].idevento;

        let consultaInsertar=`INSERT INTO participaciones (atletas_idatleta, eventos_idevento, anio, medalla) VALUES ('${idAtleta}', '${idEvento}', '${anio}', '${medalla}')`;
        const [registro]=await bd.query(consultaInsertar);
        resp.redirect('/participaciones/verParticipaciones');
    } catch (error) {
        console.log('Error en la sentencia: ', error);
        resp.render('vistasParticipaciones/crearParticipaciones', {
            alertaError: true
        })
    }
}