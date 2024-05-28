import axios from "axios";

const configDB = axios.create({
  baseURL: "https://nodejs-api-noutbasket.onrender.com",
});

export default configDB;
