import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getQuestionById } from "../API/questionApi";
import { getAnswers, postAnswer } from "../API/answerApi";
import "./css/questiondtaile.css";

export default function QuestionDetailPage() {
  const { questionid } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [answerText, setAnswerText] = useState("");
  const navigate=useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchData() {
      const qRes = await getQuestionById(questionid);
      setQuestion(qRes.data);

      const aRes = await getAnswers(questionid);
      setAnswers(aRes.data);
      console.log(aRes.data);
    }
    fetchData();
    
  }, [questionid]);

  async function handleAnswerSubmit(e) {
    e.preventDefault();
    if (!token) {

      alert(" Please Login First");
      navigate("/login");
      return
    } 


    await postAnswer(questionid, { answer: answerText }, token);
    setAnswerText("");
    const aRes = await getAnswers(questionid);
    setAnswers(aRes.data);
  }

  if (!question) return <p>Loading question...</p>;

  return (
    <div className="container">
      <h1 className="q">→ Question</h1>
      <h3 className="q-t t">{question.title}</h3>
      <hr  className="titlehr"/>
      <small className="q-d">{question.description}</small>
      <small className="asskedby">(By {question.firstname})</small>

      <h3 className="q-t fromcom">Answers From The Community</h3>
      <hr  className="fromcomhr"/>
      {answers.length === 0 ? (
        <h2>No answers yet.</h2>
      ) : (
        answers.map((a) => (
          <div key={a.answerid} className="answer-card">
            <div className="username-avater">
              <div className="ans-pro">
          
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${a.firstname}`}
                  alt="Profile"
                  className="avatar-img"
                />
              </div>
              <div className="username">{a.firstname} </div>
            </div>
            <div className="answer">
              {a.answer}
              <br />
              <br />
               
              At {new Date(a.created_at).toLocaleString()}
            </div>
          </div>
        ))
      )}

      <form onSubmit={handleAnswerSubmit}>
        <div className="answertextarea">
          <textarea
            rows="5"
            placeholder="Write your answer..."
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
            required
          />
        </div>
        <div className="answersubmitbttun">
          <button type="submit">Post Your Answer</button>
        </div>
      </form>
    </div>
  );
}
