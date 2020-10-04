const express = require("express");
const router = express.Router();

const db = require("../dbConnection");

// create table for to do tasks
router.get("/create", (req, res) => {
    let query = 
        "CREATE TABLE IF NOT EXISTS to_do_list(" +
        "task_id INT AUTO_INCREMENT PRIMARY KEY," +
        "task_desc VARCHAR(25) NOT NULL UNIQUE," +
        "task_create_dt DATE" +
    ");";
    queryDb(req, res, query, 'CREATE');
});

// show values in table
router.get("/read", (req, res) => {
    let query = 
        "SELECT *" +
        "FROM to_do_list;";
    queryDb(req, res, query, 'READ');
});

// TODO - troubleshoot db put/get
// add task to table
router.use("/insert", (req, res) => {
    let create_dt = JSON.stringify(new Date());
    let query = 
        "INSERT INTO test.to_do_list" +
            "(`task_desc`, `task_create_dt`)" +
            "values ('fuck_you5', " + create_dt + ");";
    queryDb(req, res, query, 'INSERT');
});

// utility function for querying db and error handling
function queryDb(req, res, query, command) {
    db.query(
        query,
    (err, rows, fields) => {
        if (err) {
            logDebug('ERROR', command, err);
            return;
        }
        logDebug('INFO', command, err);
        res.send(rows);
    });
}

// print status reports formatted for console
function logDebug(status, command, err) {
    // error reporting
    if (err) {
        switch(command) {
            case 'CREATE':
                console.log(process.env.ERROR);
                console.log("\tError retrieving data... " + err);
                break;
            case 'READ':
                console.log(process.env.ERROR);
                console.log("\tError retrieving data... " + err);
                break;
            case 'UPDATE':
                console.log(process.env.ERROR);
                console.log("\tError updating data... " + err);
                break;
            case 'DELETE':
                console.log(process.env.ERROR);
                console.log("\tError deleting data... " + err);
                break;
            case 'INSERT':
                console.log(process.env.ERROR);
                console.log("\tError retrieving data... " + err);
                break;
            case 'DROP':
                console.log(process.env.ERROR);
                console.log("\tError dropping table... " + err);
                break;
        }
    }
    // success confirmation
    else {
        switch(command) {
            case 'CREATE':
                console.log(process.env.INFO);
                console.log("\tSuccessfully created table...");
                break;
            case 'READ':
                console.log(process.env.INFO);
                console.log("\tDisplaying retrieved data... ");
                break;
            case 'UPDATE':
                console.log(process.env.INFO );
                console.log("\tSuccessfully updated row in table...");
                break;
            case 'DELETE':
                console.log(process.env.INFO );
                console.log("\tSuccessfully deleted row in table...");
                break;
            case 'INSERT':
                console.log(process.env.INFO );
                console.log("\tSuccessfully added row to table...");
                break;
            case 'DROP':
                console.log(process.env.INFO);
                console.log("\t'Owned plants' table destroyed... ");
                break;
            default:
                console.log("No usable case for status, command in logDebug().");
                console.log("Given status: " + status + ", command: " + command);
        }
    }
}

module.exports = router;