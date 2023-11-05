import mariadb from "mariadb";

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
            let result = conn.execute(sql, params);
            conn.release();
            return result;
        } catch(err) {
            console.log(err);
        }
    }
}
  
const db = new Database();

export {db};