const pool = require("./db.js");
const stringUtils = require("../utils/stringUtils");
const ExpirationService = require("../services/expiration.service");

class Expiration {
    
    constructor(expiration) {
        this.IdExpiration = expiration.IdExpiration;
        this.IdBoat = expiration.IdBoat;
        this.Title = expiration.Title;
        this.Description = expiration.Description;
        this.ExpirationDate = expiration.ExpirationDate;
        this.IsDeleted = expiration.IsDeleted;
        this.TimeSave = expiration.TimeSave;
        this.TimeLastUpdate = expiration.TimeLastUpdate;
        this.TimeDeleted = expiration.TimeDeleted;
    }

    static async create(newExpiration) {

        const queryResult = await pool.query("INSERT INTO expiration SET ?", newExpiration);
        const affectedRows = queryResult[0].affectedRows;

        return affectedRows;
    }

    static async getAll(getAllParams) {

        const { idCompany, idBoat, title } = getAllParams;

        let query = `SELECT expiration.*, boat.BoatName FROM expiration
        INNER JOIN boat ON expiration.IdBoat = boat.IdBoat 
        WHERE expiration.IsDeleted = 0 AND boat.IdCompany ='${idCompany}'`;

        query = stringUtils.cleanLineBreak(query);

        if (idBoat) {
            query += ` AND expiration.IdBoat = '${idBoat}'`;
        }

        if (title) {
            query += ` AND expiration.Title LIKE '%${title}%'`;
        }

        const queryResult = await pool.query(query);
        
        let expirations = null;
        if(queryResult[0].length){
            expirations = queryResult[0];

            expirations.forEach(expiration => {
                const { ExpirationDate } = expiration;
                expiration.DaysToExpiration = ExpirationService.getDaysToExpiration(ExpirationDate)
                expiration.Status = ExpirationService.calculateStatus(expiration);
            });
        }

        return expirations;
    }

    static async findById(idExpiration) {
        const query = `SELECT * FROM expiration WHERE IsDeleted = 0 AND IdExpiration = '${idExpiration}'`;
        const queryResult = await pool.query(query);

        let expiration = null;
        if(queryResult[0].length){
            expiration = queryResult[0][0];

            const { ExpirationDate } = expiration;
            
            expiration.DaysToExpiration = ExpirationService.getDaysToExpiration(ExpirationDate)
            expiration.Status = ExpirationService.calculateStatus(expiration);
        }

        return expiration;
    }
    
    static async updateById(expiration) {      

        let query = "UPDATE expiration SET ";
        query += `IdBoat = '${expiration.IdBoat}',`;
        query += `Title = '${expiration.Title}',`;
        query += `Description = '${expiration.Description}',`;
        query += `ExpirationDate = '${expiration.ExpirationDate}',`;  
        query += `TimeLastUpdate = ${expiration.TimeLastUpdate} `;
        query += `WHERE IdExpiration = '${expiration.IdExpiration}' AND IsDeleted = 0;`;

        const queryResult = await pool.query(query);
        const affectedRows = queryResult[0].affectedRows;

        return affectedRows;
    }
    
    static async remove(deleteParams) {

        const { idExpiration, timeDeleted } = deleteParams;
        const query = `UPDATE expiration SET IsDeleted = 1, TimeDeleted = ${timeDeleted} WHERE IdExpiration = '${idExpiration}' AND IsDeleted = 0`;

        const queryResult = await pool.query(query);
        const affectedRows = queryResult[0].affectedRows;

        return affectedRows;        
    }
}

module.exports = Expiration;