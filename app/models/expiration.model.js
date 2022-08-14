const sql = require("./db.js");

function cleanLineBreak(str){
    return str.replace(/(\r\n|\n|\r)/gm, "");
}

class Expiration {
    
    constructor(expiration) {
        this.IdBoat = expiration.IdBoat;
        this.Title = expiration.Title;
        this.Description = expiration.Description;
        this.ExpirationDate = expiration.ExpirationDate;
        this.IsDeleted = expiration.IsDeleted;
        this.TimeSave = expiration.TimeSave;
        this.TimeLastUpdate = expiration.TimeLastUpdate;
        this.TimeDeleted = expiration.TimeDeleted;
    }

    static async create(newExpiration, modelResponseCallback) {
        sql.query("INSERT INTO expiration SET ?", newExpiration, (queryError, queryResponse) => {

            if (queryError) {
                modelResponseCallback(queryError, null);
                return;
            }
            let expirationCreated = { id: queryResponse.insertId, ...newExpiration };
            modelResponseCallback(null, expirationCreated);
        });
    }

    static getAll(expirationParams, modelResponseCallback) {
        let query = `SELECT expiration.*, boat.BoatName FROM expiration
        INNER JOIN boat ON expiration.IdBoat = boat.IdBoat 
        WHERE expiration.IsDeleted = 0 AND boat.IdCompany ='${expirationParams.IdCompany}'`;

        query = cleanLineBreak(query);

        if (expirationParams.IdBoat) {
            query += ` AND IdBoat = '${expirationParams.IdBoat}'`;
        }

        if (expirationParams.Title) {
            query += ` AND Title LIKE '%${expirationParams.Title}%'`;
        }

        sql.query(query, (queryError, queryResponse) => {

            if (queryError) {
                modelResponseCallback(queryError, null);
                return;
            }

            modelResponseCallback(null, queryResponse);
        });
    }

    static findById(idExpiration, modelResponseCallback) {
        sql.query(`SELECT * FROM expiration WHERE IsDeleted = 0 AND IdExpiration = ${idExpiration}`, (queryError, queryResponse) => {

            if(queryError){
                modelResponseCallback(queryError, null);
                return;
            }
        
            modelResponseCallback(null, queryResponse);
        });
    }
    
    static updateById(idExpiration , expiration, modelResponseCallback) {      

        let query = "UPDATE expiration SET ";
        query += `IdBoat = '${expiration.IdBoat}',`;
        query += `Title = '${expiration.Title}',`;
        query += `Description = '${expiration.Description}',`;
        query += `ExpirationDate = '${expiration.ExpirationDate}',`;  
        query += `TimeLastUpdate = ${expiration.TimeLastUpdate} `;
        query += `WHERE IdExpiration = ${idExpiration} AND IsDeleted = 0;`;

        sql.query(query, (queryError, queryResponse) => {

            if(queryError){
                modelResponseCallback(queryError, null);
                return;
            }

            if(queryResponse.affectedRows == 0){
                modelResponseCallback({ kind: "not_found" }, null);
                return;
            }

            modelResponseCallback(null, { id: idExpiration, ...expiration });
        });
    }
    
    static remove(idExpiration, modelResponseCallback) {

        let timeDeleted = Date.now();
        sql.query(
            `UPDATE expiration SET IsDeleted = 1, TimeDeleted = ${timeDeleted} WHERE IdExpiration = ${idExpiration} AND IsDeleted = 0`, 
            (queryError, queryResponse) => {

                if (queryError) {
                    modelResponseCallback(queryError, null);
                    return;
                }

                if (queryResponse.affectedRows == 0) {
                    modelResponseCallback({ kind: "not_found" }, null);
                    return;
                }

                modelResponseCallback(null, queryResponse);
            }
        );
    }
}

module.exports = Expiration;