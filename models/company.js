const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create company Schema & model
const companySchema = new Schema({
    company:{
        type: String,
        required:[true, 'Company name required'],
        unique: true
    },
    link:{
        type:String
    }                                                                                                                                                    
});

const Company = mongoose.model('company', companySchema);

module.exports = Company;