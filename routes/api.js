const express = require("express");
const router = express.Router();
const Job = require('../models/job');
const Company = require('../models/company');
const passport = require('passport');

const jwtAuthenticate = passport.authenticate('jwt', {session: false});


//Get all the companies in the db
router.get('/company', jwtAuthenticate, (req, res, next) => {
    Company.find({}).sort({company: 1}).then( (result) => {
        console.log("GET: /company");
        res.send(result);
    }).catch(next);
})

//Get all the jobs in the db
router.get('/job', jwtAuthenticate, (req, res, next) => {
    Job.find({user: req.user.id}).sort({company: 1}).then( (result) => {
        console.log("GET: /job");
        res.send(result);
    }).catch(next);
})

//Get jobs from a specific company
router.get('/job/:company', jwtAuthenticate, (req, res, next) => {
    Job.find({user: req.user.id, company: req.params.company}).then( (result) => {
        console.log("GET: /job/", req.params.company , " for ", req.user.id);
        res.send(result);
    }).catch(next);
})

//Get Company and link for a specific company
router.get('/company/:companyName', jwtAuthenticate, (req, res, next) => {
    Company.find({company: req.params.companyName}).then( (result) => {
        console.log("GET: /company/", req.params.companyName);
        res.send(result);
    }).catch(next);
})

//Post a new job into the db
router.post('/add-job', jwtAuthenticate, (req, res, next) => {
    Job.create(req.body).then( (job, err) => {
        job.set({user: req.user.id});
        job.save();
        console.log("POST: /add-job");
        Company.create(req.body);
        res.send(job);
    }).catch(next);
})

//Edit the status and/or note of a job
router.put('/edit-job', jwtAuthenticate, (req, res, next) => {
    Job.findOneAndUpdate(
        {user: req.user.id, "_id": req.body.id},
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
router.put('/edit-company-link', jwtAuthenticate, (req, res, next) => {
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
router.delete('/delete-job', jwtAuthenticate, (req, res, next) => {
    Job.findOneAndDelete(
        {user: req.user.id, "_id": req.body.id}
    ).then( (result) => {
        console.log("DELETE: /delete-job");
        res.send(result);
    }).catch(next);
})



module.exports = router