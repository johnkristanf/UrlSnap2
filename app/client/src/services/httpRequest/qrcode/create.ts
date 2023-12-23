import axios from 'axios';

import { qrCodeFormTypes } from '../../../utils/types/qrCodeFormTypes';

export const createQrCode = async (qrCodeData: qrCodeFormTypes) => {

    try {

        return axios.post('http://localhost:5000', qrCodeData);

    } catch (error) {
        console.error(error)
    }
}
