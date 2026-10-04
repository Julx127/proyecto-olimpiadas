import mysql from 'mysql2/promise';

export async function conectar() {
    try {
       const bd =  await mysql.createPool({
            host: "localhost",
            database: "olimpiadas",
            user: "root",
            password: "286KaidoshuN286",
        })
        console.log("BD conectada ;3");
        return bd;
    } catch (error) {
        console.log("Error al conectar")
    }
}