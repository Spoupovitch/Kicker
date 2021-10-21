const express = require("express");
const mongoDB = require("../controllers/db");
const mongoose = require("mongoose");

const router = require('../routes/index.js');

// import Task model
const Task = require('../models/Task');

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
    // id = req.paraams.id
    // Task.findById(id)
    //     .exec()
    //     .then(task => {
    //         console.log(task);
    //         res.status(200).json(task);
    //     })
    //     .catch(err => {
    //         console.log(err);
    //         res.status(500).json({error: err});
    //     });
});

// @desc        add task to table
// @route       POST /
router.post("/insert", (req, res) => {
console.log("BODY: " + JSON.stringify(req.params));
    let desc = req.params.task_input;
    let create_dt = JSON.stringify(new Date);
console.log("type: " + typeof(desc));
console.log("task received: " + desc);
    const task = new Task({
        _id: new mongoose.Types.ObjectId(), // generate uniqie ID
        desc: req.params.desc,
        create_dt: create_dt
    });

    task.save()
    .then(result => {
        console.log(result);
    })
    .catch(err => console.log(err));

    res.status(201).json({
        message: 'POST to /insert received',
        savedTask: task
    });
});


// delete table
router.post("/drop", (req, res) => {
    
});

module.exports = router;