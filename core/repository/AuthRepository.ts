import $api from './http'
import { AxiosResponse } from "axios";
import {AuthResponse} from "../models/AuthResponse";

export default class AuthRepository {
    /**
     * Запрос на логин
     * @param login
     * @param password
     */
    static async loginAuth (login: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post('/login', { login, password})
    }

    /**
     * Запрос на регистрацию
     * @param login
     * @param password
     */
    static async registration (login: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post('/registration', { login, password})
    }

    /**
     * Запрос на логаут
     */
    static async logout (): Promise<void> {
        return $api.post('/logout')
    }
}
