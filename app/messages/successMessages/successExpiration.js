const SUCCESS_RESPONSE_CODE = 200;
const CREATE_DATA_CODE = 201;
const TYPE_RESPONSE = "ok";

module.exports = {

    expirationCreated: (idExpiration) =>  {
        return {
            status: CREATE_DATA_CODE,
            type: TYPE_RESPONSE,
            message: `Expiration ${idExpiration} created successfuly`,
            data: null
        }
    },

    findAllExpirations: (expirationsResult) => {
        return {
            status: SUCCESS_RESPONSE_CODE,
            type: TYPE_RESPONSE,
            message: "Get all expirations successfuly",
            data: expirationsResult
        }
    },
 
    findOneExpiration: (expirationResult) => {
        return {
            status: SUCCESS_RESPONSE_CODE,
            type: TYPE_RESPONSE,
            message: "Get expiration by id successful",
            data: expirationResult
        }
    },

    updateOneExpiration: (idExpirationUpdated) => {
        return {
            status: CREATE_DATA_CODE,
            type: TYPE_RESPONSE,
            message: `Expiration ${idExpirationUpdated} Updated successfuly`,
            data: null
        }
    },

    deleteExpiration: (idExpirationDeleted) => {
        return {
            status: SUCCESS_RESPONSE_CODE,
            type: TYPE_RESPONSE,
            message: `Expiration ${idExpirationDeleted} was deleted successfully!`,
            data: null
        }
    }    
}