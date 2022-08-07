const Company = require("../models/company.model.js");
const companyErrors = require("../messages/errorMessages/errorsCompany.js");
const companySuccessMessage = require("../messages/successMessages/successCompany.js");

function sendResponse(res, successResponseObj){
    res.status(successResponseObj.status);
    res.send(successResponseObj);
}


exports.create = (req, res, next) => {

    if (Object.keys(req.body).length === 0){
        next(companyErrors.bodyEmpty);
        return;
    } 

    let nowTimestamp = Date.now();
    const company = new Company({
        RazonSocial: req.body.RazonSocial,
        CUIT: req.body.CUIT,
        IsDeleted: 0,
        TimeSave: nowTimestamp,
        TimeDeleted: null,
        TimeLastUpdate: null
    })

    Company.create(company, (modelError, companyCreated) => {
        if(modelError){
            next(companyErrors.errorCreateCompany);
            return;
        }
    
        const successResponse = companySuccessMessage.companyCreated(companyCreated.id);
        sendResponse(res, successResponse);
    });
};

exports.findAll = (req, res, next) => {
    const razonSocial = req.body.RazonSocial;

    Company.getAll(razonSocial, (modelError, companiesList) => {
        
        if(modelError) {
            next(companyErrors.errorFindAllCompany);
            return;
        }        

        if(companiesList.length) {
            const successResponse = companySuccessMessage.findAllCompanies(companiesList);
            sendResponse(res, successResponse);
            return;
        }
        
        next(companyErrors.notFound("findAll"));
    });
};

exports.findOne = (req, res, next) => {
    Company.findById(req.params.id, (modelError, companyResult) => {

        if(modelError) {   
            next(companyErrors.errorFindOneCompany(req.params.id));
            return;
        }

        if(companyResult.length){            
            const successResponse = companySuccessMessage.findOneCompany(companyResult);
            sendResponse(res, successResponse);
            return;
        }
        
        next(companyErrors.notFound("findOneById"));
    });

};

exports.update = (req, res, next) => {
    
    if(Object.keys(req.body).length === 0){
        next(companyErrors.bodyEmpty);
        return;
    }

    let nowTimestamp = Date.now();
    const company = new Company({
        RazonSocial: req.body.RazonSocial,
        CUIT: req.body.CUIT,
        TimeLastUpdate: nowTimestamp
    })

    Company.updateById( req.params.id, company, (modelError, companyUpdated) => {

        if(modelError){

            if(modelError.kind === "not_found") {
                next(companyErrors.notFound("updateById"));
                return;
            }

            next(companyErrors.errorUpdateCompany(req.params.id));
            return;
        } 

        const successResponse = companySuccessMessage.updateOneCompany(companyUpdated.id);
        sendResponse(res, successResponse);        
    });
};

exports.delete = (req, res, next) => {
    let timeDeleted = Date.now();

    Company.remove(req.params.id,  timeDeleted, (modelError, modelResponse) => {

        if(modelError){

            if(modelError.kind === "not_found"){
                next(companyErrors.notFound("deleteCompany"));
                return;
            }

            next(companyErrors.errorDeleteCompany(req.params.id));
            return;
        } 

        const successResponse = companySuccessMessage.deleteCompany(req.params.id);
        sendResponse(res, successResponse);
    });
};