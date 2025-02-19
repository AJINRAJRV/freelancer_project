import axios from "axios";

const newRequest = axios.create({
    baseURL:"https://freelancer-project-backend.onrender.com/api",
    withCredentials:true,
});

export default newRequest;
