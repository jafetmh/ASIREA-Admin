import axios from "axios";
import { apiRoutes } from "./api_routes";
import { type User } from "@/interfaces/User";
const apiUrl = import.meta.env.VITE_API_URL;

const defaultHeaders = {
    headers: {
        'Content-Type': 'application/json',
    }
};

const login = (userLogin: Pick<User, "username" | "password">) => {
 return axios.post(apiUrl+apiRoutes.singIn, userLogin, defaultHeaders)
}

export {login}
