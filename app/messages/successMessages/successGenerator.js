const SUCCESS_RESPONSE_CODE = 200;
const CREATE_DATA_CODE = 201;
const TYPE_RESPONSE = "ok";

module.exports = {

    generatorCreated: (generatorId) =>  {
        return {
            status: CREATE_DATA_CODE,
            type: TYPE_RESPONSE,
            message: `Generator ${generatorId} created successfuly`,
            data: null
        }
    },

    findAllGenerators: (generatorsResult) => {
        return {
            status: SUCCESS_RESPONSE_CODE,
            type: TYPE_RESPONSE,
            message: "Get all generators successful",
            data: generatorsResult
        }
    },
 
    findOneGenerator: (generatorResult) => {
        return {
            status: SUCCESS_RESPONSE_CODE,
            type: TYPE_RESPONSE,
            message: "Get generator by id successful",
            data: generatorResult
        }
    },

    updateOneGenerator: (generatorUpdatedId) => {
        return {
            status: CREATE_DATA_CODE,
            type: TYPE_RESPONSE,
            message: `Updated generator ${generatorUpdatedId} successfuly`,
            data: null
        }
    },

    deleteGenerator: (generatorDeleteId) => {
        return {
            status: SUCCESS_RESPONSE_CODE,
            type: TYPE_RESPONSE,
            message: `Generator ${generatorDeleteId} was deleted successfully!`,
            data: null
        }
    }    
}