import axios from 'axios';
import Cookies from 'js-cookie';

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
instance.interceptors.request.use((config) => {
    const token = Cookies.get(process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME || '');
    if (token) {
        config.headers.Authorization = token;
    }

    return config;
});

export default instance;
