// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import $api from '../repository/http/index.js'
import { AxiosResponse } from "axios";
import {AuthResponse} from "../models/AuthResponse";

export default class AuthRepository {
    static async loginAuth (login: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post('/login', { login, password})
    }

    static async registration (login: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post('/registration', { login, password})
    }

    static async logout (): Promise<void> {
        return $api.post('/logout')
    }
}
