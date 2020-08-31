const express = require('express');
const mysql = require('mysql');

const app = express();
const PORT = '3030';

app.listen(PORT, () => {
    console.log("Server started on port " + PORT);
});

app.get("/", (req, res) => {
    res.status(200).send("<h1>GFY!</h1>");
});