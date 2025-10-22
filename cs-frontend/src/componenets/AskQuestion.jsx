import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createQuestion } from "../API/questionApi";
import '../componenets/Ask.css'
import Header from "../pages/Header";

export default function AskQuestion() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const navigate = useNavigate();
  const [post,setPost]=useState()

  const token = localStorage.getItem("token");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!token) {
      alert(" Please Login First");

      navigate("/login");
      return
    }
    

    try {
      await createQuestion({ title, description, tag }, token);
      setPost("The Question Has Successfully Postd,navigating to the home page.")
      setTimeout(() => {
        navigate("/"); // go to homepage after 2.5 seconds
         
      }, 2500);

       // back to home page
    } catch (err) {
      // if (err.response) {
      //   // console.log("Backend error message:", err.response.data);
      //   // console.log("Backend status code:", err.response.status);
      // } else if (err.request) {
      //   console.log("No response from server:", err.request);
      // } else {
      //   console.log("Error:", err.message);
      // }
    }

  }

  return (
    <>
      {/* <Header /> */}
      <section className="main-wrap">
        <div className="ask-container">
          <div className="steps-co">
            <h2 className="step">Steps To Write A Good Question.</h2>
            <p>→ Summarize your problems in a one-line title.</p>
            <p>→ Describe your problem in more detail.</p>
            <p>→ Describe what you tried and what you expected to happen. </p>
            <p>→ Review your question and post it here.</p>
          </div>
          <h1 className="post">Post Your Question</h1>

          <form onSubmit={handleSubmit} className="post-q">
            <div className="common-2">
              {" "}
              <input
                type="text"
                placeholder=" Question Title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="common-2">
              <textarea
                rows="5"
                placeholder=" Question Detail..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="common-2">
              {" "}
              <input
                type="text"
                placeholder="Tag/Subject (optional)"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              />
            </div>
            <h2 className="post success">{post}</h2>
            <div className="submit-div">
              <button type="submit" className="post-btn">
                Post Question
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
