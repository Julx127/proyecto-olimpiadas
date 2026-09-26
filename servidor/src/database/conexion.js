import mysql from 'mysql2/promise';

export async function conectar() {
    try {
       const bdd =  await mysql.createPool({
            host: "localhost",
            database: "olimpiadas",
            user: "root",
            password: "286KaidoshuN286",
        })
        console.log("Conectado ;3");
        return bdd;
    } catch (error) {
        console.log("Error al conectar")
    }
}