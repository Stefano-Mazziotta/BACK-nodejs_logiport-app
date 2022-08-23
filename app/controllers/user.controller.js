const User = require("../models/user.model");

const userErrors = require("../messages/errorMessages/user.error");
const userSuccessMessage = require("../messages/successMessages/user.success");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const idGenerator = require("../utils/idGenerator");

const sendSuccessResponse = require("../messages/successMessages/sendSuccessResponse");

exports.register = async (request, response, next) => {

    const { body } = request;
    if (Object.keys(body).length === 0){
        next(userErrors.bodyEmpty);
        return;
    } 

    const { username, password } = body;
    
    const randomId = idGenerator();

    const saltRounds = 10;
    let passwordEncrypted = await bcrypt.hash(password, saltRounds);

    const nowTimestamp = Date.now();
    const userConstructor = {
        IdUser: randomId,
        Username: username,
        PasswordHash: passwordEncrypted,
        TimeSave: nowTimestamp,
        TimeLastUpdate: null
    }
    const user = new User(userConstructor);
    let internalError = null;

    const affectedRows = await User.register(user)
    .catch(error => {
        internalError = error;
    });

    if (internalError || !affectedRows) {
        next(userErrors.errorRegisterUser);
        return;
    } 

    const successResponse = userSuccessMessage.userRegistered(user.IdUser);
    sendSuccessResponse(response, successResponse);
};

exports.login = async (request, response, next) => { 

    const { body } = request;
    const { username, password } = body;

    let internalError = null;
    const user = await User.findOne(username)
    .catch(error => {
        internalError = error;
    });

    if(internalError){
        next(userErrors.errorFindOneUser(username));
        return;
    }
    
    const passwordCorrect = user === null 
        ? false
        : await bcrypt.compare(password, user.PasswordHash);

    if ( !(user && passwordCorrect) ){
        next(userErrors.invalidUser);
        return;
    }
    
    const userForToken = {
        idUser: user.IdUser,
        username: user.Username,
    };    
    const token = jwt.sign(userForToken, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE_IN
    });

    const userResponse = {
        idUser: user.IdUser,
        username: user.Username,
        accessToken: token
    }

    const successResponse = userSuccessMessage.userLoged(userResponse);
    sendSuccessResponse(response, successResponse);        
}

exports.findAll = async (request, response, next) => {

    let internalError = null;

    const users = await User.getAll()
    .catch(error => {
        internalError = error;
    });

    if(internalError){
        next(userErrors.errorFindAllUsers);
        return;
    }

    if(!users){
        next(userErrors.notFound("findAll"));
        return;
    }

    const successResponse = userSuccessMessage.findAllUsers(users);
    sendSuccessResponse(response, successResponse);   
}

exports.findOne = async (request, response, next) => {

    const username = request.params.username;
    let internalError = null;

    const user = await User.findOne(username)
    .catch(error => {
        internalError = error;
    });

    if(internalError){
        next(userErrors.errorFindOneUser(username));
        return;
    }

    if(!user){
        next(userErrors.notFound("findOne"));
        return;
    }

    delete user.PasswordHash;
    const successResponse = userSuccessMessage.findOneUser(user);
    sendSuccessResponse(response, successResponse);   
}

exports.update = async (request, response, next) => {
    // develop when i need it.
}

exports.delete = async (request, response, next) => {
    const idUser = request.params.id;
    let internalError = null;

    const affectedRows = await User.remove(idUser)
    .catch(error => {
        internalError = error;
    });

    if(internalError){
        next(userErrors.errorDeleteUser(idUser));
        return;
    }

    if(!affectedRows){
        next(userErrors.notFound("deleteUser"));
        return;
    }

    const successResponse = userSuccessMessage.deleteUser(idUser);
    sendSuccessResponse(response, successResponse);
}