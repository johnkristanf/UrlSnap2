import axios from 'axios';

import { ShortURLFormInputTypes } from '../../../utils/types/shorturl';

export const createShortUrl = async (urldata: ShortURLFormInputTypes) => {

    try {

        urldata['shortUrl'] = '';
        urldata['clicks'] = 0;

        return axios.post('https://u-s-9rav.onrender.com/url', urldata);

    } catch (error) {
        console.error(error)
    }
}
