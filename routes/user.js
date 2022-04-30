const express = require("express");
const router = express.Router();
router.use(express.json());
const  RegisterModel = require("../model/user_model");

//ADD USER INTO DATABASE
router.post("/register", (req,res)=>{
    
    RegisterModel.create(req.body)
    .then((result)=>{
       res.send(result);
    })
    .catch((error)=>{
        res.send(error);
    });
});



module.exports= router;