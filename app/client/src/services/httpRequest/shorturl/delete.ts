import axios from 'axios';

export const deleteShortUrl = async (url_id: string) => {

    try {
        return axios.delete(`https://u-s-9rav.onrender.com/url/${url_id}`);

    } catch (error) {
        console.error(error)
    }
}
