const router = require("express").Router();

const userExtractor = require("../middlewares/userExtractor");
const boatController = require("../controllers/boat.controller.js");

router.post("/", userExtractor, boatController.create);

router.get("/", userExtractor, boatController.findAll);

router.get("/:id", userExtractor, boatController.findOne);

router.put("/:id", userExtractor, boatController.update);

router.delete("/:id", userExtractor, boatController.delete);


module.exports = router;