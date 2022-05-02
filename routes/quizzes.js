const express = require("express");
const router = express.Router();
router.use(express.json());
const QuizzesModel = require("../model/quizzes_model");


// GET QUIZZES BY USER ID
router.post("/owns", (req, res) => {
  let userId = req.body.owner;
  QuizzesModel.find({owner: userId})
  .then((result) => {
      res.send(result);
  })
      .catch((error) => {
      res.send(error);
  })
})

// CREATE QUIZ
router.post("/create",(req, res)=>{
  let title = req.body.title;
  let owner = req.body.owner;
  let questions = req.body.questions;

  QuizzesModel.create({title: title, owner: owner, questions: questions})
  .then((result)=>{
    res.send(result)
  })
  .catch((error)=>{
    res.send(error)
  })

})

// DELETE A QUIZ
router.delete("/clear/:id", (req, res) => {
  let quiz_id = req.params.id;
  QuizzesModel.deleteOne({_id: quiz_id})
  .then((result)=>{
    res.send(result)
  })
  .catch((error)=>{
    res.send(error)
  })
})

// GET QUIZ BY QUIZ-ID
router.get("/quiz/:id", (req, res) => {
  let quiz_id = req.params.id;
  QuizzesModel.find({_id: quiz_id})
  .then((result)=>{
    res.send(result)
  })
  .catch((error)=>{
    res.send(error)
  })
})

// UPDATE A QUIZ
router.put("/update/:id", (req, res) => {
  let quiz_id = req.params.id;
  let owner = req.body.owner;
  let title = req.body.title;
  let questions = req.body.questions;
  QuizzesModel.updateMany({_id: quiz_id}, {owner: owner, title: title, questions: questions})
  .then((result)=>{
    res.send(result)
  })
  .catch((error)=>{
    res.send(error)
  })
})



module.exports= router;