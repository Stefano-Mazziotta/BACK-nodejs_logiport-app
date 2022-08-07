const sql = require("./db.js");

// constructor
class Company {
    
    constructor(company) {
        this.RazonSocial = company.RazonSocial;
        this.CUIT = company.CUIT;
        this.IsDeleted = company.IsDeleted;
        this.TimeSave = company.TimeSave;
        this.TimeDeleted = company.TimeDeleted;
        this.TimeLastUpdate = company.TimeLastUpdate;
    }

    static create(newCompany, result) {
        sql.query("INSERT INTO company SET ?", newCompany, (queryError, queryResponse) => {

            if (queryError) {
                result(queryError, null);
                return;
            }

            let companyCreated = { id: queryResponse.insertId, ...newCompany };
            result(null, companyCreated);
        });
    }

    static getAll(razonSocial, result) {
        let query = "SELECT * FROM company WHERE IsDeleted = 0";
        if (razonSocial) {
            query += ` AND RazonSocial LIKE '%${razonSocial}%'`;
        }

        sql.query(query, (queryError, queryResponse) => {

            if (queryError) {
                result(queryError, null);
                return;
            }

            result(null, queryResponse);
        });
    }

    static findById(idCompany, result) {
        sql.query(`SELECT * FROM company WHERE IdCompany = ${idCompany}`, (queryError, queryResponse) => {

            if(queryError){
                result(queryError, null);
                return;
            }
        
            result(null, queryResponse);
        });
    }
    
    static updateById(idCompany, company, result) {
        sql.query(
            "UPDATE company SET RazonSocial = ?, CUIT = ?, TimeLastUpdate = ? WHERE IdCompany = ? AND IsDeleted = 0",
            [company.RazonSocial, company.CUIT, company.TimeLastUpdate, idCompany],
            (queryError, queryResponse) => {

                if (queryError) {
                    result(queryError, null);
                    return;
                }

                if (queryResponse.affectedRows == 0) {
                    result({ kind: "not_found" }, null);
                    return;
                }

                result(null, { id: idCompany, ...company });
            }
        );
    }

    static remove(idCompany, timeDeleted, result) {
        sql.query(
            "UPDATE company SET IsDeleted = 1, TimeDeleted = ? WHERE IdCompany = ? AND IsDeleted = 0", 
            [timeDeleted,idCompany], 
            (queryError, queryResponse) => {

                if (queryError) {
                    result(queryError, null);
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

module.exports = Company;