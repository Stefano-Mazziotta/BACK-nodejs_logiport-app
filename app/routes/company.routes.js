module.exports = app => {
    const companyController = require("../controllers/company.controller");
    const userExtractor = require("../middlewares/userExtractor");

    var router = require("express").Router();

    router.post("/", userExtractor, companyController.create);

    router.get("/", userExtractor, companyController.findAll);

    router.get("/:id", userExtractor, companyController.findOne);

    router.put("/:id", userExtractor, companyController.update);

    router.delete("/:id", userExtractor, companyController.delete);

    app.use('/api/companies', router);
}