const dotenv = require("dotenv");
const mysql = require("mysql");

dotenv.config({path: './config/.env'});

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE
});

db.connect( (err) => {
    if (!err) {
        console.log(process.env.INFO);
        console.log("\tConnected to database...");
    }
    else {
        console.log(process.env.ERROR);
        console.log("\tFailed to connect to database... " + err);
    }
});

// utility function for querying db
db.queryDb = ((req, res, query, command) => {
    db.query(query, (err, rows, fields) => {
        if (err) {
            logDebug('ERROR', command, err);
            return;
        }
        logDebug('INFO', command, err);
    });
});

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

module.exports = db;