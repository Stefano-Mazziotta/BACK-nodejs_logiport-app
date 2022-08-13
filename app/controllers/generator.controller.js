const Generator = require("../models/generator.model.js");
const generatorErrors = require("../messages/errorMessages/errorsGenerator.js");
const generatorSuccessMessage = require("../messages/successMessages/successGenerator.js");

function sendResponse(res, successResponseObj){
    res.status(successResponseObj.status);
    res.send(successResponseObj);
}

exports.create = (req, res, next) => {

    if (Object.keys(req.body).length === 0){
        next(generatorErrors.bodyEmpty);
        return;
    } 

    const nowTimestamp = Date.now();
    const generatorConstructor = {
        IdBoat: req.body.IdBoat,
        Quantity: req.body.Quantity,
        Brand: req.body.Brand,
        NumberGenerator: req.body.NumberGenerator,
        Model: req.body.Model,
        Type: req.body.Type, 
        Power: req.body.Power,
        IsDeleted: 0,
        TimeSave: nowTimestamp,
        TimeDeleted: null,
        TimeLastUpdate: null
    }
    const generator = new Generator(generatorConstructor);

    const modelResponseCallback = (modelError, modelResponse) => {

        if (modelError) {
            next(generatorErrors.errorCreateGenerator);
            return;
        } 

        let successResponse = generatorSuccessMessage.generatorCreated(modelResponse.id);
        sendResponse(res, successResponse);                 
    }

    Generator.create(generator, modelResponseCallback);
};

exports.findAll = (req, res, next) => {
    
    const generatorParams = {
        IdCompany: req.body.IdCompany,
        IdBoat: req.body.IdBoat,
        NumberGenerator: req.body.NumberGenerator,
    }

    const modelResponseCallback = (modelError, generatorsResult) => {

        if(modelError) {
            next(generatorErrors.errorFindAllGenerators);
            return;
        }        

        if(generatorsResult.length) {
            let successResponse = generatorSuccessMessage.findAllGenerators(generatorsResult);
            sendResponse(res, successResponse);
            return;
        }
        
        next(generatorErrors.notFound("findAll"));
    }

    Generator.getAll(generatorParams, modelResponseCallback);
};

exports.findOne = (req, res, next) => {

    const modelResponseCallback = (modelError, generatorResult) => {
        
        if(modelError) {   
            next(generatorErrors.errorFindOneGenerator(req.params.id));
            return;
        }

        if(generatorResult.length){            
            let successResponse = generatorSuccessMessage.findOneGenerator(generatorResult);
            sendResponse(res, successResponse);
            return;
        }
        
        next(generatorErrors.notFound("findOneById"));
    }

    Generator.findById(req.params.id, modelResponseCallback);
};

exports.update = (req, res, next) => {

    if(Object.keys(req.body).length === 0){
        next(generatorErrors.bodyEmpty)
        return;
    }

    let nowTimestamp = Date.now();
    const generator = new Generator({
        IdBoat: req.body.IdBoat,
        Quantity: req.body.Quantity,
        Brand: req.body.Brand,
        NumberGenerator: req.body.NumberGenerator,
        Model: req.body.Model,
        Type: req.body.Type, 
        Power: req.body.Power,    
        IsDeleted: 0,
        TimeSave: null,
        TimeDeleted: null,
        TimeLastUpdate: nowTimestamp
    });

    const modelResponseCallback = (modelError, generatorUpdated) => {

        if(modelError){

            if(modelError.kind === "not_found") {
                next(generatorErrors.notFound("updateById"));
                return;
            }
            
            next(generatorErrors.errorUpdateGenerator(req.params.id));
            return;
        } 

        let successResponse = generatorSuccessMessage.updateOneGenerator(generatorUpdated.id);
        sendResponse(res, successResponse);
    }

    Generator.updateById(req.params.id, generator, modelResponseCallback);
};

exports.delete = (req, res, next) => {

    const modelResponseCallback = (modelError, modelResponse) => {

        if(modelError){
            if(modelError.kind === "not_found"){
                next(generatorErrors.notFound("deleteGenerator"));
                return;
            }

            next(generatorErrors.errorDeleteGenerator(req.params.id));
            return;
        } 

        let successResponse = generatorSuccessMessage.deleteGenerator(req.params.id);
        sendResponse(res, successResponse);
    }

    Generator.remove(req.params.id, modelResponseCallback);
};