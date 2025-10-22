import axios from "../axiosConfig";

// Post a new answer
export async function postAnswer(questionid, data, token) {
  return axios.post(`/answers/${questionid}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

// Get all answers for a question
export async function getAnswers(questionid) {
  return axios.get(`/answers/${questionid}`);
}
