const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const db = require("./dbConnection");

const dbRoutes = require("./routes/dbRoutes");

dotenv.config({path: './config/.env'});
const app = express();

app.use(bodyParser.json());

app.use("/", dbRoutes);

app.post("/addTask", (req, res) => {
    res.send("POST to table");
});

app.listen(process.env.APP_PORT, () => {
    console.log("\tServer started on port " + process.env.APP_PORT);
});