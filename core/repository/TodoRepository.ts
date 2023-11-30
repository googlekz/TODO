// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import $api from '../repository/http/index.js'
import { AxiosResponse } from "axios";
import {ITitle} from "../models/category.ts";

interface IGroup {
    title: string;
}

interface ITodo {
    title: string;
    groupId: number;
}

export default class TodoRepository {
    static async getTodos (): Promise<AxiosResponse<ITitle[]>> {
        return $api.get('/todo/groups')
    }

    static async createGroup (payload: IGroup): Promise<AxiosResponse> {
        return $api.post('/todo/groups', payload);
    }

    static async createItem (payload: ITodo): Promise<AxiosResponse> {
        return $api.post('/todo/item', payload);
    }
}
