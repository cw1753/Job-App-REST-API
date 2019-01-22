const express = require("express");
const router = express.Router();
const Job = require('../models/job');
const Company = require('../models/company');


//Get all the companies in the db
router.get('/company', (req, res, next) => {
    Company.find({}).sort({company: 1}).then( (result) => {
        console.log("GET: /company");
        res.send(result);
    }).catch(next);
})

//Get all the jobs in the db
router.get('/job', (req, res, next) => {
    Job.find({}).sort({company: 1}).then( (result) => {
        console.log("GET: /job");
        res.send(result);
    }).catch(next);
})

//Get jobs from a specific company
router.get('/job/:company', (req, res, next) => {
    Job.find({company: req.params.company}).then( (result) => {
        console.log("GET: /job/", req.params.company);
        res.send(result);
    }).catch(next);
})

//Get Company and link for a specific company
router.get('/company/:companyName', (req, res, next) => {
    Company.find({company: req.params.companyName}).then( (result) => {
        console.log("GET: /company/", req.params.companyName);
        res.send(result);
    }).catch(next);
})

//Post a new job into the db
router.post('/add-job', (req, res, next) => {
    Job.create(req.body).then( (job, err) => {
        console.log("POST: /add-job");
        Company.create(req.body);
        res.send(job);
    }).catch(next);
})

//Edit the status and/or note of a job
router.put('/edit-job', (req, res, next) => {
    Job.findOneAndUpdate(
        {"_id": req.body.id},
        {$set: {
            "status": req.body.status,
            "note": req.body.note
        }}, {
            new: true,
            useFindAndModify: false
        }
    ).then( (result) => {
        console.log("PUT: /edit-job");
        res.send(result);
    }).catch(next);
})

//Edit the link for a company
router.put('/edit-company-link', (req, res, next) => {
    Company.findOneAndUpdate(
        {"company": req.body.company},
        {$set: {
            "link": req.body.link
        }}, {
            new: true,
            useFindAndModify: false
        }
    ).then( (result) => {
        console.log("PUT: /edit-company-link");
        res.send(result);
    }).catch(next);
})

//Delete job
router.delete('/delete-job', (req, res, next) => {
    Job.findOneAndDelete(
        {"_id": req.body.id}
    ).then( (result) => {
        console.log("DELETE: /delete-job");
        res.send(result);
    }).catch(next);
})



module.exports = router