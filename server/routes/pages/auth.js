var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var config = require('./../../config/database'); 

var UserModel = require('./../../models/User');

router.post('/', (req, res) => {
    if(!req.body.email || !req.body.password) {
        res.status(400).json({status: 400, message: "Invalid email or password."});
    }else{
        UserModel.findOne({email: req.body.email.toLowerCase()}, (err, user) => {
            if(err){
                res.status(500).json({status: 500, message: err});
            }else{
                if(!user){
                    res.status(404).json({status: 404, message: "User not found."});
                }else{
                    user.comparePassword(req.body.password, function(err, isMatch){
                        if(err)
                            res.status(500).json({status: 500, message: err});
                        if(isMatch){
                            const token = jwt.sign({ userId: user._id }, config.secret);
                            res.status(200).json({status: 200, message: 'success', token: token, user: user.email});
                        }else{
                            res.status(400).json({status: 400, message: "Invalid email or password."});
                        }
                    })
                }
            }
        });
    }
});

module.exports = router;