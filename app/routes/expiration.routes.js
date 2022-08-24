
const router = require("express").Router();

const expirationController = require("../controllers/expiration.controller");
const userExtractor = require("../middlewares/userExtractor");


router.post("/", userExtractor, expirationController.create);

router.get("/", userExtractor, expirationController.findAll);

router.get("/:id", userExtractor, expirationController.findOne);

router.put("/:id", userExtractor, expirationController.update);

router.delete("/:id", userExtractor, expirationController.delete);


module.exports = router;