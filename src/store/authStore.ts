import { defineStore } from "pinia";
import router from "@/router";
import type { User } from "@/interfaces/User";
import {login} from "@/api/user"

interface Store {
    darkMode: boolean,
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
}

const useAuthStore = defineStore('auth', {
    state:(): Store => ({
        darkMode: localStorage.getItem('darkMode')==='enabled'?true:false,
        user: null,
        token: sessionStorage.getItem('token') || null,
        isAuthenticated: !!sessionStorage.getItem('token')
    }),
    persist: {
        storage: sessionStorage,
        pick: ['user', 'isAuthenticated', 'token']
    },
    actions: {
        async singIn(userLogin: Pick<User, "username" | "password">){
            const response = await login(userLogin);
            this.setState(response.data);
            return response;
        },
        setState(response: {token: string, user: User}):void{
            this.token = response.token;
            this.user = response.user;
            this.isAuthenticated = true;
            router.push('admin/home')
        },
         logout(): void {
            this.user = null,
            this.token = null,
            this.isAuthenticated = false,
            sessionStorage.removeItem('token');
            router.push('/')
        }
    }

})

export default useAuthStore;
