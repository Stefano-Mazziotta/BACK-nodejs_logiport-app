const SUCCESS_RESPONSE_CODE = 200;
const CREATE_DATA_CODE = 201;
const TYPE_RESPONSE = "ok";

module.exports = {

    motorCreated: (MotorId) =>  {
        return {
            status: CREATE_DATA_CODE,
            type: TYPE_RESPONSE,
            message: `Motor ${MotorId} created successfuly`,
            data: null
        }
    },

    findAllMotors: (motorsResult) => {
        return {
            status: SUCCESS_RESPONSE_CODE,
            type: TYPE_RESPONSE,
            message: "Get all motors successful",
            data: motorsResult
        }
    },
 
    findOneMotor: (motorResult) => {
        return {
            status: SUCCESS_RESPONSE_CODE,
            type: TYPE_RESPONSE,
            message: "Get motor by id successful",
            data: motorResult
        }
    },

    updateOneMotor: (motorUpdatedId) => {
        return {
            status: CREATE_DATA_CODE,
            type: TYPE_RESPONSE,
            message: `Updated motor ${motorUpdatedId} successfuly`,
            data: null
        }
    },

    deleteMotor: (motorDeleteId) => {
        return {
            status: SUCCESS_RESPONSE_CODE,
            type: TYPE_RESPONSE,
            message: `Motor ${motorDeleteId} was deleted successfully!`,
            data: null
        }
    }    
}