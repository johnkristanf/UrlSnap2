import axios from 'axios';

import { ShortURLFormInputTypes } from '../../../utils/types/shorturl';

export const createShortUrl = async (urldata: ShortURLFormInputTypes) => {

    try {

        urldata['shortUrl'] = '';
        urldata['clicks'] = 0;

        return axios.post('http://localhost:5000/url', urldata);

    } catch (error) {
        console.error(error)
    }
}
