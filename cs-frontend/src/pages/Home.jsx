 import React, { useEffect, useState, useContext } from "react";
import { Appstate } from "../App";
import { Link } from "react-router-dom";
import { getAllQuestions } from "../API/questionApi";
import "./css/Home.css";
import Arow from "./css/211688_forward_arrow_icon.png";
import Header from "./Header.jsx";

export default function Home() {
  const { user } = useContext(Appstate);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await getAllQuestions();
        setQuestions(res.data);
      } catch (err) {
        console.error("Error fetching questions:", err);
      }
    }
    fetchQuestions();
  }, []);

  return (
    <div>
    {/* <Header/> */}
      <div className="video-container">
        <video autoPlay muted loop id="bg-video">
          <source src="/video-2.mp4" type="video/mp4" />
        </video>
        
      </div>

      <div className="questions-section">
        <div className="ask-all">
          <h2 className="allquestions">All Questions</h2>
          <Link to="/ask" className="ask-btn">
            Ask Question
          </Link>
        </div>

        {questions.length === 0 ? (
          <h2>No questions yet.</h2>
        ) : (
          questions.map((q) => (
            <div key={q.questionid} className="question-card">
              <h3 className="linkcontainer">
                <Link to={`/question/${q.questionid}`} className="asklink">
                  <small className="usreinfo commn">
                    {/*  Avatar image */}
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${q.firstname}`}
                      alt="Profile"
                      className="avatar-img"
                    />
                    <div className="username"> {q.firstname}</div>
                  </small>

                  <div className="title-desc commn">
                    <span className="title">{q.title}</span>
                    <p>
                      <span className="discription-q">
                        {" "}
                        {q.description.substring(0, 100)}...
                      </span>
                      <br />
                      <br />
                      <br />
                      <span className="tag">{q.tag && `#${q.tag}`}</span>
                    </p>
                  </div>
                  <div className="Arowco">
                    <img src= {Arow}alt="" className="Arow"/>
                  </div>
                 
                </Link>
              </h3>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
