import {makeAutoObservable} from "mobx";
import AuthRepository from "../../core/repository/AuthRepository.ts";
import axios from "axios";
import {API_URL} from "../../core/repository/http/index.js";

export default class Auth {
    login = null;
    isAuth = false;
    isLoading = false;
    isInit = false;

    constructor() {
        makeAutoObservable(this)
    }

    setLogin = (login) => {
        this.login = login;
    }

    setAuth = (bool) => {
        this.isAuth = bool;
    }

    async doLogin ({ login, password}) {
        try {
            const { data } = await AuthRepository.loginAuth(login, password)
            localStorage.setItem('token', data.accessToken);
            this.setAuth(true);
            this.setLogin(login);
        } catch (e) {
            console.log('e: ', e);
        }
    }

    async registration ({ login, password}) {
        try {
            const { data} = await AuthRepository.registration(login, password)
            localStorage.setItem('token', data.accessToken);
            this.setAuth(true);
            this.setLogin(login);
        } catch (e) {
            console.log('e: ', e);
        }
    }

    async checkAuth () {
        try {
            const {data} = await axios.get(`${API_URL}/refresh`, {withCredentials: true});
            localStorage.setItem('token', data.accessToken);
            this.setAuth(true);
            this.setLogin(data.login);
        } catch (e) {
            console.log('e: ', e);
        } finally {
            this.isInit = true;
            this.isLoading = true;
        }
    }

    async logout () {
        try {
            await AuthRepository.logout();
            this.setAuth(false);
            this.setLogin('');
            return true;
        } catch (e) {
            return false;
        }
    }
}
