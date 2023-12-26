
import axios from 'axios';


export const getMp3Title = async (ytUrl: string) => {

    try {

        const response = await axios.get(`https://u-s-9rav.onrender.com/convert/title/${encodeURIComponent(ytUrl)}`);

       return response.data;

    } catch (error) {
        console.error(error);
        return undefined;
    }
};
