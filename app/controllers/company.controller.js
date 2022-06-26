const Company = require("../models/company.model.js");

// Create and save a new Company
exports.create = (req, res) => {
    if (!req.body){
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // create company
    let nowTimestamp = Date.now();
    const company = new Company({
        razonSocial: req.body.razonSocial,
        cuit: req.body.cuit,
        isDeleted: 0,
        timeSave: nowTimestamp,
        timeDeleted: null,
        timeLastUpdate: null
    })

    // save company in the database
    Company.create(company, (err, data) => {
        if(err){
            res.status(500).send({
                message: err.message || "Some error occurred while creating the company."
            });
        }
        res.send(data);
    });
};

// Retrieve all Companies from the database (with condition).
exports.findAll = (req, res) => {
    const razonSocial = req.body.razonSocial;
    Company.getAll(razonSocial, (err, data) => {
        if(err){
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving companies."
            });
        }
        res.send(data);
    });
};

// Find a single Company with an id.
exports.findOne = (req, res) => {
    Company.findById(req.params.id, (err,data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found with id ${req.params.id}.`
                });
            }
            res.status(500).send({
                message: `Error retrieving Company with id ${req.params.id}` 
            })
        } else {
            res.send(data);
        }
    });
};

// Update a Company identified by the id in the request.
exports.update = (req, res) => {
    // validate request
    if(Object.keys(req.body).length === 0){
        res.status(400).send({
            message: "Content can not be empty!"
        });    
    }

    let nowTimestamp = Date.now();
    const company = new Company({
        razonSocial: req.body.razonSocial,
        cuit: req.body.cuit,
        timeLastUpdate: nowTimestamp
    })

    Company.updateById(
        req.params.id,
        company,
        (err, data) => {
            if(err){
                if(err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Company with id ${req.params.id}.`
                    });
                }
                res.status(500).send({
                    message: `Error updating Company with ${req.params.id}.`
                })
            } else {
                res.send(data);
            }
        }
    );
};

// Delete a Company with the specified id in the request.
exports.delete = (req, res) => {
    let timeDeleted = Date.now();
    Company.remove(req.params.id,  timeDeleted, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `Not found Company with id ${req.params.id}`
                });
            }
            res.status(500).send({
                message: `Could not delete Company with id ${req.params.id}.`
            });
        } else {
            res.send({ message: `Company was deleted successfully!`});
        }
    });
};