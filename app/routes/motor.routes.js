module.exports = app => {
    const motorController = require("../controllers/motor.controller.js");
    const userExtractor = require("../middlewares/userExtractor");
    var router = require("express").Router();

    router.post("/", userExtractor, motorController.create);

    router.get("/", userExtractor, motorController.findAll);

    router.get("/:id", userExtractor, motorController.findOne);

    router.put("/:id", userExtractor, motorController.update);

    router.delete("/:id", userExtractor, motorController.delete);

    app.use('/api/motors', router);
}