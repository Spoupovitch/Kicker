const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config({path: './.env'});

const app = express();
const PORT = '3030';

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE
});

db.connect( (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("MySQL Connected...");
    }
});

app.listen(process.env.APP_PORT, () => {
    console.log("Server started on port " + process.env.APP_PORT);
});

app.get("/", (req, res) => {
        res.send("<h1>Fuck You!</h1>");
});

app.post("/addTask", (req, res) => {
    res.send("POST to table");
});

db.connect( (err) => {
    function callDb(sql) {
        sql = "SELECT * FROM * WHERE *";
        db.query(sql, function (err, res) {
            if (err) throw err;
            console.log("Result: " + res);
        });
    }
});