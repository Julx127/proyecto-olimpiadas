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
    let nombre;
    nombre=pet.query.nombre;
    try {
        if(!nombre){
            let consultaSelect=`SELECT * FROM paises`;
            const [paises] = await bd.query(consultaSelect);
            resp.render('vistasPaises/verPaises', {paises: paises});
        } else{
            let consultaSelect=`SELECT * FROM paises WHERE LOWER(nombre) LIKE LOWER('%${nombre}%')`;
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
export const eliminarPaises = async (pet, resp) => {
    let nombre;
    nombre=pet.query.nombre;
    try {
        if(!nombre){
            resp.render('vistasPaises/eliminarPaises', {paises: [] });
        } else{
            let consultaSelect=`SELECT * FROM paises WHERE LOWER(nombre) LIKE LOWER('%${nombre}%')`;
            const [paises] = await bd.query(consultaSelect);
            resp.render('vistasPaises/eliminarPaises', {paises: paises});
        }
        
    } catch (error) {
        console.log('Error en la sentencia: ', error);
        resp.render('vistasPaises/eliminarPaises', {
            alertaError: true,
        })
    }
}
export const paisesConSusAtletas = async (pet, resp) => {
    try {
        let consultaSelect=`SELECT nombre, paises_ISO FROM atletas`;
        const [paises] = await bd.query(consultaSelect);
        resp.render('vistasPaises/paisesConSusAtletas', {paises: paises});
    } catch (error) {
        console.log('Error en la sentencia: ', error);
        resp.render('vistasPaises/paisesConSusAtletas', {
            alertaError: true,
        })
    }
}
export const paisesMasMedallas = async (pet, resp) => {
    try {
        // creo una "tabla de posiciones" con WITH posiciones AS (), y ordeno la tabla con DENSE_RANK()
        let consultaSelect=`WITH posiciones AS (
                                SELECT paises.ISO, paises.nombre, COUNT(participaciones.medalla) AS total_medallas,
                                    DENSE_RANK() OVER (ORDER BY COUNT(participaciones.medalla) DESC) AS ranking
                                FROM paises
                                LEFT JOIN atletas ON paises.ISO = atletas.paises_ISO
                                LEFT JOIN participaciones ON atletas.idatleta = participaciones.atletas_idatleta
                                GROUP BY paises.ISO, paises.nombre
                            )
                            SELECT ISO, nombre, total_medallas
                            FROM posiciones
                            WHERE ranking = 1
                            `;
        const [paises] = await bd.query(consultaSelect);
        resp.render('vistasPaises/paisesMasMedallas', {paises: paises});
    } catch (error) {
        console.log('Error en la sentencia: ', error);
        resp.render('vistasPaises/paisesMasMedallas', {
            alertaError: true,
        })
    }
}
export const paisesSinMedalla = async (pet, resp) => {
    try {
        // el LEFT JOIN permite traer todos los valores de la tabla izquierda y los que coincidan con la derecha (permitiendo los NULL), mientras que el INNER JOIN solo me permitiria traer los valores que coincidan en ambas tablas
        let consultaSelect=`SELECT paises.ISO, paises.nombre, COUNT(participaciones.medalla) AS total_medallas
                            FROM  paises
                            LEFT JOIN  atletas ON paises.ISO = atletas.paises_ISO
                            LEFT JOIN  participaciones ON atletas.idatleta = participaciones.atletas_idatleta
                            GROUP BY paises.ISO, paises.nombre
                            HAVING total_medallas = 0;
                            `;
        const [paises] = await bd.query(consultaSelect);
        resp.render('vistasPaises/paisesSinMedalla', {paises: paises});
    } catch (error) {
        console.log('Error en la sentencia: ', error);
        resp.render('vistasPaises/paisesSinMedalla', {
            alertaError: true,
        })
    }
}

// CRUD paises
export const crearPaisesSQL= async (pet, resp) => {
    let ISO, nombre, continente;
    ISO=pet.body.ISO;
    ISO=ISO.toUpperCase();
    nombre=pet.body.nombre;
    continente=pet.body.continente;
    
    try {
        let consultaInsertar=`INSERT INTO paises(ISO, nombre, continente) VALUES ('${ISO}', '${nombre}', '${continente}')`;
        const [registro]=await bd.query(consultaInsertar);
        resp.render('vistasPaises/crearPaises', {
            alertaExito: true,
        })
    } catch (error) {
        console.log('Error en la sentencia: ', error);
        resp.render('vistasPaises/crearPaises', {
            alertaError: true
        })
    }
}
export const eliminarPaisesSQL = async (pet, resp) => {
    let ISO;
    ISO=pet.body.ISO;
    ISO=ISO.toUpperCase();
    try {
            let consultaEliminar=`DELETE FROM paises WHERE ISO='${ISO}'`;
            const [registro]=await bd.query(consultaEliminar);
            resp.render('vistasPaises/eliminarPaises', {
            alertaExito: true,
            paises: [] 
        })        
    } catch (error) {
        console.log('Error en la sentencia: ', error);
        resp.render('vistasPaises/eliminarPaises', {
            alertaError: true,
        })
    }
}