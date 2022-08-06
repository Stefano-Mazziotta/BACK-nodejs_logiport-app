const INTERNAL_ERROR_CODE = 500;
const NOT_FOUND_CODE = 404;
const BAD_REQUEST_CODE = 400;

module.exports = {

    notFound: (action) => {
        return {
            status: NOT_FOUND_CODE,
            message: `Boat not found in ${action}`
        }
    },

    bodyEmpty: {
        status: BAD_REQUEST_CODE,
        message: 'Content can not be empty!'
    },

    errorCreateBoat: {
        status: INTERNAL_ERROR_CODE,
        message: "Some error occurred while creating the Boat."
    },

    errorFindAllBoats: {
        status: INTERNAL_ERROR_CODE,
        message: "Some error occurred while retrieving boats."
    },

    errorFindOneBoat: (paramIdBoat) => {
        return {
            status: INTERNAL_ERROR_CODE,
            message: `Error retrieving Boat with id ${paramIdBoat}`
        }
    },

    errorUpdateBoat: (paramIdBoat) => {
        return {
            status: INTERNAL_ERROR_CODE,
            message: `Error updating Boat with ${paramIdBoat}.`
        }
    },

    errorDeleteBoat: (paramIdBoat) => {
        return {
            status: INTERNAL_ERROR_CODE,
            message: `Could not delete Boat with id ${paramIdBoat}.`
        }
    }
    
}