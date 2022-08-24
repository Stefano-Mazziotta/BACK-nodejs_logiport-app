const router = require("express").Router();

const motorController = require("../controllers/motor.controller");
const userExtractor = require("../middlewares/userExtractor");


router.post("/", userExtractor, motorController.create);

router.get("/", userExtractor, motorController.findAll);

router.get("/:id", userExtractor, motorController.findOne);

router.put("/:id", userExtractor, motorController.update);

router.delete("/:id", userExtractor, motorController.delete);


module.exports = router;