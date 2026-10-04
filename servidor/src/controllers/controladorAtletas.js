import { conectar } from "../database/conexion.js";

const bd= await conectar();

// Render de todas las paginas de atletas
export const menuAtletas = (pet, resp) => {
    resp.render('vistasAtletas/menuAtletas');
}
export const crearAtletas = (pet, resp) => {
    resp.render('vistasAtletas/crearAtletas');
}
export const verAtletas = (pet, resp) => {
    resp.render('vistasAtletas/verAtletas');
}
export const modificarAtletas = (pet, resp) => {
    resp.render('vistasAtletas/modificarAtletas');
}
export const eliminarAtletas = (pet, resp) => {
    resp.render('vistasAtletas/eliminarAtletas');
}
export const atletasConOro = (pet, resp) => {
    resp.render('vistasAtletas/atletasConOro');
}
export const atletasConOroMismoAnio = (pet, resp) => {
    resp.render('vistasAtletas/atletasConOroMismoAnio');
}
export const atletasConPaises = (pet, resp) => {
    resp.render('vistasAtletas/atletasConPaises');
}
export const atletasFemeninas = (pet, resp) => {
    resp.render('vistasAtletas/atletasFemeninas');
}
export const mayoresA30 = (pet, resp) => {
    resp.render('vistasAtletas/mayoresA30');
}
export const promedios = (pet, resp) => {
    resp.render('vistasAtletas/promedios');
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
        resp.redirect('/atletas/verAtletas');
    } catch (error) {
        console.log('Error en la sentencia: ', error);
    }
}