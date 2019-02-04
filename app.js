const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();


//Set up our express app
const app = express();

//Connect to mongodb;
mongoose.set('useCreateIndex', true);
// mongoose.connect(process.env.MONGODB_LOCAL_DB, {useNewUrlParser: true});

//Connect to MongoDB on mLab
mongoose.connect(process.env.MONGODB_MLAB_DB, {useNewUrlParser: true});
mongoose.Promise = global.Promise;

//Set up body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Adjust CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authoriuzation');
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
        return res.status(200).json({});
    }
})

//Initialize routes
app.use('/api', require('./routes/api'));
app.use("/auth", require('./routes/auth'));

app.use(express.static('./public'));

//Error handling middleware
app.use( (err, req, res, next) => {
    console.log(err.message);
    res.send({error: err.message});
})

//Listen to port
const port = process.env.PORT || 4000
app.listen(port, function(){
    console.log('Listening on port ' + port);
});
