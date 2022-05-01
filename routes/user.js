const express = require("express");
const router = express.Router();
router.use(express.json());
const UserModel = require("../model/user_model");


//ADD USER INTO DATABASE
router.post("/register", (req, res) => {
    UserModel.find()
        .then((myresult) => {
            let isNotUsed = true;
            let registEmail = req.body.email;
            myresult.forEach(user => {
                if (user.email == registEmail) {
                    isNotUsed = false;
                }
            })
            if (isNotUsed) {
                UserModel.create(req.body)
                    .then((result) => {
                        res.send(result);
                    })
                    .catch((error) => {
                        res.send(error);
                    });
            } else {
                res.send("Email is already used");
            }
        }).catch((error) => {
            res.send(error);
        });
});


// GET SPECIFIC USER


router.post("/user", (req, res) => {
    let password = req.body.password;
    let email = req.body.email;

    UserModel.find({ password: password, email: email })
        .then((result) => {
            if (result.length >= 1) {
                res.send(result);
            } else {
                res.send("user not found");
            }
        })
        .catch((error) => {
            res.send(error);
        });
});

module.exports = router;