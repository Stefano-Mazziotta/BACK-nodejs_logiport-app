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
        this.Nat = boat.Nat;
        this.Nan = boat.Nan;
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

    static create(newBoat, result) {
        sql.query("INSERT INTO boat SET ?", newBoat, (err, res) => {

            if (err) {
                console.log(`error: ${err}`);
                result(err, null);
                return;
            }

            console.log("Created boat: ", { id: res.insertId, ...newBoat });
            result(null, { id: res.insertId, ...newBoat });
        });
    }

    static getAll(boatParams, result) {
        let query = `SELECT * FROM boat WHERE IsDeleted = 0 AND IdCompany ='${boatParams.IdCompany}'`;
        if (boatParams.BoatName) {
            query += ` AND BoatName LIKE '%${boatParams.BoatName}%'`;
        }

        sql.query(query, (err, res) => {

            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.length) {
                console.log("boats: ", res);
                result(null, res);
                return;
            }

            // not found boats with the IdCompany
            result({ kind: "not_found" }, null);
        });
    }

    static findById(IdBoat, result) {
        sql.query(`SELECT * FROM boat WHERE IsDeleted = 0 AND IdBoat = ${IdBoat}`, (err, res) => {

            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.length) {
                console.log("found boat: ", res[0]);
                result(null, res[0]);
                return;
            }

            // not found boat with the id
            result({ kind: "not_found" }, null);
        });
    }
    
    static updateById(IdBoat, boat, result) {
        let query = `
            UPDATE boat SET 

            BoatName = '${boat.BoatName}', 
            Enrollment = '${boat.Enrollment}', 
            DistinguishingMark = '${boat.DistinguishingMark}',
            HullMaterial = '${boat.HullMaterial}',
            BoatType = '${boat.BoatType}',
            Service = '${boat.Service}',
            SpecificExploitation = '${boat.SpecificExploitation}',
            EnrollmentDate = '${boat.EnrollmentDate}',
            ConstructionDate = '${boat.ConstructionDate}',
            NAT = ${boat.Nat},
            NAN = ${boat.Nan},
            Eslora = ${boat.Eslora},
            Manga = ${boat.Manga},
            Puntal = ${boat.Puntal},
            PeopleTransported = ${boat.PeopleTransported},
            BoatPower = '${boat.BoatPower}',
            ElectricPower = '${boat.ElectricPower}',
            TimeLastUpdate = ${boat.TimeLastUpdate}
        
            WHERE IdBoat = ${IdBoat} AND IsDeleted = 0;
        `;
        
        query = query.replace(/(\r\n|\n|\r)/gm, "");

        sql.query(
            query,
            (err, res) => {

                if (err) {

                    console.log("error: ", err);
                    result(null, err);
                    return;
                }

                if (res.affectedRows == 0) {
                    //not found company with the id
                    result({ kind: "not_found" }, null);
                    return;
                }

                console.log("updated boat: ", { id: IdBoat, ...boat });
                result(null, { id: IdBoat, ...boat });
            }
        );
    }
    
    static remove(IdBoat, timeDeleted, result) {
        sql.query(
            "UPDATE boat SET IsDeleted = 1, TimeDeleted = ? WHERE IdBoat = ? AND IsDeleted = 0", 
            [timeDeleted,IdBoat], 
            (err, res) => {

                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                    return;
                }

                if (res.affectedRows == 0) {
                    // not found boat with the id
                    result({ kind: "not_found" }, null);
                    return;
                }

                console.log("deleted boat with id: ", IdBoat);
                result(null, res);
            }
        );
    }
}

module.exports = Boat;