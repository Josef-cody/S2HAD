import axios from 'axios';
import jwt_decode from "jwt-decode";

const axiosClient = axios.create({
    // http://localhost:8080
    //https://s2had-3cc1920c0c68.herokuapp.com/
    baseURL: 'https://s2had-3cc1920c0c68.herokuapp.com/',
    headers: {
        'Content': "application/json",
        'Content-type': "application/json",
        'Accept': "application/json",
    },
});
axiosClient.interceptors.request.use(
    config => {
        const token = localStorage.getItem('Access_token');
        if (token) {
            const decoded:any = jwt_decode(token);
            const userId = decoded.id
            config.headers.Authorization = `Bearer ${token}`;
            config.params = {
                userId:userId
            };
        };
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

export default axiosClient;
