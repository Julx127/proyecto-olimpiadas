import { conectar } from "../database/conexion.js";

const bd= await conectar();

// Render de todas las pags de eventos
export const menuEventos = (pet, resp) => {
    resp.render('vistasEventos/menuEventos');
}
export const crearEventos = (pet, resp) => {
    resp.render('vistasEventos/crearEventos');
}
export const verEventos = async (pet, resp) => {
    let descripcion;
    descripcion=pet.query.descripcion;
    try {
        if(!descripcion){
            let consultaSelect=`SELECT e.idevento, d.nombre, e.descripcion
                                FROM eventos AS e
                                INNER JOIN deportes AS d
                                ON e.deportes_iddeporte = d.iddeporte`;
            const [eventos] = await bd.query(consultaSelect);
            resp.render('vistasEventos/verEventos', {eventos: eventos});
        } else{
            let consultaSelect=`SELECT e.idevento, d.nombre, e.descripcion
                                FROM eventos AS e
                                INNER JOIN deportes AS d
                                ON e.deportes_iddeporte = d.iddeporte
                                WHERE LOWER(descripcion) LIKE LOWER('%${descripcion}%')`;
            const [eventos] = await bd.query(consultaSelect);
            resp.render('vistasEventos/verEventos', {eventos: eventos});
        }
        
    } catch (error) {
        console.log('Error en la sentencia: ', error);
        resp.render('vistasEventos/verEventos', {
            alertaError: true,
        })
    }
}
export const modificarEventos = (pet, resp) => {
    resp.render('vistasEventos/modificarEventos');
}
export const eliminarEventos = async (pet, resp) => {
    let descripcion;
    descripcion=pet.query.descripcion;
    try {
        if(!descripcion){
            resp.render('vistasEventos/eliminarEventos', {eventos: []});
        } else{
            let consultaSelect=`SELECT e.idevento, d.nombre, e.descripcion
                                FROM eventos AS e
                                INNER JOIN deportes AS d
                                ON e.deportes_iddeporte = d.iddeporte
                                WHERE LOWER(descripcion) LIKE LOWER('%${descripcion}%')`;
            const [eventos] = await bd.query(consultaSelect);
            resp.render('vistasEventos/eliminarEventos', {eventos: eventos});
        }
        
    } catch (error) {
        console.log('Error en la sentencia: ', error);
        resp.render('vistasEventos/eliminarEventos', {
            alertaError: true,
        })
    }
}
export const eventosId1 = async (pet, resp) => {
    try {
            let consultaSelect=`SELECT e.idevento, d.nombre, e.descripcion
                                FROM eventos AS e
                                INNER JOIN deportes AS d
                                ON e.deportes_iddeporte = d.iddeporte
                                WHERE e.deportes_iddeporte=1`;
            const [eventos] = await bd.query(consultaSelect);
            resp.render('vistasEventos/eventosId1', {eventos: eventos});        
    } catch (error) {
        console.log('Error en la sentencia: ', error);
        resp.render('vistasEventos/eventosId1', {
            alertaError: true,
        })
    }
}
export const eventosMasParticipantes = async (pet, resp) => {
    try {
            let consultaSelect=`WITH posiciones AS (
                                SELECT 
                                    e.idevento, 
                                    e.descripcion, 
                                    d.nombre AS nombre_deporte,
                                    COUNT(DISTINCT p.atletas_idatleta) AS total_participantes,
                                    DENSE_RANK() OVER (ORDER BY COUNT(DISTINCT p.atletas_idatleta) DESC) AS ranking
                                FROM participaciones p
                                INNER JOIN eventos e ON p.eventos_idevento = e.idevento
                                INNER JOIN deportes d ON e.deportes_iddeporte = d.iddeporte
                                GROUP BY e.idevento, e.descripcion, d.nombre
                                )
                                SELECT idevento, descripcion, nombre_deporte, total_participantes
                                FROM posiciones
                                WHERE ranking = 1`;
            const [eventos] = await bd.query(consultaSelect);
            resp.render('vistasEventos/eventosMasParticipantes', {eventos: eventos});        
    } catch (error) {
        console.log('Error en la sentencia: ', error);
        resp.render('vistasEventos/eventosMasParticipantes', {
            alertaError: true,
        })
    }
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
        resp.render('vistasEventos/crearEventos', {
            alertaExito: true,
        })
    } catch (error) {
        console.log('Error en la sentencia: ', error);
        resp.render('vistasEventos/crearEventos', {
            alertaError: true
        })
    }
}

export const eliminarEventosSQL= async (pet, resp) => {
    let id;
    id=pet.body.id;
    id=Number(id);
    try {
            let consultaEliminar=`DELETE FROM eventos WHERE idevento=${id}`;
            const [registro]=await bd.query(consultaEliminar);
            resp.render('vistasEventos/eliminarEventos', {
            alertaExito: true,
            eventos: [] 
        })        
    } catch (error) {
        console.log('Error en la sentencia: ', error);
        resp.render('vistasEventos/eliminarEventos', {
            alertaError: true,
        })
    }
}