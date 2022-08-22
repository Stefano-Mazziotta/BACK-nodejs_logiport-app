const SUCCESS_RESPONSE_CODE = 200;
const CREATE_DATA_CODE = 201;
const TYPE_RESPONSE = "ok";

module.exports = {

    expirationCreated: (idExpiration) =>  {
        return {
            status: CREATE_DATA_CODE,
            type: TYPE_RESPONSE,
            message: `Expiration '${idExpiration}' created successfully.`,
            data: null
        }
    },

    findAllExpirations: (expirations) => {
        return {
            status: SUCCESS_RESPONSE_CODE,
            type: TYPE_RESPONSE,
            message: "Get all expirations successfully.",
            data: expirations
        }
    },
 
    findOneExpiration: (expiration) => {
        return {
            status: SUCCESS_RESPONSE_CODE,
            type: TYPE_RESPONSE,
            message: "Get expiration by id successfully.",
            data: expiration
        }
    },

    updateOneExpiration: (idExpiration) => {
        return {
            status: CREATE_DATA_CODE,
            type: TYPE_RESPONSE,
            message: `Expiration '${idExpiration}' Updated successfully.`,
            data: null
        }
    },

    deleteExpiration: (idExpiration) => {
        return {
            status: SUCCESS_RESPONSE_CODE,
            type: TYPE_RESPONSE,
            message: `Expiration '${idExpiration}' was deleted successfully!`,
            data: null
        }
    }    
}