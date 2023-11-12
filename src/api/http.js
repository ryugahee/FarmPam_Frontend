import axios from "axios";

const instance = axios.create({
    timeout: 5000,
    baseURL: '/api',
    headers:{
        'content-type': 'application/x-www-form-urlencoded'
    }
});


export default instance;