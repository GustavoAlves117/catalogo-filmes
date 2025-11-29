import axios from "axios";

const api = axios.create({
  baseURL: "https://catalogo-filmes-70u2.onrender.com"
});

export default api;
