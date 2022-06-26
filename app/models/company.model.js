const sql = require("./db.js");

// constructor
class Company {
    
    constructor(company) {
        this.razonSocial = company.razonSocial;
        this.cuit = company.cuit;
        this.isDeleted = company.isDeleted;
        this.timeSave = company.timeSave;
        this.timeDeleted = company.timeDeleted;
        this.timeLastUpdate = company.timeLastUpdate;
    }

    static create(newCompany, result) {
        sql.query("INSERT INTO company SET ?", newCompany, (err, res) => {

            if (err) {
                console.log(`error: ${err}`);
                result(err, null);
                return;
            }

            console.log("Created company: ", { id: res.insertId, ...newCompany });
            result(null, { id: res.insertId, ...newCompany });
        });
    }

    static getAll(razonSocial, result) {
        let query = "SELECT * FROM company WHERE IsDeleted = 0";
        if (razonSocial) {
            query += ` AND RazonSocial LIKE '%${razonSocial}%'`;
        }

        sql.query(query, (err, res) => {

            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            console.log("companies: ", res);
            result(null, res);
        });
    }

    static findById(IdCompany, result) {
        sql.query(`SELECT * FROM company WHERE IdCompany = ${IdCompany}`, (err, res) => {

            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.length) {
                console.log("found company: ", res[0]);
                result(null, res[0]);
                return;
            }

            // not found company with the id
            result({ kind: "not_found" }, null);
        });
    }
    
    static updateById(IdCompany, company, result) {
        sql.query(
            "UPDATE company SET RazonSocial = ?, CUIT = ?, TimeLastUpdate = ? WHERE IdCompany = ? AND IsDeleted = 0",
            [company.razonSocial, company.cuit, company.timeLastUpdate, IdCompany],
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

                console.log("updated company: ", { id: IdCompany, ...company });
                result(null, { id: IdCompany, ...company });
            }
        );
    }

    static remove(IdCompany, timeDeleted, result) {
        sql.query(
            "UPDATE company SET IsDeleted = 1, TimeDeleted = ? WHERE IdCompany = ? AND IsDeleted = 0", 
            [timeDeleted,IdCompany], 
            (err, res) => {

                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                    return;
                }

                if (res.affectedRows == 0) {
                    // not found company with the id
                    result({ kind: "not_found" }, null);
                    return;
                }

                console.log("deleted company with id: ", IdCompany);
                result(null, res);
            }
        );
    }
}

module.exports = Company;