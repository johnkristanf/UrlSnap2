import axios from 'axios';

export const fetchAllQrCodes = () => {

    return axios.get('http://localhost:5000/all/qrcodes');
}