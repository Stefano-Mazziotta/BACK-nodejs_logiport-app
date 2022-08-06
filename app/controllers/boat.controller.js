const Boat = require("../models/boat.model.js");
const boatErrors = require("../messages/errorMessages/errorsBoat.js");
const boatSuccessMessage = require("../messages/successMessages/successBoat.js");

function sendResponse(res, successResponseObj){
    res.status(successResponseObj.status);
    res.send(successResponseObj);
}

exports.create = (req, res, next) => {

    if (Object.keys(req.body).length === 0){
        next(boatErrors.bodyEmpty);
        return;
    } 

    const nowTimestamp = Date.now();
    const boatConstructor = {
        IdCompany: req.body.IdCompany,
        BoatName: req.body.BoatName,
        Enrollment: req.body.Enrollment,
        DistinguishingMark: req.body.DistinguishingMark, 
        HullMaterial: req.body.HullMaterial,
        BoatType: req.body.BoatType,
        Service: req.body.Service,
        SpecificExploitation: req.body.SpecificExploitation,
        EnrollmentDate: req.body.EnrollmentDate,
        ConstructionDate: req.body.ConstructionDate,
        NAT: req.body.NAT,
        NAN: req.body.NAN,
        Eslora: req.body.Eslora,
        Manga: req.body.Manga,
        Puntal: req.body.Puntal,
        PeopleTransported: req.body.PeopleTransported,
        BoatPower: req.body.BoatPower,
        ElectricPower: req.body.ElectricPower,
        IsDeleted: 0,
        TimeSave: nowTimestamp,
        TimeDeleted: null,
        TimeLastUpdate: null
    }
    const boat = new Boat(boatConstructor);

    Boat.create(boat, (modelError, modelResponse) => {

        if (modelError) {
            next(boatErrors.errorCreateBoat);
            return;
        } 
        console.log(`boat ${modelResponse.id} created successfuly`);
        let successResponse = boatSuccessMessage.boatCreated(modelResponse.id);
        sendResponse(res, successResponse);                 
    });
};

exports.findAll = (req, res, next) => {
    
    const boatParams = {
        IdCompany: req.query.IdCompany,
        BoatName: req.query.BoatName,
    }

    Boat.getAll(boatParams, (modelError, boatsResult) => {

        if(modelError) {
            next(boatErrors.errorFindAllBoats);
            return;
        }        

        if(boatsResult.length) {
            let successResponse = boatSuccessMessage.findAllBoats(boatsResult);
            sendResponse(res, successResponse);
            return;
        }
        
        next(boatErrors.notFound("findAll"));
    });
};

exports.findOne = (req, res, next) => {
    Boat.findById(req.params.id, (modelError, boatResult) => {
        
        if(modelError) {   
            next(boatErrors.errorFindOneBoat(req.params.id));
            return;
        }

        if(boatResult.length){            
            let successResponse = boatSuccessMessage.findOneBoat(boatResult);
            sendResponse(res, successResponse);
            return;
        }
        
        next(boatErrors.notFound("findOneById"));
    });
};

exports.update = (req, res, next) => {

    if(Object.keys(req.body).length === 0){
        next(boatErrors.bodyEmpty)
        return;
    }

    let nowTimestamp = Date.now();
    const boat = new Boat({
        IdCompany: req.body.IdCompany,
        BoatName: req.body.BoatName,
        Enrollment: req.body.Enrollment,
        DistinguishingMark: req.body.DistinguishingMark, 
        HullMaterial: req.body.HullMaterial,
        BoatType: req.body.BoatType,
        Service: req.body.Service,
        SpecificExploitation: req.body.SpecificExploitation,
        EnrollmentDate: req.body.EnrollmentDate,
        ConstructionDate: req.body.ConstructionDate,
        NAT: req.body.NAT,
        NAN: req.body.NAN,
        Eslora: req.body.Eslora,
        Manga: req.body.Manga,
        Puntal: req.body.Puntal,
        PeopleTransported: req.body.PeopleTransported,
        BoatPower: req.body.BoatPower,
        ElectricPower: req.body.ElectricPower,
        IsDeleted: 0,
        TimeSave: null,
        TimeDeleted: null,
        TimeLastUpdate: nowTimestamp
    });

    Boat.updateById(req.params.id, boat, (modelError, boatUpdated) => {

        if(modelError){

            if(modelError.kind === "not_found") {
                next(boatErrors.notFound("updateById"));
                return;
            }

            next(boatErrors.errorUpdateBoat(req.params.id));
            return;
        } 

        let successResponse = boatSuccessMessage.updateOneBoat(boatUpdated.id);
        sendResponse(res, successResponse);
    });
};

exports.delete = (req, res, next) => {
    
    Boat.remove(req.params.id, (modelError, modelResponse) => {

        if(modelError){
            if(modelError.kind === "not_found"){
                next(boatErrors.notFound("deleteBoat"));
                return;
            }

            next(boatErrors.errorDeleteBoat(req.params.id));
            return;
        } 

        let successResponse = boatSuccessMessage.deleteBoat(req.params.id);
        sendResponse(res, successResponse);
    });
};