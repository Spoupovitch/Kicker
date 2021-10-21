const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({path: './config/.env'});

const mongoDB = mongoose.connect('mongodb+srv://Spoupovitch:' 
    + process.env.M_DB_PASSWORD 
    + '@cluster1-kicker.xync3.mongodb.net/Kicker?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    console.log(process.env.INFO),
    console.log("\tConnected to MongoDB Atlas")
);

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

module.exports = mongoDB;