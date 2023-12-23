
import axios from 'axios';

export const deleteQrCode = (qrCode_id: string) => {
    return axios.delete(`https://u-s-9rav.onrender.com/${qrCode_id}`);
}