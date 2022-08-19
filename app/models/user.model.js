const pool = require("./db.js");

function cleanLineBreak(str){
    return str.replace(/(\r\n|\n|\r)/gm, "");
}

// constructor
class User {
    
    constructor(user) {
        this.IdUser = user.IdUser;
        this.Username = user.Username;
        this.PasswordHash = user.PasswordHash;
        this.TimeSave = user.TimeSave;
        this.TimeLastUpdate = user.TimeLastUpdate;
    }

    static async register(newUser) {
        const result = await pool.query("INSERT INTO user SET ?", newUser);        
        return result[0].affectedRows;
    }

    static async getAll(){
        const query = "SELECT IdUser, Username, TimeSave FROM user"
        const result = await pool.query(query);

        let users = null;
        if(result[0].length){
            users = result[0];
        }

        return users;
    }

    static async findOne(username) {

        const query = `SELECT * FROM user WHERE Username = '${username}'`;
        const result = await pool.query(query);

        let user = null;        
        if(result[0].length){
            user = result[0][0];
        }

        return user;      
    }

    static async remove(idUser) {
        const query = `DELETE FROM user WHERE IdUser = '${idUser}'`;
        const result = await pool.query(query);

        return result[0].affectedRows;
    }
}

module.exports = User;