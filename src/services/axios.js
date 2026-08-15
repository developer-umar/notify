import axios from "axios";
// import { clearAuthState } from "../features/auth/redux/authSlice.js";
// import { store } from "../app/store.js";



const api = axios.create({
    baseURL: "https://notrify.onrender.com/api/v1",
    withCredentials: true,               // it will sent cookies  automatically 
    headers: {
        "Content-Type": "application/json"

    }
})

// Separate axios instance for refresh request
// Isme response interceptor nahi lagega
// "Har API response ko check karo. Agar successful hai toh normally aage bhej do. Agar 401 hai toh refresh token se authentication renew karo aur failed request ko ek baar dobara bhejo. Agar refresh fail ho gaya toh login page bhejo. Aur agar koi doosra error hai toh us error ko normally caller ke catch tak pahucha do."
const refreshApi = axios.create({
    baseURL: "https://notrify.onrender.com/api/v1",
    withCredentials: true
})

api.interceptors.response.use(
    (response) => {
        return response;

    },
    // first time   jab refersh token pr  request maaarenge to orignalRequest._retry undefined aaega ar 1undefined true hota hai smjhe 
    //  orignalRequest.url !== "/user/refresh-token" infifnite loop ko rokne ke liye 
    async (error) => {

        const orignalRequest = error.config;

        if (error.response?.status === 401 && !orignalRequest._retry && orignalRequest.url !== "/user/refresh-token") {

            orignalRequest._retry = true;             //custome object add kai ham logo check  flag
            
            try {


                await refreshApi.post("/user/refresh-token");
                // refrsh token waali  api succesfull ho jagei to  to ckkies set karedga backend to for agaain orignal requets retry karenege to lgin ho ajega smjhe 

                return api(orignalRequest);

            } catch (refreshError) {
                // aagr refersh token bhi expier ak rgay to login page pr leaao  ar puraane ssare states clear karo 

               
            //    store.dispatch(clearAuthState());   // ye isliye kia kuki store.js ek normal js file hai ar store  ko disractly import kar liye kuki ek normal object hai  isliye  kiya kuki  axios .js ye current ek recat copoent to hai to sislsiye usedsipatch()   hook nhi call kar skte kuki  axos.js koi functional copoent nhi haia r hook khali functional copoenet ek andr hi call kar skte hais mjhe isisliye eroro aega smjhe 
                // window.location.replace("/login");

                return Promise.reject(refreshError);


            }
        }


        // agar  koi ar eroro aae bad request smjhe 400 jo nA ACCES TOKEN KI WJAHS EHO AR NA HI RFERSH TOKEN KI WJAHA SE TO 

        return Promise.reject(error);   // axios call back joe roror wlala hi wo wlala error hai 



    }


);




export default api;