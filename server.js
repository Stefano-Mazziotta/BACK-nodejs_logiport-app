require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const errorHandler = require('./app/middlewares/errorHandler');

const corsOptions = {
    origin: process.env.CORS_ORIGIN
};

app.use(cors(corsOptions));

// parse request of content-type - application/json
// parse request of content-type - application/x-www-form-urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "welcome to logiport app aplication jeje" });
});

require("./app/routes/company.routes.js")(app);
require("./app/routes/boat.routes.js")(app);
require("./app/routes/motor.routes.js")(app);
require("./app/routes/generator.routes.js")(app);
require("./app/routes/expiration.routes.js")(app);
app.use(errorHandler);

//set port, listen for request
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
})