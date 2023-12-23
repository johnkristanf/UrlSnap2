import axios from "axios";


export const convertNextYtURL = async (audioFilePath: string) => {

    try {
        
      await axios.get(`https://u-s-9rav.onrender.com/convert/next/${encodeURIComponent(audioFilePath)}`);

    } catch (error) {
        console.error(error)
    }

}