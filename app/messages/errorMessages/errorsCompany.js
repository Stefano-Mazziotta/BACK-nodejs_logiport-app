const INTERNAL_ERROR_CODE = 500;
const NOT_FOUND_CODE = 404;
const BAD_REQUEST_CODE = 400;

module.exports = {

    notFound: (action) => {
        return {
            status: NOT_FOUND_CODE,
            message: `Company not found in ${action}`
        }
    },

    bodyEmpty: {
        status: BAD_REQUEST_CODE,
        message: 'Content can not be empty!'
    },

    errorCreateCompany: {
        status: INTERNAL_ERROR_CODE,
        message: "Some error occurred while creating the Company."
    },

    errorFindAllCompany: {
        status: INTERNAL_ERROR_CODE,
        message: "Some error occurred while retrieving Companies."
    },

    errorFindOneCompany: (paramIdCompany) => {
        return {
            status: INTERNAL_ERROR_CODE,
            message: `Error retrieving Company with id ${paramIdCompany}`
        }
    },

    errorUpdateCompany: (paramIdCompany) => {
        return {
            status: INTERNAL_ERROR_CODE,
            message: `Error updating Company with ${paramIdCompany}.`
        }
    },

    errorDeleteCompany: (paramIdCompany) => {
        return {
            status: INTERNAL_ERROR_CODE,
            message: `Could not delete Company with id ${paramIdCompany}.`
        }
    }   
}