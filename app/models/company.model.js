const pool = require("./db.js");
const stringUtils = require("../utils/stringUtils");

class Company {
    
    constructor(company) {
        this.IdCompany = company.IdCompany;
        this.RazonSocial = company.RazonSocial;
        this.CUIT = company.CUIT;
        this.IsDeleted = company.IsDeleted;
        this.TimeSave = company.TimeSave;
        this.TimeDeleted = company.TimeDeleted;
        this.TimeLastUpdate = company.TimeLastUpdate;
    }

    static async create(newCompany) {
        const queryResult = await pool.query("INSERT INTO company SET ?", newCompany);
        return queryResult[0].affectedRows;
    }

    static async getAll(razonSocial) {

        let query = "SELECT * FROM company WHERE IsDeleted = 0";
        if (razonSocial) {
            query += ` AND RazonSocial LIKE '%${razonSocial}%'`;
        }

        const queryResult = await pool.query(query);

        let companies = null;
        if(queryResult[0].length){
            companies = queryResult[0];
        }

        return companies;
    }

    static async findById(idCompany) {

        const query = `SELECT * FROM company WHERE IdCompany = '${idCompany}'`;
        const queryResult = await pool.query(query);

        let company = null;
        if(queryResult[0].length){
            company = queryResult[0][0];
        }

        return company;
    }
    
    static async updateById(company) {

        const { IdCompany, RazonSocial, CUIT, TimeLastUpdate } = company;

        let query = `UPDATE company SET RazonSocial = '${RazonSocial}',
            CUIT = ${CUIT}, 
            TimeLastUpdate = ${TimeLastUpdate} 
            WHERE IdCompany = '${IdCompany}' AND IsDeleted = 0`;
        
        query = stringUtils.cleanLineBreak(query);
        const queryResponse = await pool.query(query);

        const affectedRows = queryResponse[0].affectedRows;
        return affectedRows;
    }

    static async remove(deleteParams) {

        const { idCompany, timeDeleted } = deleteParams;
        let query = `UPDATE company  
            SET IsDeleted = 1, TimeDeleted = ${timeDeleted} 
            WHERE IdCompany = '${idCompany}' AND IsDeleted = 0;`

        query = stringUtils.cleanLineBreak(query);

        const queryResponse = await pool.query(query);

        const affectedRows = queryResponse[0].affectedRows;
        return affectedRows;
    }
}

module.exports = Company;