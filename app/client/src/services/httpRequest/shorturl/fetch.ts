import axios from 'axios';

export const fetchShortUrl = () => {
    return axios.get('https://u-s-9rav.onrender.com');
}