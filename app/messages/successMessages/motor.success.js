const SUCCESS_RESPONSE_CODE = 200;
const CREATE_DATA_CODE = 201;
const TYPE_RESPONSE = "ok";

module.exports = {

    motorCreated: (idMotor) =>  {
        return {
            status: CREATE_DATA_CODE,
            type: TYPE_RESPONSE,
            message: `Motor ${idMotor} created successfully.`,
            data: null
        }
    },

    findAllMotors: (motors) => {
        return {
            status: SUCCESS_RESPONSE_CODE,
            type: TYPE_RESPONSE,
            message: "Get all motors successfully.",
            data: motors
        }
    },
 
    findOneMotor: (motor) => {
        return {
            status: SUCCESS_RESPONSE_CODE,
            type: TYPE_RESPONSE,
            message: "Get motor by id successfully.",
            data: motor
        }
    },

    updateOneMotor: (idMotor) => {
        return {
            status: CREATE_DATA_CODE,
            type: TYPE_RESPONSE,
            message: `Updated motor ${idMotor} successfully.`,
            data: null
        }
    },

    deleteMotor: (idMotor) => {
        return {
            status: SUCCESS_RESPONSE_CODE,
            type: TYPE_RESPONSE,
            message: `Motor ${idMotor} was deleted successfully!`,
            data: null
        }
    }    
}