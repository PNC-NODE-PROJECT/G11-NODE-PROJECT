const express = require("express");
const router = express.Router();
router.use(express.json());
const  UserModel = require("../model/user_model");


//ADD USER INTO DATABASE
router.post("/register", (req,res)=>{
    UserModel.create(req.body)
    .then((result)=>{
       res.send(result);
    })
    .catch((error)=>{
        res.send(error);
    });
});


// GET SPECIFIC USER
router.post("/user", (req,res)=>{
    let userData = req.body;
    UserModel.find(userData)
    .then((result)=>{
        if(result.length >= 1){
            res.send(result);
        }else{
            res.send("user not found");
        }
    })
    .catch((error)=>{
        res.send(error);
    });
});

module.exports= router;