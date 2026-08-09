
import api  from "../../../services/axios.js"

export const registerUserApi = async(formData)=>{
    const response = await   api.post("/user/register",formData);
    return response.data;

}

export const loginUserApi = async(Credentials)=>{
    const response = await api.post("/user/login",Credentials);
    return response.data;
}

export const logoutUserApi = async()=>{
    const response = await api.post("/user/logout");
    return response.data;

}

export const getCurrentUserApi  = async()=>{
    const response = await api.get("/user/current-user");
    return response.data;
}