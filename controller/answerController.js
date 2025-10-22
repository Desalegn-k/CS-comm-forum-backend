const dbconnection = require("../db/dbConfig");
const statusCode = require("http-status-codes");

// Post a new answer
async function postAnswer(req, res) {
  const { answer } = req.body;
  const { questionid } = req.params;
  const userid = req.user.userid;

  if (!answer) {
    return res
      .status(statusCode.BAD_REQUEST)
      .json({ msg: "Answer cannot be empty" });
  }

  try {
    const [question] = await dbconnection.query(
      "SELECT * FROM questions WHERE questionid = ?",
      [questionid]
    );

    if (!question[0]) {
      return res
        .status(statusCode.NOT_FOUND)
        .json({ msg: "Question not found" });
    }

    const [result] = await dbconnection.query(
      "INSERT INTO answers (userid, questionid, answer) VALUES (?, ?, ?)",
      [userid, questionid, answer]
    );

    res.status(statusCode.CREATED).json({
      msg: "Answer submitted",
      answerid: result.insertId,
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong" });
  }
}

// Get all answers for a question
async function getAnswers(req, res) {
  const { questionid } = req.params;

  try {
    const [answers] = await dbconnection.query(
      `SELECT a.answerid, a.answer, a.created_at, u.username,u.firstname
       FROM answers a
       JOIN users u ON a.userid = u.userid
       WHERE a.questionid = ?
       ORDER BY a.created_at DESC`,
      [questionid]
    );

    res.status(statusCode.OK).json(answers);
  } catch (error) {
    console.log(error.message);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong" });
  }
}

module.exports = { postAnswer, getAnswers };
