import axios from "axios";

const newRequest = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8001'
 })

 export default newRequest