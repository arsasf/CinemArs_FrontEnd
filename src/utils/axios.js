import axios from "axios";

const axiosApiIntances = axios.create({
  baseURL: "http://Localhost:3001/api/v1/",
});

export default axiosApiIntances;
