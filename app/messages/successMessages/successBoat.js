const SUCCESS_RESPONSE_CODE = 200;
const CREATE_DATA_CODE = 201;
const TYPE_RESPONSE = "ok";

module.exports = {

    boatCreated: (idBoat) =>  {
        return {
            status: CREATE_DATA_CODE,
            type: TYPE_RESPONSE,
            message: `Boat ${idBoat} created successfully.`,
            data: null
        }
    },

    findAllBoats: (boats) => {
        return {
            status: SUCCESS_RESPONSE_CODE,
            type: TYPE_RESPONSE,
            message: "Get all boats successfully.",
            data: boats
        }
    },

    findOneBoat: (boat) => {
        return {
            status: SUCCESS_RESPONSE_CODE,
            type: TYPE_RESPONSE,
            message: "get boat by id successfully.",
            data: boat
        }
    },

    updateOneBoat: (idBoatUpdated) => {
        return {
            status: CREATE_DATA_CODE,
            type: TYPE_RESPONSE,
            message: `Updated boat ${idBoatUpdated} successfully.`,
            data: null
        }
    },

    deleteBoat: (idBoatDeleted) => {
        return {
            status: SUCCESS_RESPONSE_CODE,
            type: TYPE_RESPONSE,
            message: `Boat ${idBoatDeleted} was deleted successfully!`,
            data: null
        }
    }    
}