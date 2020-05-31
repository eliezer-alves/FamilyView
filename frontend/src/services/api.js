import axios from 'axios';

const api = axios.create({
    baseURL: 'https://familyview.herokuapp.com/:'+process.env.PORT,
});

export default api;