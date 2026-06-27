const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const StudentModel = require('./employee');


// Connecting to database
const query = 'mongodb://localhost:27017/empolyeeDetails'

mongoose.connect(query)
    .then(() => {
        console.log("Database connected Successfully!");
    })
    .catch((error => {
        console.log("Error in connecting tp the database: " + error);
}));

module.exports = router;