import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://project.x-zd.net:3001/apis',
});

instance.interceptors.response.use(
    (res) => {
        return res.data;
    },
    (err) => {
        return Promise.reject(err);
    }
)

export default instance;