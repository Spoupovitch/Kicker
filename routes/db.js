const express = require("express");
const db = require("../controllers/db");

const router = express.Router();

// create table for to do tasks
router.get("/create", (req, res) => {
    let query = 
        "CREATE TABLE IF NOT EXISTS to_do_list(" +
        "task_id INT AUTO_INCREMENT PRIMARY KEY," +
        "task_desc VARCHAR(25) NOT NULL," +
        "task_create_dt DATE" +
    ");";
    queryDb(req, res, query, 'CREATE');
});

// show values in table
router.post("/read", (req, res) => {
    let query = 
        "SELECT *" +
        "FROM to_do_list;";
    // db.queryDb(req, res, query, 'READ');
    db.query(query, (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

// TODO - troubleshoot db put/get
// add task to table
router.post("/insert", (req, res) => {
    let create_dt = JSON.stringify(new Date);
console.log("task received: " + req.params);
    let query = 
        "INSERT INTO test.to_do_list" +
        "(`task_desc`, `task_create_dt`)" +
        "values (" + req + ", " + create_dt + ");";
    db.queryDb(req, res, query, 'INSERT');
});

// delete table
router.post("/drop", (req, res) => {
    let query = 
        "DROP TABLE to_do_list;";
    queryDb(req, res, query, 'DROP');
});

module.exports = router;