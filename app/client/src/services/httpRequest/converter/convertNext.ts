import axios from "axios";


export const convertNextYtURL = async (audioFilePath: string) => {

    try {
        
      await axios.get(`http://localhost:5000/convert/next/${encodeURIComponent(audioFilePath)}`);

    } catch (error) {
        console.error(error)
    }

}