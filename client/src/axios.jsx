import axios from 'axios'

const instance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
});
instance.interceptors.request.use(function (config) {
    const data = window.localStorage.getItem('persist:phongtrosinhvien/user')
    const tokenObj = data && JSON.parse(data)
    if (tokenObj?.token) config.headers = { authorization: `Bearer ${JSON.parse(tokenObj.token)}` }
    return config;
}, function (error) {
    return error;
});

instance.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    return error.response.data;
});

export default instance