import axios, { AxiosError, AxiosResponse } from "axios";
import { Activity } from "../models/activity";
import { toast } from "react-toastify";

axios.defaults.baseURL = 'http://localhost:5000/api'

/*
const sleep = (delay: number) => {
    // resolve is the function that gets called after the delay
    return new Promise((resolve) =>
    {
        setTimeout(resolve, delay);
    })
}
*/


axios.interceptors.response.use(async response => {
    return response;
}, (error: AxiosError) => {
    const {data, status} = error.response!;
    switch (status) {
        case 400:
            toast.error('Bad Request');
            break;
        case 401:
            toast.error('Unauthorized');
            break;
        case 403:
            toast.error('Forbidden');
            break;
        case 404:
            toast.error('Not Found');
            break;
        case 500:
            toast.error('Server Error');
            break;
    }
    return Promise.reject(error);
});


const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody),
}

const Activities = {
    list: () => requests.get<Activity[]>('/activities'),
    details: (id: string) => requests.get<Activity>(`/activities/${id}`),
    create: (activity: Activity) => axios.post('/activities', activity),
    update: (activity: Activity) => axios.put(`/activities/${activity.id}`, activity),
    delete: (id: string) => axios.delete(`/activities/${id}`)
}

const agent = {
    Activities
}

export default agent;


