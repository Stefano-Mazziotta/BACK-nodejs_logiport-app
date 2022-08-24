const router = require("express").Router();

const companyController = require("../controllers/company.controller");
const userExtractor = require("../middlewares/userExtractor");


router.post("/", userExtractor, companyController.create);

router.get("/", userExtractor, companyController.findAll);

router.get("/:id", userExtractor, companyController.findOne);

router.put("/:id", userExtractor, companyController.update);

router.delete("/:id", userExtractor, companyController.delete);

    
module.exports = router;