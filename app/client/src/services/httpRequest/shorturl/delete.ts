import axios from 'axios';

export const deleteShortUrl = async (url_id: string) => {

    try {
        return axios.delete(`http://localhost:5000/url/${url_id}`);

    } catch (error) {
        console.error(error)
    }
}
