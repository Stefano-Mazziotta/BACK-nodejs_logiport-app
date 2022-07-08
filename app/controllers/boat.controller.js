const Boat = require("../models/boat.model.js");

// Create and save a new Boat
exports.create = (req, res) => {
    if (!req.body){
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // create Boat
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
        Nat: req.body.Nat,
        Nan: req.body.Nan,
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
    });

    // save boat in the database
    Boat.create(boat, (err, data) => {
        if(err){
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Boat."
            });
        }
        res.send(data);
    });
};

// Retrieve all Boats from the database (with condition).
exports.findAll = (req, res) => {
    
    const boatParams = {
        IdCompany: req.query.IdCompany,
        BoatName: req.query.BoatName,
    }

    Boat.getAll(boatParams, (err, data) => {
        if(err){
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found boats with IdCompany ${boatParams.IdCompany}.`
                });
            }
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving boats."
            });
        }
        res.send(data);
    });
};

// Find a single Boat with an id.
exports.findOne = (req, res) => {
    Boat.findById(req.params.id, (err,data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found with id ${req.params.id}.`
                });
            }
            res.status(500).send({
                message: `Error retrieving Boat with id ${req.params.id}` 
            })
        } else {
            res.send(data);
        }
    });
};

// Update a Boat identified by the id in the request.
exports.update = (req, res) => {
    // validate request
    if(Object.keys(req.body).length === 0){
        res.status(400).send({
            message: "Content can not be empty!"
        });    
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
        Nat: req.body.Nat,
        Nan: req.body.Nan,
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

    Boat.updateById(
        req.params.id,
        boat,
        (err, data) => {
            if(err){
                if(err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Boat with id ${req.params.id}.`
                    });
                }
                res.status(500).send({
                    message: `Error updating Boat with ${req.params.id}.`
                })
            } else {
                res.send(data);
            }
        }
    );
};

// Delete a Boat with the specified id in the request.
exports.delete = (req, res) => {
    let timeDeleted = Date.now();
    Boat.remove(req.params.id,  timeDeleted, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `Not found Boat with id ${req.params.id}`
                });
            }
            res.status(500).send({
                message: `Could not delete Boat with id ${req.params.id}.`
            });
        } else {
            res.send({ message: `Boat was deleted successfully!`});
        }
    });
};