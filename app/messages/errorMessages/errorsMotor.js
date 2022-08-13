const INTERNAL_ERROR_CODE = 500;
const NOT_FOUND_CODE = 404;
const BAD_REQUEST_CODE = 400;

module.exports = {

    notFound: (action) => {
        return {
            status: NOT_FOUND_CODE,
            message: `Motor not found in ${action}`
        }
    },

    bodyEmpty: {
        status: BAD_REQUEST_CODE,
        message: 'Content can not be empty!'
    },

    errorCreateMotor: {
        status: INTERNAL_ERROR_CODE,
        message: "Some error occurred while creating the Motor."
    },

    errorFindAllMotors: {
        status: INTERNAL_ERROR_CODE,
        message: "Some error occurred while retrieving Motors."
    },

    errorFindOneMotor: (paramIdMotor) => {
        return {
            status: INTERNAL_ERROR_CODE,
            message: `Error retrieving Motor with id ${paramIdMotor}`
        }
    },

    errorUpdateMotor: (paramIdMotor) => {
        return {
            status: INTERNAL_ERROR_CODE,
            message: `Error updating Motor with ${paramIdMotor}.`
        }
    },

    errorDeleteMotor: (paramIdMotor) => {
        return {
            status: INTERNAL_ERROR_CODE,
            message: `Could not delete Motor with id ${paramIdMotor}.`
        }
    }   
}