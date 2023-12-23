import axios from "axios";

import { converterFormTypes } from "../../../utils/types/converter";

export const convertYtURL = async (ytURL: converterFormTypes) => {

    try {
        
        const response = await axios.post('http://localhost:5000/convert', ytURL);
        return response.data;


    } catch (error) {
        console.error(error)
    }

}