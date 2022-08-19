require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const errorHandler = require('./app/middlewares/errorHandler');

const corsOptions = {
    origin: process.env.CORS_ORIGIN
};

app.use(cors(corsOptions));

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
require("./app/routes/user.routes.js")(app);
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
})