module.exports = app => {
    const expirationController = require("../controllers/expiration.controller.js");
    var router = require("express").Router();

    router.post("/", expirationController.create);

    router.get("/", expirationController.findAll);

    router.get("/:id", expirationController.findOne);

    router.put("/:id", expirationController.update);

    router.delete("/:id", expirationController.delete);

    app.use('/api/expirations', router);
}