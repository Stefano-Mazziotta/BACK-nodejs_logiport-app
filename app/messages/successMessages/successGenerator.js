const SUCCESS_RESPONSE_CODE = 200;
const CREATE_DATA_CODE = 201;
const TYPE_RESPONSE = "ok";

module.exports = {

    generatorCreated: (idGenerator) =>  {
        return {
            status: CREATE_DATA_CODE,
            type: TYPE_RESPONSE,
            message: `Generator '${idGenerator}' created successfully`,
            data: null
        }
    },

    findAllGenerators: (generators) => {
        return {
            status: SUCCESS_RESPONSE_CODE,
            type: TYPE_RESPONSE,
            message: "Get all generators successfully.",
            data: generators
        }
    },
 
    findOneGenerator: (generator) => {
        return {
            status: SUCCESS_RESPONSE_CODE,
            type: TYPE_RESPONSE,
            message: "Get generator by id successfully.",
            data: generator
        }
    },

    updateOneGenerator: (idGenerator) => {
        return {
            status: CREATE_DATA_CODE,
            type: TYPE_RESPONSE,
            message: `Updated generator '${idGenerator}' successfully.`,
            data: null
        }
    },

    deleteGenerator: (idGenerator) => {
        return {
            status: SUCCESS_RESPONSE_CODE,
            type: TYPE_RESPONSE,
            message: `Generator '${idGenerator}' was deleted successfully!`,
            data: null
        }
    }    
}