import {makeAutoObservable} from "mobx";
import AuthRepository from "../../core/repository/AuthRepository.ts";
import axios from "axios";
import {API_URL} from "../../core/repository/http/index.js";

export default class Auth {
    login = null;
    isAuth = false;
    isLoading = false;
    isInit = false;
    errors = [];

    constructor() {
        makeAutoObservable(this)
    }

    /**
     * Авторизоваться
     * @param login
     * @param password
     * @returns {Promise<string[]>}
     */
    async doLogin({login, password}) {
        try {
            this.isLoading = true;
            const {data} = await AuthRepository.loginAuth(login, password)
            localStorage.setItem('token', data.accessToken);
            this.isAuth = true;
            this.login(login);
        } catch (e) {
            const errors = e.response?.data?.errors;
            console.log(errors || e);
            if (errors) {
                this.errors = errors;
                return;
            }
            return this.errors = ['Произошла ошибка'];
        } finally {
            this.isLoading = false
        }
    }

    /**
     * Зарегестрироваться
     * @param login
     * @param password
     * @returns {Promise<string[]>}
     */
    async registration({login, password}) {
        try {
            this.isLoading = true;
            const {data} = await AuthRepository.registration(login, password)
            localStorage.setItem('token', data.accessToken);
            this.isAuth = true;
            this.login = login;
        } catch (e) {
            const errors = e.response?.data?.errors;
            console.log(errors || e);
            if (errors) {
                console.log('errors: ', errors);
                this.errors = errors;
                return;
            }
            return this.errors = ['Произошла ошибка'];
        } finally {
            this.isLoading = false
        }
    }

    /**
     * Проверка на авторизацию
     * @returns {Promise<void>}
     */
    async checkAuth() {
        try {
            this.isLoading = true;
            const {data} = await axios.get(`${API_URL}/refresh`, {withCredentials: true});
            localStorage.setItem('token', data.accessToken);
            this.isAuth = true;
            this.login = data.login;
        } catch (e) {
            console.log('e: ', e);
        } finally {
            this.isLoading = false;
        }
    }

    /**
     * Выход из аккаунта
     * @returns {Promise<boolean>}
     */
    async logout() {
        try {
            this.isLoading = true;
            await AuthRepository.logout();
            localStorage.clear();
            this.isAuth = false;
            this.login = '';
            return true;
        } catch (e) {
            return false;
        } finally {
            this.isLoading = false;
        }
    }
}
