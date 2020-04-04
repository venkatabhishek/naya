const express = require("express")
const router = express.Router();
const questions = require("../questions.json")
const Session = require("../models/Session");
const User = require("../models/User")


// get updated questions

router.get("/questions", (req, res) => {
    res.json(questions);
})

// get a user's session/answers
router.get("/user", (req, res) => {

    let { id } = req.query;

    Session.findOne({ createdBy: id }).then(s => {

        if (s) {
            res.json(s.content)
        } else {
            res.json([])
        }
    })
})

// record session

router.post("/", (req, res) => {

    let { id, content } = req.body;

    User.findOne({ _id: id }).then((user) => {

        if (!user) {
            return res.status(400).json({ error: "user doesnt exist" })
        }
        Session.findOne({ createdBy: id }).then(s => {
            //update - only maintain one session
            // comment out if statement to simply add another session without overwriting
            if (s) {
                Session.findOneAndUpdate({ createdBy: id }, { content }, function (err, session) {
                    if (err) console.log((err));
                    return res.json(session)
                });


            } else {
                let newSession = new Session({
                    createdBy: user._id,
                    content
                })

                newSession.save((err, session) => {
                    if (err) console.log(err)
                    res.json(session);
                })
            }
        })


    })
})

module.exports = router;