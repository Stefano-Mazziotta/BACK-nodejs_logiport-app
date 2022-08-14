const Expiration = require("../models/expiration.model.js");
const expirationErrors = require("../messages/errorMessages/errorsExpiration.js");
const expirationSuccessMessage = require("../messages/successMessages/successExpiration.js");

function sendResponse(res, successResponseObj){
    res.status(successResponseObj.status);
    res.send(successResponseObj);
}

exports.create = (req, res, next) => {

    if (Object.keys(req.body).length === 0){
        next(expirationErrors.bodyEmpty);
        return;
    } 

    const nowTimestamp = Date.now();
    const expirationConstructor = {
        IdBoat: req.body.IdBoat,
        Title: req.body.Title,
        Description: req.body.Description,
        ExpirationDate: req.body.ExpirationDate,
        IsDeleted: 0,
        TimeSave: nowTimestamp,
        TimeDeleted: null,
        TimeLastUpdate: null
    }
    const expiration = new Expiration(expirationConstructor);

    const modelResponseCallback = (modelError, modelResponse) => {

        if (modelError) {
            next(expirationErrors.errorCreateExpiration);
            return;
        } 

        let successResponse = expirationSuccessMessage.expirationCreated(modelResponse.id);
        sendResponse(res, successResponse);                 
    }

    Expiration.create(expiration, modelResponseCallback);
};

exports.findAll = (req, res, next) => {
    
    const expirationParams = {
        IdCompany: req.body.IdCompany,
        IdBoat: req.body.IdBoat,
        Title: req.body.Title,
    }

    const modelResponseCallback = (modelError, expirationsResult) => {

        if(modelError) {
            next(expirationErrors.errorFindAllExpirations);
            return;
        }        

        if(expirationsResult.length) {
            let successResponse = expirationSuccessMessage.findAllExpirations(expirationsResult);
            sendResponse(res, successResponse);
            return;
        }
        
        next(expirationErrors.notFound("findAll"));
    }

    Expiration.getAll(expirationParams, modelResponseCallback);
};

exports.findOne = (req, res, next) => {

    const modelResponseCallback = (modelError, expirationResult) => {
        
        if(modelError) {   
            next(expirationErrors.errorFindOneExpiration(req.params.id));
            return;
        }

        if(expirationResult.length){            
            let successResponse = expirationSuccessMessage.findOneExpiration(expirationResult);
            sendResponse(res, successResponse);
            return;
        }
        
        next(expirationErrors.notFound("findOneById"));
    }

    Expiration.findById(req.params.id, modelResponseCallback);
};

exports.update = (req, res, next) => {

    if(Object.keys(req.body).length === 0){
        next(expirationErrors.bodyEmpty)
        return;
    }

    let nowTimestamp = Date.now();
    const expiration = new Expiration({
        IdBoat: req.body.IdBoat,
        Title: req.body.Title,
        Description: req.body.Description,
        ExpirationDate: req.body.ExpirationDate,
        IsDeleted: 0,
        TimeSave: null,
        TimeDeleted: null,
        TimeLastUpdate: nowTimestamp
    });

    const modelResponseCallback = (modelError, expirationUpdated) => {

        if(modelError){

            if(modelError.kind === "not_found") {
                next(expirationErrors.notFound("updateById"));
                return;
            }
            
            next(expirationErrors.errorUpdateExpiration(req.params.id));
            return;
        } 

        let successResponse = expirationSuccessMessage.updateOneExpiration(expirationUpdated.id);
        sendResponse(res, successResponse);
    }

    Expiration.updateById(req.params.id, expiration, modelResponseCallback);
};

exports.delete = (req, res, next) => {

    const modelResponseCallback = (modelError, modelResponse) => {

        if(modelError){
            if(modelError.kind === "not_found"){
                next(expirationErrors.notFound("deleteExpiration"));
                return;
            }

            next(expirationErrors.errorDeleteExpiration(req.params.id));
            return;
        } 

        let successResponse = expirationSuccessMessage.deleteExpiration(req.params.id);
        sendResponse(res, successResponse);
    }

    Expiration.remove(req.params.id, modelResponseCallback);
};