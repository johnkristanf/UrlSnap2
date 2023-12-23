import axios from 'axios';

import { qrCodeFormTypes } from '../../../utils/types/qrCodeFormTypes';

export const createQrCode = async (qrCodeData: qrCodeFormTypes) => {

    try {

        return axios.post('https://u-s-9rav.onrender.com', qrCodeData);

    } catch (error) {
        console.error(error)
    }
}
