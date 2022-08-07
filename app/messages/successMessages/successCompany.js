const SUCCESS_RESPONSE_CODE = 200;
const CREATE_DATA_CODE = 201;
const TYPE_RESPONSE = "ok";

module.exports = {

    companyCreated: (companyId) =>  {
        return {
            status: CREATE_DATA_CODE,
            type: TYPE_RESPONSE,
            message: `Company ${companyId} created successfuly`,
            data: null
        }
    },

    findAllCompanies: (companiesResult) => {
        return {
            status: SUCCESS_RESPONSE_CODE,
            type: TYPE_RESPONSE,
            message: "Get all companies successful",
            data: companiesResult
        }
    },
 
    findOneCompany: (companyResult) => {
        return {
            status: SUCCESS_RESPONSE_CODE,
            type: TYPE_RESPONSE,
            message: "Get company by id successful",
            data: companyResult
        }
    },

    updateOneCompany: (companyUpdatedId) => {
        return {
            status: CREATE_DATA_CODE,
            type: TYPE_RESPONSE,
            message: `Updated boat ${companyUpdatedId} successfuly`,
            data: null
        }
    },

    deleteCompany: (companyDeleteId) => {
        return {
            status: SUCCESS_RESPONSE_CODE,
            type: TYPE_RESPONSE,
            message: `Company ${companyDeleteId} was deleted successfully!`,
            data: null
        }
    }    
}