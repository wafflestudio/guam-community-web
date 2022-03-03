import axios from "axios";

export const api = axios.create({
  baseURL: "https://guam.jon-snow-korea.com/community/api/v1",
});
