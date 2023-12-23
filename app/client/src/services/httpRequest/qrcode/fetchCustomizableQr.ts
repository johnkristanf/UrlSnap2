
import axios from 'axios';


export const fetchCustomizableQrCode = async (backgroundColor: string, foregroundColor: string) => {

    try {

      const response = await axios.get(`http://localhost:5000/customizable/${encodeURIComponent(backgroundColor)}/${encodeURIComponent(foregroundColor)}`, {
        responseType: 'arraybuffer'
        
      });
  
      const blob = new Blob([response.data], { type: 'image/png' });
      const qrcode = URL.createObjectURL(blob);
      
      return qrcode;
      
    } catch (error) {
      console.error('Error fetching QR code image:', error);
    }
  };
  
