const pool = require("./db.js");

class Boat {
    
    constructor(boat) {
        this.IdBoat = boat.IdBoat;
        this.IdCompany = boat.IdCompany;
        this.BoatName = boat.BoatName;
        this.Enrollment = boat.Enrollment;
        this.DistinguishingMark = boat.DistinguishingMark;
        this.HullMaterial = boat.HullMaterial;
        this.BoatType = boat.BoatType;
        this.Service = boat.Service;
        this.SpecificExploitation = boat.SpecificExploitation;
        this.EnrollmentDate = boat.EnrollmentDate;
        this.ConstructionDate = boat.ConstructionDate;
        this.NAT = boat.NAT;
        this.NAN = boat.NAN;
        this.Eslora = boat.Eslora;
        this.Manga = boat.Manga;
        this.Puntal = boat.Puntal;
        this.PeopleTransported = boat.PeopleTransported;
        this.BoatPower = boat.BoatPower;
        this.ElectricPower = boat.ElectricPower;
        this.IsDeleted = boat.IsDeleted;
        this.TimeSave = boat.TimeSave;
        this.TimeLastUpdate = boat.TimeLastUpdate;
        this.TimeDeleted = boat.TimeDeleted;
    }

    static async create(newBoat) {

        const queryResult = await pool.query("INSERT INTO boat SET ?", newBoat);
        const affectedRows = queryResult[0].affectedRows;

        return affectedRows;
    }

    static async getAll(boatParams) {

        let query = `SELECT * FROM boat WHERE IsDeleted = 0 AND IdCompany ='${boatParams.IdCompany}'`;
        if (boatParams.BoatName) {
            query += ` AND BoatName LIKE '%${boatParams.BoatName}%'`;
        }

        const queryResult = await pool.query(query);

        let boats = null;
        if(queryResult[0].length){
            boats = queryResult[0];
        }

        return boats;
    }

    static async findById(idBoat) {

        const queryResult = await pool.query(`SELECT * FROM boat WHERE IsDeleted = 0 AND IdBoat = '${idBoat}'`);

        let boat = null;
        if(queryResult[0].length){
            boat = queryResult[0][0];
        }

        return boat;
    }
    
    static async updateById(boat) {

        let query = "UPDATE boat SET ";
        query += `BoatName = '${boat.BoatName}', `;
        query += `Enrollment = '${boat.Enrollment}', `;
        query += `DistinguishingMark = '${boat.DistinguishingMark}', `;
        query += `HullMaterial = '${boat.HullMaterial}', `;
        query += `BoatType = '${boat.BoatType}', `;  
        query += `Service = '${boat.Service}', `;
        query += `SpecificExploitation = '${boat.SpecificExploitation}', `;
        query += `EnrollmentDate = ${boat.EnrollmentDate}, `;          
        query += `ConstructionDate = ${boat.ConstructionDate}, `;
        query += `NAT = ${boat.NAT}, `;
        query += `NAN = ${boat.NAN}, `;       
        query += `Eslora = ${boat.Eslora}, `;
        query += `Manga = ${boat.Manga}, `;
        query += `Puntal = ${boat.Puntal}, `;           
        query += `PeopleTransported = ${boat.PeopleTransported}, `;
        query += `BoatPower = '${boat.BoatPower}', `;
        query += `ElectricPower = '${boat.ElectricPower}', `;
        query += `TimeLastUpdate = ${boat.TimeLastUpdate} `;
        query += `WHERE IdBoat = '${boat.IdBoat}' AND IsDeleted = 0;`;

        const queryResult = await pool.query(query);
        const affectedRows = queryResult[0].affectedRows;      
        
        return affectedRows;
    }
    
    static async remove(idBoat) {
        
        const timeDeleted = Date.now();

        const query = `UPDATE boat SET IsDeleted = 1, TimeDeleted = ${timeDeleted} WHERE IdBoat = '${idBoat}' AND IsDeleted = 0`;
        const queryResult = await pool.query(query);

        const affectedRows = queryResult[0].affectedRows;
        return affectedRows;
    }
}

module.exports = Boat;