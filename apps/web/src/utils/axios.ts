import axios from 'axios'
const instance = axios.create({
    baseURL: process.env.SOCKET_SERVER,
    timeout: 1000
});
export default instance;