const Boat = require("../models/boat.model");

const boatErrors = require("../messages/errorMessages/boat.error");
const boatSuccessMessage = require("../messages/successMessages/boat.success");

const idGenerator = require("../utils/idGenerator")
const sendSuccessResponse = require("../messages/successMessages/sendSuccessResponse");

exports.create = async (request, response, next) => {

    const { body } = request;

    if (Object.keys(body).length === 0){
        next(boatErrors.bodyEmpty);
        return;
    }

    const nowTimestamp = Date.now();
    const idBoat = idGenerator();

    const boatConstructor = {
        IdBoat: idBoat,
        IdCompany: body.idCompany,
        BoatName: body.boatName,
        Enrollment: body.enrollment,
        DistinguishingMark: body.distinguishingMark, 
        HullMaterial: body.hullMaterial,
        BoatType: body.boatType,
        Service: body.service,
        SpecificExploitation: body.specificExploitation,
        EnrollmentDate: body.enrollmentDate,
        ConstructionDate: body.constructionDate,
        NAT: body.nat,
        NAN: body.nan,
        Eslora: body.eslora,
        Manga: body.manga,
        Puntal: body.puntal,
        PeopleTransported: body.peopleTransported,
        BoatPower: body.boatPower,
        ElectricPower: body.electricPower,
        IsDeleted: 0,
        TimeSave: nowTimestamp,
        TimeDeleted: null,
        TimeLastUpdate: null
    }
    const boat = new Boat(boatConstructor);

    let internalError = null;
    const affectedRows = await Boat.create(boat)
        .catch( error => {
            internalError = error;
        })
    
    if(internalError || affectedRows === 0){
        next(boatErrors.errorCreateBoat);
        return;
    }

    const successMessage = boatSuccessMessage.boatCreated(idBoat);
    sendSuccessResponse(response, successMessage);
};

exports.findAll = async (request, response, next) => {

    const { query } = request;
    const { idCompany, boatName } = query;

    const boatParams = {
        IdCompany: idCompany,
        BoatName: boatName
    }

    let internalError = null;
    const boats = await Boat.getAll(boatParams)
        .catch( error => {
            internalError = error;
        });
    
    if(internalError){
        next(boatErrors.errorFindAllBoats);
        return;
    }

    if(!boats){
        next(boatErrors.notFound("findAllBoats"));
        return;
    }

    const successMessage = boatSuccessMessage.findAllBoats(boats);
    sendSuccessResponse(response, successMessage);
};

exports.findOne = async (request, response, next) => {

    const { params } = request;
    const idBoat = params.id;

    let internalError = null;
    const boat = await Boat.findById(idBoat)
        .catch( error => {
            internalError = error;
        });

    if(internalError){
        next(boatErrors.errorFindOneBoat(idBoat));
        return;
    }

    if(!boat){
        next(boatErrors.notFound("findOneById"));
        return;
    }

    const successMessage = boatSuccessMessage.findOneBoat(boat);
    sendSuccessResponse(response, successMessage);
};

exports.update = async (request, response, next) => {

    const { body, params } = request;   

    if(Object.keys(body).length === 0){
        next(boatErrors.bodyEmpty)
        return;
    }
    const idBoat = params.id;
    const nowTimestamp = Date.now();

    const boat = new Boat({
        IdBoat: idBoat,
        IdCompany: body.idCompany,
        BoatName: body.boatName,
        Enrollment: body.enrollment,
        DistinguishingMark: body.distinguishingMark, 
        HullMaterial: body.hullMaterial,
        BoatType: body.boatType,
        Service: body.service,
        SpecificExploitation: body.specificExploitation,
        EnrollmentDate: body.enrollmentDate,
        ConstructionDate: body.constructionDate,
        NAT: body.nat,
        NAN: body.nan,
        Eslora: body.eslora,
        Manga: body.manga,
        Puntal: body.puntal,
        PeopleTransported: body.peopleTransported,
        BoatPower: body.boatPower,
        ElectricPower: body.electricPower,
        IsDeleted: 0,
        TimeSave: null,
        TimeDeleted: null,
        TimeLastUpdate: nowTimestamp
    });

    let internalError = null;
    const affectedRows = await Boat.updateById(boat)
        .catch( error => {
            internalError = error;
        });
    
    if(internalError){
        next(boatErrors.errorUpdateBoat(idBoat));
        return;
    }

    if(affectedRows === 0){
        next(boatErrors.notFound("updateById"));
        return;
    }

    const successMessage = boatSuccessMessage.updateOneBoat(idBoat);
    sendSuccessResponse(response, successMessage);
};

exports.delete = async (request, response, next) => {
    
    const { params } = request;
    const idBoat = params.id;

    let internalError = null;
    const affectedRows = await Boat.remove(idBoat)
        .catch( error => {
            internalError = error;
        });

    if(internalError){
        next(boatErrors.errorDeleteBoat(idBoat));
        return;
    }

    if(affectedRows === 0){
        next(boatErrors.notFound("deleteBoat"));
        return;
    }

    const successMessage = boatSuccessMessage.deleteBoat(idBoat);
    sendSuccessResponse(response, successMessage);
};