 const dbconnection = require("../db/dbConfig");
 const statusCode = require("http-status-codes");
 const { v4: uuidv4 } = require("uuid");

 // Create a new question
 async function createQuestion(req, res) {
   const { title, description, tag } = req.body;
   const userid = req.user.userid;

   if (!title || !description) {
     return res
       .status(statusCode.BAD_REQUEST)
       .json({ msg: "Title and description required" });
   }

   try {
     const questionid = uuidv4();
     await dbconnection.query(
       "INSERT INTO questions (userid, title, description, tag, questionid) VALUES (?, ?, ?, ?, ?)",
       [userid, title, description, tag || null, questionid]
     );

     res
       .status(statusCode.CREATED)
       .json({ msg: "Question created", questionid });
   } catch (error) {
     console.log(error.message);
     res
       .status(statusCode.INTERNAL_SERVER_ERROR)
       .json({ msg: "Something went wrong" });
   }
 }

 // Get all questions
 async function getQuestions(req, res) {
   try {
     const [questions] = await dbconnection.query(
       `SELECT q.questionid, q.title, q.description, q.tag, u.firstname
       FROM questions q
       JOIN users u ON q.userid = u.userid
       ORDER BY q.created_at DESC`
     );
     res.json(questions);
   } catch (error) {
     console.log(error.message);
     res
       .status(statusCode.INTERNAL_SERVER_ERROR)
       .json({ msg: "Something went wrong" });
   }
 }

 // Get single question
 async function getQuestion(req, res) {
   const { questionid } = req.params;

   try {
     const [question] = await dbconnection.query(
       `SELECT q.questionid, q.title, q.description, q.tag, u.username,firstname
       FROM questions q
       JOIN users u ON q.userid = u.userid
       WHERE q.questionid = ?`,
       [questionid]
     );

     if (!question[0])
       return res
         .status(statusCode.NOT_FOUND)
         .json({ msg: "Question not found" });

     res.json(question[0]);
   } catch (error) {
     console.log(error.message);
     res
       .status(statusCode.INTERNAL_SERVER_ERROR)
       .json({ msg: "Something went wrong" });
   }
 }

 module.exports = { createQuestion, getQuestions, getQuestion };
