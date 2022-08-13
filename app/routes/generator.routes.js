module.exports = app => {
    const generatorController = require("../controllers/generator.controller.js");
    var router = require("express").Router();

    router.post("/", generatorController.create);

    router.get("/", generatorController.findAll);

    router.get("/:id", generatorController.findOne);

    router.put("/:id", generatorController.update);

    router.delete("/:id", generatorController.delete);

    app.use('/api/generators', router);
}