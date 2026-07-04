const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const EmployeeModel = require('./employee');


// Connecting to database
const query = 'mongodb://localhost:27017/employeeDetails'

mongoose.connect(query)
    .then(() => {
        console.log("Database connected Successfully!");
    })
    .catch((error) => {
        console.log("Error in connecting tp the database: " + error);
    });

// Adding details via VS Code
router.post('/save', async (req, res) => {
    try {
        const newEmployee = new EmployeeModel({
            EMPLOYEE_ID: 500,
            FIRST_NAME: "David",
            LAST_NAME: "John",
            EMAIL: "DGRANT",
            PHONE_NUMBER: "650.507.9844",
            HIRE_DATE: "13-JAN-08",
            JOB_ID: "SH_CLERK",
            SALARY: 2600,
            COMMISSION_PCT: " - ",
            MANAGER_ID: 124,
            DEPARTMENT_ID: 50
        });
        const data = await newEmployee.save();
        res.status(201).send("Employee Data inserted successfully!");
    } catch (error) {
        console.error("Error saving the data", error);
        res.status(500).send("Internal Server error");
    }
});
// Adding details via POSTMAN "POST" method
router.post('/save1', async (req, res) => {
    try {
        const newEmployee = new EmployeeModel();
        newEmployee.EMPLOYEE_ID = req.body.EMPLOYEE_ID;
        newEmployee.FIRST_NAME = req.body.FIRST_NAME;
        newEmployee.LAST_NAME = req.body.LAST_NAME;
        newEmployee.EMAIL = req.body.EMAIL;
        newEmployee.PHONE_NUMBER = req.body.PHONE_NUMBER;
        newEmployee.HIRE_DATE = req.body.HIRE_DATE;
        newEmployee.JOB_ID = req.body.JOB_ID;
        newEmployee.SALARY = req.body.SALARY;
        newEmployee.COMMISSION_PCT = req.body.COMMISSION_PCT;
        newEmployee.MANAGER_ID = req.body.MANAGER_ID;
        newEmployee.DEPARTMENT_ID = req.body.DEPARTMENT_ID;

        const data = await newEmployee.save();
        res.status(201).send("Employee Data addedd successfully!");

    } catch (error){
        console.error("Error saving the data", error);
        res.status(500).send("Internal Server error");
    }
});
// Giving all the data in "POSTMAN" get method
router.get('/findAll', async (req, res) => {
    try {
        const allEmployees = await EmployeeModel.find({});
        res.status(200).json(allEmployees);
    } catch(error) {
        console.error("Error retriving all employees", error);
        res.status(500).send("Internal Server error");
    }
        
});
// Finding the first employee details from the data
router.get('/findFirst', async (req, res) => {
    try{
        const firstEmployee = await EmployeeModel.findOne({});

        if (!firstEmployee) {
            return res.status(484).json({message: "No employees found!"});
        }
        res.status(200).json(firstEmployee);
    }catch(error){
        console.error("Error retriving first employee", error);
        res.status(500).send("Internal server Error");
    }
});
// Deleting a data from the database using "DELETE" from POSTMAN
router.delete('/delete/:id', async (req, res) => {
    try{
        const targetId = req.params.id;

        const result = await EmployeeModel.deleteOne({EMPLOYEE_ID: targetId});

        if (result.deletedCount === 0) {
            return res.status(404).json({message: "Employee not found to delete"});        
        }
        res.status(200).json({message: "Employee deleted successfully!"});

    }catch (error) {
        console.error("Error deleting the employee", error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;