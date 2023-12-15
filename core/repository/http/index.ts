import axios, {AxiosRequestHeaders} from "axios";

export const API_URL: string = 'http://localhost:3001'

const headers = {
    'Access-Control-Allow-Origin': '*',
    "Cache-Control": "no-cache",
    "Content-Type": "application/x-www-form-urlencoded",
} as Partial<AxiosRequestHeaders>

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
})

/**
 * Конфиг для запроса
 */
$api.interceptors.request.use((config) => {
    config.headers = {
        ...config.headers,
        ...headers,
        Authorization: `Bearer ${localStorage.getItem('token')}`
    } as AxiosRequestHeaders
    return config
})

/**
 * Конфиг для ответа
 */
$api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    try {
        const originalRequest = error.config;
        if (error.response.status === 401 && error.constructor && !error.config._isRetry) {
            originalRequest._isRetry = true;
            const response = await axios.get(`${API_URL}/refresh`, {withCredentials: true});
            localStorage.setItem('token', response.data.accessToken);
            return $api.request(originalRequest);
        }
    } catch (e) {
        console.log(e)
    }
    throw error;
})

export default $api;
