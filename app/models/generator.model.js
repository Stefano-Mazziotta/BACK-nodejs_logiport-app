const sql = require("./db.js");

function cleanLineBreak(str){
    return str.replace(/(\r\n|\n|\r)/gm, "");
}

// constructor
class Generator {
    
    constructor(generator) {
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

    static async create(newGenerator, modelResponseCallback) {
        sql.query("INSERT INTO generator SET ?", newGenerator, (queryError, queryResponse) => {

            if (queryError) {
                modelResponseCallback(queryError, null);
                return;
            }
            let generatorCreated = { id: queryResponse.insertId, ...newGenerator };
            modelResponseCallback(null, generatorCreated);
        });
    }

    static getAll(generatorParams, modelResponseCallback) {
        let query = `SELECT generator.*, boat.BoatName FROM generator
        INNER JOIN boat ON generator.IdBoat = boat.IdBoat 
        WHERE generator.IsDeleted = 0 AND boat.IdCompany ='${generatorParams.IdCompany}'`;

        query = cleanLineBreak(query);

        if (generatorParams.IdBoat) {
            query += ` AND IdBoat = '${generatorParams.IdBoat}'`;
        }

        if (generatorParams.NumberGenerator) {
            query += ` AND NumberGenerator LIKE '%${generatorParams.NumberGenerator}%'`;
        }

        sql.query(query, (queryError, queryResponse) => {

            if (queryError) {
                modelResponseCallback(queryError, null);
                return;
            }

            modelResponseCallback(null, queryResponse);
        });
    }

    static findById(idGenerator, modelResponseCallback) {
        sql.query(`SELECT * FROM generator WHERE IsDeleted = 0 AND IdGenerator = ${idGenerator}`, (queryError, queryResponse) => {

            if(queryError){
                modelResponseCallback(queryError, null);
                return;
            }
        
            modelResponseCallback(null, queryResponse);
        });
    }
    
    static updateById(idGenerator , generator, modelResponseCallback) {      

        let query = "UPDATE generator SET ";
        query += `IdBoat = '${generator.IdBoat}',`;
        query += `Quantity = '${generator.Quantity}',`;
        query += `Brand = '${generator.Brand}',`;
        query += `NumberGenerator = '${generator.NumberGenerator}',`;
        query += `Model = '${generator.Model}',`;  
        query += `Type = '${generator.Type}',`;
        query += `Power = '${generator.Power}',`;
        query += `TimeLastUpdate = ${generator.TimeLastUpdate} `;
        query += `WHERE IdGenerator = ${idGenerator} AND IsDeleted = 0;`;

        sql.query(query, (queryError, queryResponse) => {

            if(queryError){
                modelResponseCallback(queryError, null);
                return;
            }

            if(queryResponse.affectedRows == 0){
                modelResponseCallback({ kind: "not_found" }, null);
                return;
            }

            console.log("Updated generator: ", { id: idGenerator, ...generator });
            modelResponseCallback(null, { id: idGenerator, ...generator });
        });
    }
    
    static remove(idGenerator, modelResponseCallback) {
        let timeDeleted = Date.now();

        sql.query(
            `UPDATE generator SET IsDeleted = 1, TimeDeleted = ${timeDeleted} WHERE IdGenerator = ${idGenerator} AND IsDeleted = 0`, 
            (queryError, queryResponse) => {

                if (queryError) {
                    modelResponseCallback(null, queryError);
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

module.exports = Generator;