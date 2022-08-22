const Expiration = require("../models/expiration.model.js");
const expirationErrors = require("../messages/errorMessages/errorsExpiration.js");
const expirationSuccessMessage = require("../messages/successMessages/successExpiration.js");

const idGenerator = require("../utils/idGenerator");
const sendSuccessResponse = require("../messages/successMessages/sendSuccessResponse");

exports.create = async (request, response, next) => {

    const { body } = request;

    if (Object.keys(body).length === 0){
        next(expirationErrors.bodyEmpty);
        return;
    } 

    const idExpiration = idGenerator();
    const nowTimestamp = Date.now();
    const {idBoat, title, description, expirationDate } = body;

    const expirationConstructor = {
        IdExpiration: idExpiration,
        IdBoat: idBoat,
        Title: title,
        Description: description,
        ExpirationDate: expirationDate,
        IsDeleted: 0,
        TimeSave: nowTimestamp,
        TimeDeleted: null,
        TimeLastUpdate: null
    }    
    const expiration = new Expiration(expirationConstructor);

    let internalError = null;
    const affectedRows = await Expiration.create(expiration)
        .catch(error => {
            internalError = error;
        });
    
    if(internalError || affectedRows === 0){
        next(expirationErrors.errorCreateExpiration);
        return;
    }

    const successMessage = expirationSuccessMessage.expirationCreated(idExpiration);
    sendSuccessResponse(response, successMessage);
};

exports.findAll = async (request, response, next) => {
    
    const { body } = request;
    
    if (Object.keys(body).length === 0){
        next(expirationErrors.bodyEmpty);
        return;
    } 

    const { idCompany, idBoat, title } = body;

    const expirationParams = {
        idCompany: idCompany,
        idBoat: idBoat,
        title: title
    }

    let internalError = null
    const expirations = await Expiration.getAll(expirationParams)
        .catch(error => {
            internalError = error;
        });
    
    if(internalError){
        next(expirationErrors.errorFindAllExpirations);
        return;
    }

    if(!expirations){
        next(expirationErrors.notFound("findAll"));
        return;
    }

    const successMessage = expirationSuccessMessage.findAllExpirations(expirations);
    sendSuccessResponse(response, successMessage);
};

exports.findOne = async (request, response, next) => {

    const { params } = request;
    const idExpiration = params.id;

    let internalError = null;
    const expiration = await Expiration.findById(idExpiration)
        .catch(error => {
            internalError = error;
        });
    
    if(internalError){
        next(expirationErrors.errorFindOneExpiration(idExpiration));
        return;
    }   

    if(!expiration){
        next(expirationErrors.notFound("findOneById"));
        return;
    }

    const successMessage = expirationSuccessMessage.findOneExpiration(expiration);
    sendSuccessResponse(response, successMessage);
};

exports.update = async (request, response, next) => {

    const { body, params } = request;

    if(Object.keys(body).length === 0){
        next(expirationErrors.bodyEmpty)
        return;
    }

    const nowTimestamp = Date.now();
    const idExpiration = params.id;
    const { idBoat, title, description, expirationDate } = body;

    const expiration = new Expiration({
        IdExpiration: idExpiration,
        IdBoat: idBoat,
        Title: title,
        Description: description,
        ExpirationDate: expirationDate,
        IsDeleted: 0,
        TimeSave: null,
        TimeDeleted: null,
        TimeLastUpdate: nowTimestamp
    });

    let internalError = null;
    const affectedRows = await Expiration.updateById(expiration)
        .catch(error => {
            internalError = error;
        });
    
    if(internalError){
        next(expirationErrors.errorUpdateExpiration(idExpiration));
        return;
    }

    if(affectedRows === 0){
        next(expirationErrors.notFound("updateById"));
        return;
    }

    const successMessage = expirationSuccessMessage.updateOneExpiration(idExpiration);
    sendSuccessResponse(response, successMessage);
};

exports.delete = async (request, response, next) => {

    const { params } = request;
    
    const idExpiration = params.id;
    const nowTimestamp = Date.now();

    const deleteParams = {
        idExpiration: idExpiration,
        timeDeleted: nowTimestamp
    }
    
    let internalError = null;
    const affectedRows = await Expiration.remove(deleteParams)
        .catch(error => {
            internalError = error;
        });

    if(internalError){
        next(expirationErrors.errorDeleteExpiration(idExpiration));
        return;
    }

    if(affectedRows === 0){
        next(expirationErrors.notFound("deleteExpiration"));
        return;
    }

    const successMessage = expirationSuccessMessage.deleteExpiration(idExpiration);
    sendSuccessResponse(response, successMessage);
};