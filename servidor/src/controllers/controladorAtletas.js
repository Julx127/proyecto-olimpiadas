import { conectar } from "../database/conexion.js";

const bd= await conectar();

// Render de todas las paginas de atletas
export const menuAtletas = (pet, resp) => {
    resp.render('vistasAtletas/menuAtletas');
}
export const crearAtletas = (pet, resp) => {
    resp.render('vistasAtletas/crearAtletas');
}
export const verAtletas = async (pet, resp) => {
    let id;
    id=pet.query.id;
    id=Number(id);
    try {
        if(!id){
            let consultaSelect=`SELECT * FROM atletas`;
            const [atletas] = await bd.query(consultaSelect);
            resp.render('vistasAtletas/verAtletas', {atletas: atletas});
        } else{
            let consultaSelect=`SELECT * FROM atletas WHERE idatleta=${id}`;
            const [atletas] = await bd.query(consultaSelect);
            resp.render('vistasAtletas/verAtletas', {atletas: atletas});
        }
        
    } catch (error) {
        console.log('Error en la sentencia: ', error);
        resp.render('vistasAtletas/verAtletas', {
            alertaError: true,
        })
    }
}
export const modificarAtletas = (pet, resp) => {
    resp.render('vistasAtletas/modificarAtletas');
}
export const eliminarAtletas = (pet, resp) => {
    resp.render('vistasAtletas/eliminarAtletas');
}
export const atletasConOro = async (pet, resp) => {
    try {
        let consultaSelect=`SELECT p.idparticipacion, a.nombre, e.descripcion, p.anio, p.medalla
                                FROM participaciones AS p
                                INNER JOIN atletas AS a
                                ON p.atletas_idatleta = a.idatleta
                                INNER JOIN eventos AS e
                                ON p.eventos_idevento = e.idevento
                                WHERE medalla='Oro'`;
        const [atletas] = await bd.query(consultaSelect);
        resp.render('vistasAtletas/atletasConOro', {atletas: atletas})
    } catch (error) {
        console.log('Error en la sentencia: ', error);
        resp.render('vistasAtletas/atletasConOro', {
            alertaError: true,
        })
    }
}
export const atletasConOroMismoAnio = async (pet, resp) => {
    try {
        let consultaSelect=`SELECT p.idparticipacion, a.nombre, e.descripcion, p.anio, p.medalla
                                FROM participaciones AS p
                                INNER JOIN atletas AS a
                                ON p.atletas_idatleta = a.idatleta
                                INNER JOIN eventos AS e
                                ON p.eventos_idevento = e.idevento
                                WHERE medalla='Oro'`;
        const [atletas] = await bd.query(consultaSelect);
        resp.render('vistasAtletas/atletasConOro', {atletas: atletas})
    } catch (error) {
        console.log('Error en la sentencia: ', error);
        resp.render('vistasAtletas/atletasConOro', {
            alertaError: true,
        })
    }
}
export const atletasConPaises = async (pet, resp) => {
    try {
        let consultaSelect=`SELECT paises_ISO, nombre FROM atletas`;
        const [atletas] = await bd.query(consultaSelect);
        resp.render('vistasAtletas/atletasConPaises', {atletas: atletas})
    } catch (error) {
        console.log('Error en la sentencia: ', error);
        resp.render('vistasAtletas/atletasConPaises', {
            alertaError: true,
        })
    }
}
export const atletasFemeninas = async (pet, resp) => {
    try {
        let consultaSelect=`SELECT * FROM atletas WHERE genero='Femenino'`;
        const [atletas] = await bd.query(consultaSelect);
        atletas.sort((a, b) => a.nombre.localeCompare(b.nombre));
        resp.render('vistasAtletas/atletasFemeninas', {atletas: atletas})
    } catch (error) {
        console.log('Error en la sentencia: ', error);
        resp.render('vistasAtletas/atletasFemeninas', {
            alertaError: true,
        })
    }
}
export const mayoresA30 = async (pet, resp) => {
    try {
        let consultaSelect=`SELECT * FROM atletas WHERE edad>30`;
        const [atletas] = await bd.query(consultaSelect);
        resp.render('vistasAtletas/mayoresA30', {atletas: atletas})
    } catch (error) {
        console.log('Error en la sentencia: ', error);
        resp.render('vistasAtletas/mayoresA30', {
            alertaError: true,
        })
    }
}
export const promedios = async (pet, resp) => {
    try {
        let consultaSelect=`SELECT estatura, peso FROM atletas`;
        const [atletas] = await bd.query(consultaSelect);
        resp.render('vistasAtletas/promedios', {atletas: atletas})
    } catch (error) {
        console.log('Error en la sentencia: ', error);
        resp.render('vistasAtletas/promedios', {
            alertaError: true,
        })
    }
}

// CRUD atletas
export const crearAtletasSQL= async (pet, resp) => {
    let nombrePais, nombre, genero, edad, estatura, peso;
    nombrePais=pet.body.nombrePais;
    nombre=pet.body.nombre;
    genero=pet.body.genero;
    edad=pet.body.edad;
    estatura=pet.body.estatura;
    peso=pet.body.peso;

    try {
        const consultaPais = `SELECT ISO FROM paises WHERE nombre COLLATE utf8_unicode_ci='${nombrePais}'`;
        const [resultadoPais]=await bd.query(consultaPais);
        const ISOpais=resultadoPais[0].ISO;

        let consultaInsertar=`INSERT INTO atletas (paises_iso, nombre, genero, edad, estatura, peso) VALUES ('${ISOpais}', '${nombre}', '${genero}', '${edad}', '${estatura}', '${peso}')`;
        const [registro]=await bd.query(consultaInsertar);
        resp.render('vistasAtletas/crearAtletas', {
            alertaExito: true,
        })
    } catch (error) {
        console.log('Error en la sentencia: ', error);
        resp.render('vistasAtletas/crearAtletas', {
            alertaError: true
        })
    }
}