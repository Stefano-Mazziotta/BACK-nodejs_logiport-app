const Motor = require("../models/motor.model");

const motorErrors = require("../messages/errorMessages/motor.error");
const motorSuccessMessage = require("../messages/successMessages/motor.success");

const idGenerator = require("../utils/idGenerator");
const sendSuccessResponse = require("../messages/successMessages/sendSuccessResponse");

exports.create = async (request, response, next) => {

    const { body } = request;

    if (Object.keys(body).length === 0){
        next(motorErrors.bodyEmpty);
        return;
    } 

    const idMotor = idGenerator();
    const nowTimestamp = Date.now();

    const motorConstructor = {
        IdMotor: idMotor,
        IdBoat: body.idBoat,
        Quantity: body.quantity,
        Brand: body.brand,
        NumberMotor: body.numberMotor,
        Model: body.model,
        Type: body.type, 
        Power: body.power,
        Location: body.location,
        TimeSave: nowTimestamp,
        TimeLastUpdate: null,
        IsDeleted: 0,
        TimeDeleted: null
    }
    const motor = new Motor(motorConstructor);

    let internalError = null;
    const affectedRows = await Motor.create(motor)
        .catch( error => {
            internalError = error;
        });

    if(internalError || affectedRows === 0){
        next(motorErrors.errorCreateMotor);
        return;
    }

    const successMessage = motorSuccessMessage.motorCreated(idMotor);
    sendSuccessResponse(response, successMessage);
};

exports.findAll = async (request, response, next) => {

    const { query } = request;
    const { idCompany, idBoat, numberMotor } = query;
    
    const motorParams = {
        IdCompany: idCompany,
        IdBoat: idBoat,
        NumberMotor: numberMotor,
    }

    let internalError = null;
    const motors = await Motor.getAll(motorParams)
        .catch( error => {
            internalError = error;
        });
    
    if(internalError){
        next(motorErrors.errorFindAllMotors);
        return;
    }

    if(!motors){
        next(motorErrors.notFound("findAll"));
        return;
    }

    const successMessage = motorSuccessMessage.findAllMotors(motors);
    sendSuccessResponse(response, successMessage);    
};

exports.findOne = async (request, response, next) => {

    const { params } = request;
    const idMotor = params.id;

    let internalError = null;
    const motor = await Motor.findById(idMotor)
        .catch( error => {
            internalError = error;
        });
    
    if(internalError){
        next(motorErrors.errorFindOneMotor(idMotor));
        return;
    }

    if(!motor){
        next(motorErrors.notFound("findOneById"));
        return;
    }

    const successMessage = motorSuccessMessage.findOneMotor(motor);
    sendSuccessResponse(response, successMessage);
};

exports.update = async (request, response, next) => {

    const { body, params } = request;

    if(Object.keys(body).length === 0){
        next(motorErrors.bodyEmpty)
        return;
    }

    const idMotor = params.id;
    const nowTimestamp = Date.now();

    const motor = new Motor({
        IdMotor: idMotor,
        IdBoat: body.idBoat,
        Quantity: body.quantity,
        Brand: body.brand,
        NumberMotor: body.numberMotor,
        Model: body.model,
        Type: body.type, 
        Power: body.power,    
        Location: body.location,
        TimeSave: null,
        TimeLastUpdate: nowTimestamp,
        IsDeleted: 0,
        TimeDeleted: null
    });

    let internalError = null;
    const affectedRows = await Motor.updateById(motor)
        .catch( error => {
            internalError = error;
        });

    if(internalError){
        next(motorErrors.errorUpdateMotor(idMotor));
        return;
    }
    
    if(affectedRows === 0){
        next(motorErrors.notFound("updateById"));
        return;
    }

    const successMessage = motorSuccessMessage.updateOneMotor(idMotor);
    sendSuccessResponse(response, successMessage);
};

exports.delete = async (request, response, next) => {
    
    const { params } = request;
    
    const idMotor = params.id;
    const timeDeleted = Date.now();

    const deleteParams = {
        idMotor: idMotor,
        timeDeleted: timeDeleted
    }

    let internalError = null;
    const affectedRows = await Motor.remove(deleteParams)
        .catch( error => {
            internalError = error;
        });

    if(internalError){
        next(motorErrors.errorDeleteMotor(idMotor));
        return;
    }

    if(affectedRows === 0){
        next(motorErrors.notFound("deleteMotor"));
        return;
    }

    const successMessage = motorSuccessMessage.deleteMotor(idMotor);
    sendSuccessResponse(response, successMessage);
};