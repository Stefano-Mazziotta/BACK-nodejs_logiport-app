module.exports = app => {
    const expirationController = require("../controllers/expiration.controller");
    const userExtractor = require("../middlewares/userExtractor");

    var router = require("express").Router();

    router.post("/", userExtractor, expirationController.create);

    router.get("/", userExtractor, expirationController.findAll);

    router.get("/:id", userExtractor, expirationController.findOne);

    router.put("/:id", userExtractor, expirationController.update);

    router.delete("/:id", userExtractor, expirationController.delete);

    app.use('/api/expirations', router);
}