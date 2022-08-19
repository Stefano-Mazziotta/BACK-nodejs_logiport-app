const userExtractor = require("../middlewares/userExtractor");

module.exports = app => {
    const userController = require("../controllers/user.controller.js");
    var router = require("express").Router();
    
    router.post("/register", userController.register);

    router.post("/login", userController.login);

    router.get("/", userExtractor, userController.findAll);

    router.get("/:username", userExtractor, userController.findOne);

    // router.put("/id", userExtractor, userController.update);

    router.delete("/:id", userExtractor, userController.delete);

    app.use('/api/user', router);
}