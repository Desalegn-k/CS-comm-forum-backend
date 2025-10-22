import React from 'react'
import '../componenets/How.css'

export default function HowItWorks() {
  return (
    <section className='how-container'>
      <h1>How StackCampus Works</h1>
      <p>
        StackCampus is a question-and-answer platform designed for students,
        developers, and learners who want to share knowledge and grow together.
      </p>
      <h1>Follow these steps to understand how it all works</h1>
      <h2>Register an Account</h2>
      <ul>
        <li>Click the “Sign Up” button on the homepage.</li>
        <li>
          Fill in your User name,First Name,Last Name, email and password.
        </li>
        <li>
          Submit the form by clicking agree and join button to create your
          personal account.
        </li>
        <li>
          Once registered, your journey in the StackCampus community begins!
        </li>
      </ul>
      <h2>Login to Your Account</h2>
      <ul>
        <li>
          After registration, go to the Login page and enter your credentials.
        </li>
        <li>
          {" "}
          If you ever forget your password, you can reset it easily through the
          Forgot Password link.
        </li>
        <li>
          Once logged in successfully, you’ll see your dashboard with full
          access to features.
        </li>
      </ul>

      <h2>Ask a Question</h2>
      <h3>Have a doubt or challenge while learning?</h3>
      <ul>
        <li>
          Click on the “Ask Question” button and describe your issue clearly.
        </li>
        <li>Give your question a meaningful title.</li>
        <li>
          Add details or code snippets to help others understand your problem.
        </li>
        <li>Then, post it for the community to see.</li>
      </ul>
      <h2>Get Answers from the Community</h2>
      <h3>
        After posting your question, other users and experts can reply with
        solutions.
      </h3>
      <ul>
        <li>You’ll receive helpful answers, explanations, or examples.</li>
        <li>
          You can mark the best answer or leave a comment for clarification.
        </li>
        <li>This creates a collaborative space for everyone to learn.</li>
        <li></li>
      </ul>
      <h2>Help Others</h2>
      <h3>
        StackCampus isn’t just about asking — it’s about sharing knowledge.
      </h3>
      <ul>
        <li>Browse questions posted by others.</li>
        <li>If you know the answer, reply to help them out.</li>
        <li>
          The more you contribute, the stronger our learning community becomes.
        </li>
      </ul>
      <h2>Grow Your Skills</h2>
      <h3>As you ask and answer more questions:</h3>
      <ul>
        <li>You’ll improve your problem-solving and communication skills.</li>
        <li>Your activity builds a public reputation among peers.</li>
        <li>You learn faster by both teaching and getting feedback.</li>
      </ul>
      <h2>The Goal of StackCampus</h2>
      <ul>
        <li>
          The mission of StackCampus is to empower students and developers
          through collaboration and knowledge sharing.
        </li>
        <li>
          We believe that every question helps someone learn — and every answer
          builds a stronger tech community.
        </li>
      </ul>
    </section>
  );
}
