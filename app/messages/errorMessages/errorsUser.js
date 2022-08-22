const INTERNAL_ERROR_CODE = 500;
const NOT_FOUND_CODE = 404;
const BAD_REQUEST_CODE = 400;
const UNAUTHORIZED_CODE = 401;

module.exports = {

    notFound: (action) => {
        return {
            status: NOT_FOUND_CODE,
            message: `User not found in ${action}`
        }
    },

    bodyEmpty: {
        status: BAD_REQUEST_CODE,
        message: "Content can not be empty!"
    },

    errorRegisterUser: {
        status: INTERNAL_ERROR_CODE,
        message: "Some error occurred while creating the User."
    },

    invalidUser: {
        status: UNAUTHORIZED_CODE,
        message: "Invalid user or password"
    },

    errorFindAllUsers: {
        status: INTERNAL_ERROR_CODE,
        message: "Some error occurred while retrieving users."
    },

    errorFindOneUser: (username) => {
        return {
            status: INTERNAL_ERROR_CODE,
            message: `Error retrieving user with username '${username}'.`
        }
    },

    errorDeleteUser: (idUser) => {
        return {
            status: INTERNAL_ERROR_CODE,
            message: `Could not delete user with id '${idUser}'.`
        }
    }  
}