import { conectar } from "../database/conexion.js";

const bd= await conectar();

// Render de todas las pags de participaciones
export const menuParticipaciones = (pet, resp) => {
    resp.render('vistasParticipaciones/menuParticipaciones');
}
export const crearParticipaciones = (pet, resp) => {
    resp.render('vistasParticipaciones/crearParticipaciones');
}
export const verParticipaciones = async (pet, resp) => {
    let id;
    id=pet.query.id;
    id=Number(id);
    try {
        if(!id){
            let consultaSelect=`SELECT p.idparticipacion, a.nombre, e.descripcion, p.anio, p.medalla
                                FROM participaciones AS p
                                INNER JOIN atletas AS a
                                ON p.atletas_idatleta = a.idatleta
                                INNER JOIN eventos AS e
                                ON p.eventos_idevento = e.idevento`;
            const [participaciones] = await bd.query(consultaSelect);
            resp.render('vistasParticipaciones/verParticipaciones', {participaciones: participaciones});
        } else{
            let consultaSelect=`SELECT p.idparticipacion, a.nombre, e.descripcion, p.anio, p.medalla
                                FROM participaciones AS p
                                INNER JOIN atletas AS a
                                ON p.atletas_idatleta = a.idatleta
                                INNER JOIN eventos AS e
                                ON p.eventos_idevento = e.idevento
                                WHERE idparticipacion=${id}`;
            const [participaciones] = await bd.query(consultaSelect);
            resp.render('vistasParticipaciones/verParticipaciones', {participaciones: participaciones});
        }
        
    } catch (error) {
        console.log('Error en la sentencia: ', error);
        resp.render('vistasParticipacion/verParticipacion', {
            alertaError: true,
        })
    }
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
        resp.render('vistasParticipacion/crearParticipacion', {
            alertaExito: true,
        })
    } catch (error) {
        console.log('Error en la sentencia: ', error);
        resp.render('vistasParticipaciones/crearParticipaciones', {
            alertaError: true
        })
    }
}