import axios from "axios";

const baseUrl = "https://jsonplaceholder.typicode.com";

const instance = axios.create({
  baseURL: baseUrl,
});

export default instance;
