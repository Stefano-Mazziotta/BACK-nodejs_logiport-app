const pool = require("./db.js");
const stringUtils = require("../utils/stringUtils");

class Motor {
    
    constructor(motor) {
        this.IdMotor = motor.IdMotor;
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

    static async create(newMotor) {

        const queryResult = await pool.query("INSERT INTO motor SET ?", newMotor);
        const affectedRows = queryResult[0].affectedRows;

        return affectedRows;
    }

    static async getAll(motorParams) {

        const { IdCompany, IdBoat, NumberMotor } = motorParams;

        let query = `SELECT motor.*, boat.BoatName FROM motor
        INNER JOIN boat ON motor.IdBoat = boat.IdBoat 
        WHERE motor.IsDeleted = 0 AND boat.IdCompany ='${IdCompany}'`;

        query = stringUtils.cleanLineBreak(query);

        if (IdBoat) {
            query += ` AND motor.IdBoat = '${IdBoat}'`;
        }

        if (NumberMotor) {
            query += ` AND motor.NumberMotor LIKE '%${NumberMotor}%'`;
        }

        const queryResult = await pool.query(query);

        let motors = null;
        if(queryResult[0].length){
            motors = queryResult[0];
        }

        return motors;
    }

    static async findById(idMotor) {
        
        const query = `SELECT * FROM motor WHERE IsDeleted = 0 AND IdMotor = '${idMotor}'`;
        const queryResult = await pool.query(query);

        let motor = null;
        if(queryResult[0].length){
            motor = queryResult[0][0];
        }

        return motor;
    }
    
    static async updateById(motor) {      

        let query = "UPDATE motor SET ";
        query += `IdBoat = '${motor.IdBoat}',`;
        query += `Quantity = '${motor.Quantity}',`;
        query += `Brand = '${motor.Brand}',`;
        query += `NumberMotor = '${motor.NumberMotor}',`;
        query += `Model = '${motor.Model}',`;  
        query += `Type = '${motor.Type}',`;
        query += `Power = '${motor.Power}',`;
        query += `TimeLastUpdate = ${motor.TimeLastUpdate} `;
        query += `WHERE IdMotor = '${motor.IdMotor}' AND IsDeleted = 0;`;

        const queryResult = await pool.query(query);
        const affectedRows = queryResult[0].affectedRows;

        return affectedRows;
    }
    
    static async remove(deleteParams) {

        const { idMotor, timeDeleted } = deleteParams;
        
        const query = `UPDATE motor SET IsDeleted = 1, TimeDeleted = ${timeDeleted} WHERE IdMotor = '${idMotor}' AND IsDeleted = 0`;
        const queryResult = await pool.query(query);

        const affectedRows = queryResult[0].affectedRows;

        return affectedRows;
    }
}

module.exports = Motor;