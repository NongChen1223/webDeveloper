import axios, {AxiosRequestConfig} from 'axios';

// 封装 GET 方法
export function get<T>(url: string, params?: any, config?: AxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
        axios.get<T>(url, {...config, params})
            .then(response => resolve(response.data))
            .catch(error => reject(error));
    });
}

// 封装 POST 方法
export function post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
        axios.post<T>(url, data, config)
            .then(response => {
                // console.log('post response', response)
                resolve(response.data)
            })
    });
}