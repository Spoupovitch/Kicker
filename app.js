const dotenv = require('dotenv');
const express = require('express');
var exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
var app = express();

// Setup config
dotenv.config({path: './config/.env'});

// Routes
app.use("/", require("./routes/index"));
app.use("/db", require("./routes/db"));

// Static 'assets' folder
app.use(express.static(path.join(__dirname, 'assets')));

// Parser for URL-encoded bodies from forms
app.use(express.urlencoded({extended: false}));
// Parser for JSON bodies from API client
app.use(express.json());
app.use(bodyParser.json());

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
    console.log(`\tServer started on port ${process.env.APP_PORT}`);
});