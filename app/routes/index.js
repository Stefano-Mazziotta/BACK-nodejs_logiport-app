const companyRouter = require("./company.routes");
const boatRouter = require("./boat.routes");
const motorRouter = require("./motor.routes");
const generatorRouter = require("./generator.routes");
const expirationRouter = require("./expiration.routes");
const userRouter = require("./user.routes");

function routerApi(app){

    app.use('/api/companies', companyRouter);
    app.use('/api/boats', boatRouter);
    app.use('/api/motors', motorRouter);
    app.use('/api/generators', generatorRouter);
    app.use('/api/expirations', expirationRouter);

    app.use('/api/users', userRouter);
}

module.exports = routerApi;