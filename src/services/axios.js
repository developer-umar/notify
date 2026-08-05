import axios from "axios";

const api = axios.create({
    baseURL:"https://notrify.onrender.com/api/v1",
    withCredentials:true  ,               // it will sent cookies  automatically 
    headers:{
        "Content-Type":"application/json"

    }
})

export default api;