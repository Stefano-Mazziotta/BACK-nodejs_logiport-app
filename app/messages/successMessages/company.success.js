const SUCCESS_RESPONSE_CODE = 200;
const CREATE_DATA_CODE = 201;
const TYPE_RESPONSE = "ok";

module.exports = {

    companyCreated: (idCompany) =>  {
        return {
            status: CREATE_DATA_CODE,
            type: TYPE_RESPONSE,
            message: `Company ${idCompany} created successfully!`,
            data: null
        }
    },

    findAllCompanies: (companies) => {
        return {
            status: SUCCESS_RESPONSE_CODE,
            type: TYPE_RESPONSE,
            message: "Get all companies successfully!",
            data: companies
        }
    },
 
    findOneCompany: (company) => {
        return {
            status: SUCCESS_RESPONSE_CODE,
            type: TYPE_RESPONSE,
            message: "Get company by id successfully!",
            data: company
        }
    },

    updateOneCompany: (idCompanyUpdated) => {
        return {
            status: CREATE_DATA_CODE,
            type: TYPE_RESPONSE,
            message: `Updated boat ${idCompanyUpdated} successfully!`,
            data: null
        }
    },

    deleteCompany: (idCompanyDeleted) => {
        return {
            status: SUCCESS_RESPONSE_CODE,
            type: TYPE_RESPONSE,
            message: `Company ${idCompanyDeleted} was deleted successfully!`,
            data: null
        }
    }    
}