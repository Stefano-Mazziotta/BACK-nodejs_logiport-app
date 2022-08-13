const INTERNAL_ERROR_CODE = 500;
const NOT_FOUND_CODE = 404;
const BAD_REQUEST_CODE = 400;

module.exports = {

    notFound: (action) => {
        return {
            status: NOT_FOUND_CODE,
            message: `Generator not found in ${action}`
        }
    },

    bodyEmpty: {
        status: BAD_REQUEST_CODE,
        message: 'Content can not be empty!'
    },

    errorCreateGenerator: {
        status: INTERNAL_ERROR_CODE,
        message: "Some error occurred while creating a Generator."
    },

    errorFindAllGenerators: {
        status: INTERNAL_ERROR_CODE,
        message: "Some error occurred while retrieving Generators."
    },

    errorFindOneGenerator: (paramIdGenerator) => {
        return {
            status: INTERNAL_ERROR_CODE,
            message: `Error retrieving Generator with id ${paramIdGenerator}`
        }
    },

    errorUpdateGenerator: (paramIdGenerator) => {
        return {
            status: INTERNAL_ERROR_CODE,
            message: `Error updating Generator with ${paramIdGenerator}.`
        }
    },

    errorDeleteGenerator: (paramIdGenerator) => {
        return {
            status: INTERNAL_ERROR_CODE,
            message: `Could not delete Generator with id ${paramIdGenerator}.`
        }
    }   
}