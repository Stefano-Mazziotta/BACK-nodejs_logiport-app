const SUCCESS_RESPONSE_CODE = 200;
const CREATE_DATA_CODE = 201;
const TYPE_RESPONSE = "ok";

module.exports = {

    userRegistered: (idUser) =>  {
        return {
            status: CREATE_DATA_CODE,
            type: TYPE_RESPONSE,
            message: `User ${idUser} registered successfully`,
            data: null
        }
    },

    userLoged: (user) => {
        return {
            status: SUCCESS_RESPONSE_CODE,
            type: TYPE_RESPONSE,
            message: `User '${user.idUser}' loged successfully.`,
            data: user
        }
    },

    findAllUsers: (users) => {
        return {
            status: SUCCESS_RESPONSE_CODE,
            type: TYPE_RESPONSE,
            message: "Get all users successfully.",
            data: users
        }
    },

    findOneUser: (user) => {
        return {
            status: SUCCESS_RESPONSE_CODE,
            type: TYPE_RESPONSE,
            message: "Get user by username successfully.",
            data: user
        }
    },

    deleteUser: (idUser) => {
        return {
            status: SUCCESS_RESPONSE_CODE,
            type: TYPE_RESPONSE,
            message: `User '${idUser}' was deleted successfully!`,
            data: null
        }
    } 
}