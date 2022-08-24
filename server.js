require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();

const apiRouter = require("./app/routes")
const errorHandler = require('./app/middlewares/errorHandler');


const corsOptions = {
    origin: process.env.CORS_ORIGIN
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

apiRouter(app);
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
})