const Motor = require("../models/motor.model.js");
const motorErrors = require("../messages/errorMessages/errorsMotor.js");
const motorSuccessMessage = require("../messages/successMessages/successMotor.js");

function sendResponse(res, successResponseObj){
    res.status(successResponseObj.status);
    res.send(successResponseObj);
}

exports.create = (req, res, next) => {

    if (Object.keys(req.body).length === 0){
        next(motorErrors.bodyEmpty);
        return;
    } 

    const nowTimestamp = Date.now();
    const motorConstructor = {
        IdBoat: req.body.IdBoat,
        Quantity: req.body.Quantity,
        Brand: req.body.Brand,
        NumberMotor: req.body.NumberMotor,
        Model: req.body.Model,
        Type: req.body.Type, 
        Power: req.body.Power,
        IsDeleted: 0,
        TimeSave: nowTimestamp,
        TimeDeleted: null,
        TimeLastUpdate: null
    }
    const motor = new Motor(motorConstructor);

    const modelResponseCallback = (modelError, modelResponse) => {

        if (modelError) {
            next(motorErrors.errorCreateMotor);
            return;
        } 

        let successResponse = motorSuccessMessage.motorCreated(modelResponse.id);
        sendResponse(res, successResponse);                 
    }

    Motor.create(motor, modelResponseCallback);
};

exports.findAll = (req, res, next) => {
    
    const motorParams = {
        IdCompany: req.body.IdCompany,
        IdBoat: req.body.IdBoat,
        NumberMotor: req.body.NumberMotor,
    }

    const modelResponseCallback = (modelError, motorsResult) => {

        if(modelError) {
            next(motorErrors.errorFindAllMotors);
            return;
        }        

        if(motorsResult.length) {
            let successResponse = motorSuccessMessage.findAllMotors(motorsResult);
            sendResponse(res, successResponse);
            return;
        }
        
        next(motorErrors.notFound("findAll"));
    }

    Motor.getAll(motorParams, modelResponseCallback);
};

exports.findOne = (req, res, next) => {

    const modelResponseCallback = (modelError, motorResult) => {
        
        if(modelError) {   
            next(motorErrors.errorFindOneMotor(req.params.id));
            return;
        }

        if(motorResult.length){            
            let successResponse = motorSuccessMessage.findOneMotor(motorResult);
            sendResponse(res, successResponse);
            return;
        }
        
        next(motorErrors.notFound("findOneById"));
    }

    Motor.findById(req.params.id, modelResponseCallback);
};

exports.update = (req, res, next) => {

    if(Object.keys(req.body).length === 0){
        next(motorErrors.bodyEmpty)
        return;
    }

    let nowTimestamp = Date.now();
    const motor = new Motor({
        IdBoat: req.body.IdBoat,
        Quantity: req.body.Quantity,
        Brand: req.body.Brand,
        NumberMotor: req.body.NumberMotor,
        Model: req.body.Model,
        Type: req.body.Type, 
        Power: req.body.Power,    
        IsDeleted: 0,
        TimeSave: null,
        TimeDeleted: null,
        TimeLastUpdate: nowTimestamp
    });

    const modelResponseCallback = (modelError, motorUpdated) => {

        if(modelError){

            if(modelError.kind === "not_found") {
                next(motorErrors.notFound("updateById"));
                return;
            }
            
            next(motorErrors.errorUpdateMotor(req.params.id));
            return;
        } 

        let successResponse = motorSuccessMessage.updateOneMotor(motorUpdated.id);
        sendResponse(res, successResponse);
    }

    Motor.updateById(req.params.id, motor, modelResponseCallback);
};

exports.delete = (req, res, next) => {

    const modelResponseCallback = (modelError, modelResponse) => {

        if(modelError){
            if(modelError.kind === "not_found"){
                next(motorErrors.notFound("deleteMotor"));
                return;
            }

            next(motorErrors.errorDeleteMotor(req.params.id));
            return;
        } 

        let successResponse = motorSuccessMessage.deleteMotor(req.params.id);
        sendResponse(res, successResponse);
    }

    Motor.remove(req.params.id, modelResponseCallback);
};