import axios from 'axios';

export const fetchAllQrCodes = () => {

    return axios.get('https://u-s-9rav.onrender.com/all/qrcodes');
}