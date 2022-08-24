const router = require("express").Router();

const generatorController = require("../controllers/generator.controller.js");
const userExtractor = require("../middlewares/userExtractor");


router.post("/", userExtractor, generatorController.create);

router.get("/", userExtractor, generatorController.findAll);

router.get("/:id", userExtractor, generatorController.findOne);

router.put("/:id", userExtractor, generatorController.update);

router.delete("/:id", userExtractor, generatorController.delete);


module.exports = router;