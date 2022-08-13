module.exports = app => {
    const motorController = require("../controllers/motor.controller.js");
    var router = require("express").Router();

    router.post("/", motorController.create);

    router.get("/", motorController.findAll);

    router.get("/:id", motorController.findOne);

    router.put("/:id", motorController.update);

    router.delete("/:id", motorController.delete);

    app.use('/api/motors', router);
}