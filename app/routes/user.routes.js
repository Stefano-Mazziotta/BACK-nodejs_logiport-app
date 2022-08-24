const router = require("express").Router();

const userExtractor = require("../middlewares/userExtractor");
const userController = require("../controllers/user.controller.js");


router.post("/register", userController.register);

router.post("/login", userController.login);

router.get("/", userExtractor, userController.findAll);

router.get("/:username", userExtractor, userController.findOne);

// router.put("/id", userExtractor, userController.update);

router.delete("/:id", userExtractor, userController.delete);


module.exports = router;
