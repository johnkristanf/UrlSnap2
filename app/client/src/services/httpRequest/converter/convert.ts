import axios from "axios";

import { converterFormTypes } from "../../../utils/types/converter";

export const convertYtURL = async (ytURL: converterFormTypes) => {

    try {
        
        const response = await axios.post('https://u-s-9rav.onrender.com/convert', ytURL);
        return response.data;


    } catch (error) {
        console.error(error)
    }

}