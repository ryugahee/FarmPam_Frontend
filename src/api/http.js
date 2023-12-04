import axios from "axios";

const instance = axios.create({
    timeout: 10000,
    baseURL: '/api',
    headers:{
        'content-type': 'application/json'
    }
});


export default instance;