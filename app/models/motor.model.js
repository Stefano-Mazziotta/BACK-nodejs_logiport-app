const sql = require("./db.js");

function cleanLineBreak(str){
    return str.replace(/(\r\n|\n|\r)/gm, "");
}

// constructor
class Motor {
    
    constructor(motor) {
        this.IdBoat = motor.IdBoat;
        this.Quantity = motor.Quantity;
        this.Brand = motor.Brand;
        this.NumberMotor = motor.NumberMotor;
        this.Model = motor.Model;
        this.Type = motor.Type;
        this.Power = motor.Power;
        this.IsDeleted = motor.IsDeleted;
        this.TimeSave = motor.TimeSave;
        this.TimeLastUpdate = motor.TimeLastUpdate;
        this.TimeDeleted = motor.TimeDeleted;
    }

    static async create(newMotor, modelResponseCallback) {
        sql.query("INSERT INTO motor SET ?", newMotor, (queryError, queryResponse) => {

            if (queryError) {
                modelResponseCallback(queryError, null);
                return;
            }
            let motorCreated = { id: queryResponse.insertId, ...newMotor };
            modelResponseCallback(null, motorCreated);
        });
    }

    static getAll(motorParams, modelResponseCallback) {
        let query = `SELECT motor.*, boat.BoatName FROM motor
        INNER JOIN boat ON motor.IdBoat = boat.IdBoat 
        WHERE motor.IsDeleted = 0 AND boat.IdCompany ='${motorParams.IdCompany}'`;

        query = cleanLineBreak(query);

        if (motorParams.IdBoat) {
            query += ` AND IdBoat = '${motorParams.IdBoat}'`;
        }

        if (motorParams.NumberMotor) {
            query += ` AND NumberMotor LIKE '%${motorParams.NumberMotor}%'`;
        }

        sql.query(query, (queryError, queryResponse) => {

            if (queryError) {
                modelResponseCallback(queryError, null);
                return;
            }

            modelResponseCallback(null, queryResponse);
        });
    }

    static findById(IdMotor, modelResponseCallback) {
        sql.query(`SELECT * FROM motor WHERE IsDeleted = 0 AND IdMotor = ${IdMotor}`, (queryError, queryResponse) => {

            if(queryError){
                modelResponseCallback(queryError, null);
                return;
            }
        
            modelResponseCallback(null, queryResponse);
        });
    }
    
    static updateById(IdMotor , motor, modelResponseCallback) {      

        let query = "UPDATE motor SET ";
        query += `IdBoat = '${motor.IdBoat}',`;
        query += `Quantity = '${motor.Quantity}',`;
        query += `Brand = '${motor.Brand}',`;
        query += `NumberMotor = '${motor.NumberMotor}',`;
        query += `Model = '${motor.Model}',`;  
        query += `Type = '${motor.Type}',`;
        query += `Power = '${motor.Power}',`;
        query += `TimeLastUpdate = ${motor.TimeLastUpdate} `;
        query += `WHERE IdMotor = ${IdMotor} AND IsDeleted = 0;`;

        sql.query(query, (queryError, queryResponse) => {

            if(queryError){
                modelResponseCallback(queryError, null);
                return;
            }

            if(queryResponse.affectedRows == 0){
                modelResponseCallback({ kind: "not_found" }, null);
                return;
            }

            console.log("updated motor: ", { id: IdMotor, ...motor });
            modelResponseCallback(null, { id: IdMotor, ...motor });
        });
    }
    
    static remove(IdMotor, modelResponseCallback) {
        let timeDeleted = Date.now();

        sql.query(
            `UPDATE motor SET IsDeleted = 1, TimeDeleted = ${timeDeleted} WHERE IdMotor = ${IdMotor} AND IsDeleted = 0`, 
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

module.exports = Motor;