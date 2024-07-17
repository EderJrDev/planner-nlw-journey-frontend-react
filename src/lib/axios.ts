import axios from "axios";

export const api = axios.create({
  baseURL: 'https://planner-nlw-journey-backend-node.vercel.app/'
})