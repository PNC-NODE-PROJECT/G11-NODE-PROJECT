const express = require("express");
const router = express.Router();
router.use(express.json());
const QuestionModel = require("../model/question_model");


// ADD QUESTIONS
router.post("/create",(req, res)=>{
  QuestionModel.create(req.body)
  .then((result)=>{
    res.send(result)
  })
  .catch((error)=>{
    res.send(error)
  })
})

//GET ALL QUESTION
router.get("/all",(req, res)=>{
  QuestionModel.find()
  .then((result)=>{
    res.send(result)
  })
  .catch((error)=>{
    res.send(error)
  })
})

//DELET QUESTION 
router.delete("/delete/:id",(req,res)=>{
  QuestionModel.deleteOne({_id:req.params.id})
  .then((result)=>{
    res.send(result)
  })
  .catch((error)=>{
    res.send(error)
  })
})




module.exports= router;

 