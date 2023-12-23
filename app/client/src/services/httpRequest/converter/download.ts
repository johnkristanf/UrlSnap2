
import axios from 'axios';


export const downloadAudio = async (audioFilePath: string) => {

    try {

    const response =  await axios.get(`http://localhost:5000/convert/${encodeURIComponent(audioFilePath)}`, {
        responseType: 'arraybuffer'
    });

        const splitPath = audioFilePath.split('/');
        const audioTittle = splitPath[ splitPath.length - 1 ];

        const blob = new Blob([response.data], { type: 'audio/mpeg' });

        const a = document.createElement('a');

        a.href = URL.createObjectURL(blob);
        a.download = audioTittle;

        a.click();

        URL.revokeObjectURL(a.href);

    } catch (error) {
      console.error('Error fetching QR code image:', error);
    }
  };
  
