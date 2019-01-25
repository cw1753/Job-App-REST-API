const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create job Schema & model
const jobSchema = new Schema({
    company:{
        type: String,
        required:[true, 'Company name required']
    },
    jobTitle: {
        type: String,
        required:[true, 'Job title required']
    },
    status:{
        type: String,
        default: "Pending"
    },
    note:{
        type: String,
        default: ""
    },
    applyDate:{
        type: Date,
        default: new Date()
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }                                                                                                                                          
});

const Job = mongoose.model('job', jobSchema);

module.exports = Job;