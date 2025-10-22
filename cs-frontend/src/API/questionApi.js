import axios from "../axiosConfig";

// Create a new question
export async function createQuestion(data, token) {
  return axios.post("/questionss/question", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

// Get all questions
export async function getAllQuestions() {
  return axios.get("/questionss/questions");
}

// Get a single question
export async function getQuestionById(questionid) {
  return axios.get(`/questionss/${questionid}`);
}
