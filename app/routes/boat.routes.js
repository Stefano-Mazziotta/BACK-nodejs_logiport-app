module.exports = app => {

    const boatController = require("../controllers/boat.controller.js");
    const router = require("express").Router();

    router.post("/", boatController.create);

    router.get("/", boatController.findAll);

    router.get("/:id", boatController.findOne);

    router.put("/:id", boatController.update);

    router.delete("/:id", boatController.delete);

    app.use('/api/boats', router);
}