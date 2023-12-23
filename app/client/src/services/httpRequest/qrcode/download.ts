
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export const downloadQrCode = async (format: string, qrcode_id: string) => {

    try {

      const response = await axios.get(`http://localhost:5000/download/qrcode/${encodeURIComponent(format)}/${encodeURIComponent(qrcode_id)}`, {
        responseType: 'arraybuffer'
        
      });

  
      const blob = new Blob([response.data], { type: `image/${format}` });

      const a = document.createElement('a');

      a.href = URL.createObjectURL(blob);
      a.download = `${uuidv4().toString()}.${format}`;

      
      a.click();

   
      URL.revokeObjectURL(a.href);    
            
    } catch (error) {
      console.error('Error fetching QR code image:', error);
    }
  };
  
