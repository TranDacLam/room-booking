var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/room-booking');

var sendError = (err, res) => {
    res.status = 501;
    res.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(res);
};

let response = {
    status: 200,
    data: [],
    message: null
};

var UserModel = require('./../models/User');

router.get('/users', (req, res) => {
    UserModel.find(function(err, users){
        if(err){
            sendError(err, res);
        }else{
            response.data = users;
            res.json(response);
        }
    });
});

module.exports = router;