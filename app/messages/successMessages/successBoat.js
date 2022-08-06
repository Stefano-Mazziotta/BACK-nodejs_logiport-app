const SUCCESS_RESPONSE_CODE = 200;
const CREATE_DATA_CODE = 201;
const TYPE_RESPONSE = "ok";

module.exports = {

    boatCreated: (boatId) =>  {
        return {
            status: CREATE_DATA_CODE,
            type: TYPE_RESPONSE,
            message: `boat ${boatId} created successfuly`,
            data: null
        }
    },

    findAllBoats: (boatsResult) => {
        return {
            status: SUCCESS_RESPONSE_CODE,
            type: TYPE_RESPONSE,
            message: "Get all boats successful",
            data: boatsResult
        }
    },

    findOneBoat: (boatResult) => {
        return {
            status: SUCCESS_RESPONSE_CODE,
            type: TYPE_RESPONSE,
            message: "get boat by id successful",
            data: boatResult
        }
    },

    updateOneBoat: (boatUpdatedId) => {
        return {
            status: CREATE_DATA_CODE,
            type: TYPE_RESPONSE,
            message: `Updated boat ${boatUpdatedId} successfuly`,
            data: null
        }
    },

    deleteBoat: (boatDeleteId) => {
        return {
            status: SUCCESS_RESPONSE_CODE,
            type: TYPE_RESPONSE,
            message: `Boat ${boatDeleteId} was deleted successfully!`,
            data: null
        }
    }



    
}