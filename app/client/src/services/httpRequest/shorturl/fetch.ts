import axios from 'axios';

export const fetchShortUrl = () => {
    return axios.get('http://localhost:5000');
}