import $api from './http'
import { AxiosResponse } from "axios";
import {ITitle} from "../models/category.ts";

interface IGroup {
    title: string;
}

interface ITodo {
    title: string;
    groupId: number;
}

export interface ITodoPayload extends ITodo {
    id: number;
    isDone: boolean
}

export default class TodoRepository {
    /**
     * Запрос на получения групп и дел
     */
    static async getTodos (): Promise<AxiosResponse<ITitle[]>> {
        return $api.get('/todo/groups')
    }

    /**
     * Запрос на создание группы
     * @param payload
     */
    static async createGroup (payload: IGroup): Promise<AxiosResponse> {
        return $api.post('/todo/groups', payload);
    }

    /**
     * Запрос на создание дел
     * @param payload
     */
    static async createItem (payload: ITodo): Promise<AxiosResponse> {
        return $api.post('/todo/item', payload);
    }

    /**
     * Запрос на обновление дел
     * @param payload
     */
    static async updateItem (payload: ITodoPayload): Promise<AxiosResponse> {
        return $api.put(`/todo/item/${payload.id}`, payload)
    }
}
