const pool = require("./db.js");
const stringUtils = require("../utils/stringUtils");

class Generator {
    
    constructor(generator) {
        this.IdGenerator = generator.IdGenerator;
        this.IdBoat = generator.IdBoat;
        this.Quantity = generator.Quantity;
        this.Brand = generator.Brand;
        this.NumberGenerator = generator.NumberGenerator;
        this.Model = generator.Model;
        this.Type = generator.Type;
        this.Power = generator.Power;
        this.IsDeleted = generator.IsDeleted;
        this.TimeSave = generator.TimeSave;
        this.TimeLastUpdate = generator.TimeLastUpdate;
        this.TimeDeleted = generator.TimeDeleted;
    }

    static async create(newGenerator) {
        
        const queryResult = await pool.query("INSERT INTO generator SET ?", newGenerator);
        const affectedRows = queryResult[0].affectedRows;

        return affectedRows;
    }

    static async getAll(getAllParams) {

        const { idCompany, idBoat, numberGenerator } = getAllParams;

        let query = `SELECT generator.*, boat.BoatName FROM generator
        INNER JOIN boat ON generator.IdBoat = boat.IdBoat 
        WHERE generator.IsDeleted = 0 AND boat.IdCompany ='${idCompany}'`;

        query = stringUtils.cleanLineBreak(query);

        if (idBoat) {
            query += ` AND generator.IdBoat = '${idBoat}'`;
        }

        if (numberGenerator) {
            query += ` AND generator.NumberGenerator LIKE '%${numberGenerator}%'`;
        }

        const queryResult = await pool.query(query);
        
        let generators = null
        if(queryResult[0].length){
            generators = queryResult[0];
        }

        return generators;
    }

    static async findById(idGenerator) {
        
        const query = `SELECT * FROM generator WHERE IsDeleted = 0 AND IdGenerator = '${idGenerator}'`;
        const queryResult = await pool.query(query);

        let generator = null;
        if(queryResult[0].length){
            generator = queryResult[0][0];
        }

        return generator;       
    }
    
    static async updateById(generator) {      

        let query = "UPDATE generator SET ";
        query += `IdBoat = '${generator.IdBoat}',`;
        query += `Quantity = '${generator.Quantity}',`;
        query += `Brand = '${generator.Brand}',`;
        query += `NumberGenerator = '${generator.NumberGenerator}',`;
        query += `Model = '${generator.Model}',`;  
        query += `Type = '${generator.Type}',`;
        query += `Power = '${generator.Power}',`;
        query += `TimeLastUpdate = ${generator.TimeLastUpdate} `;
        query += `WHERE IdGenerator = '${generator.IdGenerator}' AND IsDeleted = 0;`;

        const queryResult = await pool.query(query);
        const affectedRows = queryResult[0].affectedRows;

        return affectedRows;
    }
    
    static async remove(deleteParams) {

        const { idGenerator, timeDeleted } = deleteParams;

        const query = `UPDATE generator SET IsDeleted = 1, TimeDeleted = ${timeDeleted} WHERE IdGenerator = '${idGenerator}' AND IsDeleted = 0`;
        const queryResult = await pool.query(query);

        const affectedRows = queryResult[0].affectedRows;
        return affectedRows;
    }
}

module.exports = Generator;