const INTERNAL_ERROR_CODE = 500;
const NOT_FOUND_CODE = 404;
const BAD_REQUEST_CODE = 400;

module.exports = {

    notFound: (action) => {
        return {
            status: NOT_FOUND_CODE,
            message: `Expiration not found in ${action}.`
        }
    },

    bodyEmpty: {
        status: BAD_REQUEST_CODE,
        message: 'Content can not be empty!'
    },

    errorCreateExpiration: {
        status: INTERNAL_ERROR_CODE,
        message: "Some error occurred while creating the Expiration."
    },

    errorFindAllExpirations: {
        status: INTERNAL_ERROR_CODE,
        message: "Some error occurred while retrieving Expirations."
    },

    errorFindOneExpiration: (idExpiration) => {
        return {
            status: INTERNAL_ERROR_CODE,
            message: `Error retrieving Expiration with id: '${idExpiration}'.`
        }
    },

    errorUpdateExpiration: (idExpiration) => {
        return {
            status: INTERNAL_ERROR_CODE,
            message: `Error updating Expiration with id: '${idExpiration}'.`
        }
    },

    errorDeleteExpiration: (idExpiration) => {
        return {
            status: INTERNAL_ERROR_CODE,
            message: `Could not delete Expiration with id: '${idExpiration}'.`
        }
    }   
}