import axios from "axios";

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: {
    accept: "application/json",
    Authorization: import.meta.env.VITE_APP_ACCESS_TOKEN,
  },
});

// method
export const get = async (path, option = {}) => {
  const response = await request.get(path, option);
  return response.data;
};

export default request;
