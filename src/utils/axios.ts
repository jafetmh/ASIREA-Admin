import axios from "axios";
import useAuthStore from "@/store/authStore";

/* Define an axios instance with custom settings */
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

api.interceptors.request.use(config => {
    const authStore = useAuthStore();
    config.headers["Content-Type"] = 'multipart/form-data'
    if(authStore.token){
        config.headers.Authorization = `Bearer ${authStore.token}`
    }
    return config;
})

api.interceptors.response.use(response => response,
    error =>{
        if(error.response?.status === 401){
            const authStore = useAuthStore();
            authStore.logout();
        }
        return Promise.reject(error)
    }
)

export default api;
