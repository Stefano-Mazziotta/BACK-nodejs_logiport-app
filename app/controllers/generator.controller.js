const Generator = require("../models/generator.model");

const generatorErrors = require("../messages/errorMessages/errorsGenerator");
const generatorSuccessMessage = require("../messages/successMessages/successGenerator");

const getRandomId = require("../utils/idGenerator");
const sendSuccessResponse = require("../messages/successMessages/sendSuccessResponse");

exports.create =  async (request, response, next) => {

    const { body } = request;

    if (Object.keys(body).length === 0){
        next(generatorErrors.bodyEmpty);
        return;
    } 

    const idGenerator = getRandomId();
    const nowTimestamp = Date.now();

    const generatorConstructor = {
        IdGenerator: idGenerator,
        IdBoat: body.IdBoat,
        Quantity: body.Quantity,
        Brand: body.Brand,
        NumberGenerator: body.NumberGenerator,
        Model: body.Model,
        Type: body.Type, 
        Power: body.Power,
        IsDeleted: 0,
        TimeSave: nowTimestamp,
        TimeDeleted: null,
        TimeLastUpdate: null
    }
    const generator = new Generator(generatorConstructor);

    let internalError = null;
    const affectedRows = await Generator.create(generator)
        .catch( error => {
            internalError = error;
        });

    if(internalError || affectedRows === 0){
        next(generatorErrors.errorCreateGenerator);
        return;
    }

    const successMessage = generatorSuccessMessage.generatorCreated(idGenerator);
    sendSuccessResponse(response, successMessage);
};

exports.findAll = async (request, response, next) => {

    const { body } = request;

    if (Object.keys(body).length === 0){
        next(generatorErrors.bodyEmpty);
        return;
    } 

    const { idCompany, idBoat, numberGenerator} = body;
    
    const getAllParams = {
        idCompany: idCompany,
        idBoat: idBoat,
        numberGenerator: numberGenerator
    }

    let internalError = null;
    const generators = await Generator.getAll(getAllParams)
        .catch( error => {
            internalError = error;
        });
    
    if(internalError){
        next(generatorErrors.errorFindAllGenerators);
        return;
    }

    if(!generators){
        next(generatorErrors.notFound("findAll"));
        return;
    }

    const successMessage = generatorSuccessMessage.findAllGenerators(generators);
    sendSuccessResponse(response , successMessage);
};

exports.findOne = async (request, response, next) => {

    const { params } = request;
    const idGenerator = params.id;

    let internalError = null;
    const generator = await Generator.findById(idGenerator)
        .catch( error => {
            internalError = error;
        });
    
    if(internalError){
        next(generatorErrors.errorFindOneGenerator(idGenerator));
        return;
    }

    if(!generator){
        next(generatorErrors.notFound("findOneById"));
        return;
    }

    const successMessage = generatorSuccessMessage.findOneGenerator(generator);
    sendSuccessResponse(response, successMessage);
};

exports.update = async (request, response, next) => {

    const { body, params } = request

    if(Object.keys(body).length === 0){
        next(generatorErrors.bodyEmpty)
        return;
    }

    const idGenerator = params.id;
    const nowTimestamp = Date.now();

    const generator = new Generator({
        IdGenerator: idGenerator,
        IdBoat: body.IdBoat,
        Quantity: body.Quantity,
        Brand: body.Brand,
        NumberGenerator: body.NumberGenerator,
        Model: body.Model,
        Type: body.Type, 
        Power: body.Power,    
        IsDeleted: 0,
        TimeSave: null,
        TimeDeleted: null,
        TimeLastUpdate: nowTimestamp
    });

    let internalError = null;
    const affectedRows = await Generator.updateById(generator)
        .catch( error => {
            internalError = error;
        });
    
    if(internalError){
        next(generatorErrors.errorUpdateGenerator(idGenerator));
        return;
    }

    if(affectedRows === 0){
        next(generatorErrors.notFound("updateById"));
        return;
    }
    
    const successMessage = generatorSuccessMessage.updateOneGenerator(idGenerator);
    sendSuccessResponse(response, successMessage);
};

exports.delete = async (request, response, next) => {

    const { params } = request;

    const idGenerator = params.id;
    const nowTimestamp = Date.now();

    const deleteParams = {
        idGenerator: idGenerator,
        timeDeleted: nowTimestamp
    }

    let internalError = null;
    const affectedRows = await Generator.remove(deleteParams)
        .catch( error => {
            internalError = error;
        });

    if(internalError){
        next(generatorErrors.errorDeleteGenerator(idGenerator));
        return;
    }

    if(affectedRows === 0){
        next(generatorErrors.notFound("deleteGenerator"));
        return;
    }

    const successMessage = generatorSuccessMessage.deleteGenerator(idGenerator);
    sendSuccessResponse(response, successMessage);
};