const dotenv = require('dotenv');
const express = require('express');
var exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
var app = express();

// Setup config
dotenv.config({path: './config/.env'});

app.use(bodyParser.json());

// Routes
app.use("/", require("./routes/index"));
app.use("/db", require("./routes/dbRoutes"));

// Static 'assets' folder
app.use(express.static(path.join(__dirname, 'assets')));

// Template engine
app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

app.post("/addTask", (req, res) => {
    res.send("POST to table");
    console.log(req);
    console.log(res);
});

app.listen(process.env.APP_PORT, () => {
    console.log(process.env.INFO);
    console.log("\tServer started on port " + process.env.APP_PORT);
});