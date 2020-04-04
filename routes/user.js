const express = require("express")
const jwt = require('jsonwebtoken');
const router = express.Router();
const config = require('../config');

const User = require("../models/User");

// create user

router.post("/", (req, res) => {

    let { email, password } = req.body;

    User.findOne({ email }).then((u) => {
        if(u){
            return res.status(400).json({ error: "User already exists"})
        }

        let newUser = new User({
            email,
            password
        })
    
        newUser.save((err, user) => {
            if(err) return res.status(400).json({error: err})
            
            token = jwt.sign({
                id: user._id,
                email: user.email
            }, config.secret);
            return res.json({token});
        })

    })

})

router.post("/login", (req, res) => {
    
    let { email, password } = req.body;

    User.findOne({ email }).then(user => {
        if(!user){
            return res.status(400).json({error: "Email does not exist"})
        }

        user.comparePassword(password, (err, isMatch) => {
            if(err) console.log(err);

            if(isMatch){
                token = jwt.sign({
                    id: user._id,
                    email: user.email
                }, config.secret);
                return res.json({token});
            }else{
                return res.status(400).json({error: "Incorrect password"})
            }
        })
    })

})


module.exports = router;