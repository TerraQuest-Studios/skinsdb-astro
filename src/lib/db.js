import mariadb from "mysql2/promise";

//this ..... mess of a file exists so that i can fix these sins later

const pool = mariadb.createPool({
    host: import.meta.env.DB_HOST, 
    user: import.meta.env.DB_USER, 
    database: import.meta.env.DB_DATABASE,
    password: import.meta.env.DB_PASSWORD,
    connectionLimit: import.meta.env.DB_CONNECTIONLIMIT,
});

class Database {

    async query(sql, params) {
        let conn;
        try {
            conn = await pool.getConnection();
            let result = await conn.execute(sql, params);
            conn.release();
            return result[0]; //return the result of the query, not scheme info
        } catch(err) {
            console.log(err);
        }
    }
}
  
const db = new Database();

export {db};