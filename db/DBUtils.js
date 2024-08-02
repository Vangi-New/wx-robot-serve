import path from 'node:path'
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import SQL3 from "sqlite3";
let sqlite3 = SQL3.verbose();
let db = new sqlite3.Database(__dirname + "/mydb.sqlite3");

class DBUtils{
    constructor(options) {
        this.db = db;
        db.run('CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY, name TEXT, value TEXT)');
    }
    getUser() {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM user",[],(err,rows) => {
                if(err) {
                    reject(err);
                }else {
                    resolve(rows);
                }
            });
        })
    }
    addUser(params) {
        let id, name, value;
        if(params) {
            id = params.id || 10;
            name = params.name || '';
            value = params.value || '';
        }
        let insert_sql = "INSERT INTO `user` (`id`,`name`,`value`) VALUES (?, ?, ?);"
        return new Promise((resolve, reject) => {
            db.run(insert_sql, [id, name, value],(err,rows) => {
                if(err) {
                    reject(err);
                }else {
                    resolve(rows);
                }
            });
        })
    }
};



// module.exports = new DBUtils();
export default new DBUtils();