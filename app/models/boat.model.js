const sql = require("./db.js");

// constructor
class Boat {
    
    constructor(boat) {
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

    static async create(newBoat, result) {
        sql.query("INSERT INTO boat SET ?", newBoat, (queryError, queryResponse) => {

            if (queryError) {
                result(queryError, null);
                return;
            }
            let boatCreated = { id: queryResponse.insertId, ...newBoat };
            result(null, boatCreated);
        });
    }

    static getAll(boatParams, result) {
        let query = `SELECT * FROM boat WHERE IsDeleted = 0 AND IdCompany ='${boatParams.IdCompany}'`;
        if (boatParams.BoatName) {
            query += ` AND BoatName LIKE '%${boatParams.BoatName}%'`;
        }

        sql.query(query, (queryError, queryResponse) => {

            if (queryError) {
                result(queryError, null);
                return;
            }

            result(null, queryResponse);
        });
    }

    static findById(IdBoat, result) {
        sql.query(`SELECT * FROM boat WHERE IsDeleted = 0 AND IdBoat = ${IdBoat}`, (queryError, queryResponse) => {

            if(queryError){
                result(queryError, null);
                return;
            }
        
            result(null, queryResponse);
        });
    }
    
    static updateById(IdBoat, boat, result) {

        let query = "UPDATE boat SET ";
        query += `BoatName = '${boat.BoatName}',`;
        query += `Enrollment = '${boat.Enrollment}',`;
        query += `DistinguishingMark = '${boat.DistinguishingMark}',`;
        query += `HullMaterial = '${boat.HullMaterial}',`;
        query += `BoatType = '${boat.BoatType}',`;  
        query += `Service = '${boat.Service}',`;
        query += `SpecificExploitation = '${boat.SpecificExploitation}',`;
        query += `EnrollmentDate = '${boat.EnrollmentDate}',`;          
        query += `ConstructionDate = '${boat.ConstructionDate},'`;
        query += `NAT = ${boat.NAT},`;
        query += `NAN = ${boat.NAN}`;       
        query += `Eslora = ${boat.Eslora},`;
        query += `Manga = ${boat.Manga}`;
        query += `Puntal = ${boat.Puntal},`;           
        query += `PeopleTransported = ${boat.PeopleTransported},`;
        query += `BoatPower = '${boat.BoatPower}',`;
        query += `ElectricPower = '${boat.ElectricPower}',`;
        query += `TimeLastUpdate = ${boat.TimeLastUpdate}`;
        query += `WHERE IdBoat = ${IdBoat} AND IsDeleted = 0;`;

        sql.query(query, (queryError, queryResponse) => {

            if(queryError){
                result(queryError, null);
                return;
            }

            if(queryResponse.affectedRows == 0){
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated boat: ", { id: IdBoat, ...boat });
            result(null, { id: IdBoat, ...boat });
        });
    }
    
    static remove(IdBoat, result) {
        let timeDeleted = Date.now();

        sql.query(
            `UPDATE boat SET IsDeleted = 1, TimeDeleted = ${timeDeleted} WHERE IdBoat = ${IdBoat} AND IsDeleted = 0`, 
            (queryError, queryResponse) => {

                if (queryError) {
                    result(null, queryError);
                    return;
                }

                if (queryResponse.affectedRows == 0) {
                    result({ kind: "not_found" }, null);
                    return;
                }

                result(null, queryResponse);
            }
        );
    }
}

module.exports = Boat;