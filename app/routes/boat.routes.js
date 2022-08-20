module.exports = app => {

    const boatController = require("../controllers/boat.controller.js");
    const userExtractor = require("../middlewares/userExtractor");
    const router = require("express").Router();

    router.post("/", userExtractor, boatController.create);

    router.get("/", userExtractor, boatController.findAll);

    router.get("/:id", userExtractor, boatController.findOne);

    router.put("/:id", userExtractor, boatController.update);

    router.delete("/:id", userExtractor, boatController.delete);

    app.use('/api/boats', router);
}