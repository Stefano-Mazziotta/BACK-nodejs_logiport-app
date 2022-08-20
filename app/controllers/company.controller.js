const Company = require("../models/company.model");

const companyErrors = require("../messages/errorMessages/errorsCompany");
const companySuccessMessage = require("../messages/successMessages/successCompany");

const idGenerator = require("../utils/idGenerator")
const sendSuccessResponse = require("../messages/successMessages/sendSuccessResponse");

exports.create = async (request, response, next) => {

    const { body } = request;

    if (Object.keys(body).length === 0){
        next(companyErrors.bodyEmpty);
        return;
    }

    const idCompany = idGenerator();
    const nowTimestamp = Date.now();
    const { razonSocial, cuit } = body;

    const company = new Company({
        IdCompany: idCompany,
        RazonSocial: razonSocial,
        CUIT: cuit,
        IsDeleted: 0,
        TimeSave: nowTimestamp,
        TimeDeleted: null,
        TimeLastUpdate: null
    })

    let internalError = null;
    const affectedRows = await Company.create(company)
        .catch( error => {
            internalError = error;
        });

    if(internalError || affectedRows === 0){
        next(companyErrors.errorCreateCompany);
        return;
    }

    const successMessage = companySuccessMessage.companyCreated(idCompany);
    sendSuccessResponse(response, successMessage);     
};

exports.findAll = async (request, response, next) => {

    const { body } = request;
    const { razonSocial } = body;

    let internalError = null;
    const companies = await Company.getAll(razonSocial)
        .catch( error => {
            internalError = error;
        });

    if(internalError){
        next(companyErrors.errorFindAllCompany);
        return;
    }

    if(!companies){
        next(companyErrors.notFound("findAll"));
        return;
    }

    const successMessage = companySuccessMessage.findAllCompanies(companies);
    sendSuccessResponse(response, successMessage);
};

exports.findOne = async (request, response, next) => {
    const { params } = request;
    const idCompany = params.id;

    let internalError = null;
    const company = await Company.findById(idCompany)
        .catch(error => {
            internalError = error;
        });

    if(internalError){
        next(companyErrors.errorFindOneCompany(idCompany));
        return;
    }

    if(!company){
        next(companyErrors.notFound("findOneById"));
        return;
    }

    const successMessage = companySuccessMessage.findOneCompany(company);
    sendSuccessResponse(response, successMessage);
};

exports.update = async (request, response, next) => {
    
    const { body, params } = request;

    if(Object.keys(body).length === 0){
        next(companyErrors.bodyEmpty);
        return;
    }

    const idCompany = params.id;
    const { razonSocial, cuit } = body;
    const nowTimestamp = Date.now();

    const company = new Company({
        IdCompany: idCompany,
        RazonSocial: razonSocial,
        CUIT: cuit,
        TimeLastUpdate: nowTimestamp
    })

    let internalError = null;
    const affectedRows = await Company.updateById(company)
        .catch( error => {
            internalError = error;
        });

    if(internalError){
        next(companyErrors.errorUpdateCompany(idCompany));
        return;
    }

    if(affectedRows === 0){
        next(companyErrors.notFound("updatedById"));
        return;
    }

    const successMessage = companySuccessMessage.updateOneCompany(idCompany);
    sendSuccessResponse(response, successMessage);
};

exports.delete = async (request, response, next) => {
    
    const { params } = request;

    const idCompany = params.id;
    const timeDeleted = Date.now();

    const deleteParams = {
        idCompany: idCompany,
        timeDeleted: timeDeleted
    };

    let internalError = null;
    const affectedRows = await Company.remove(deleteParams)
        .catch( error => {
            internalError = error;
        });

    if(internalError){
        next(companyErrors.errorDeleteCompany(idCompany));
        return;
    }

    if(affectedRows === 0){ 
        next(companyErrors.notFound("deleteCompany"));
        return;
    }

    const successMessage = companySuccessMessage.deleteCompany(idCompany);
    sendSuccessResponse(response, successMessage);
};