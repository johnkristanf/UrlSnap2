import { urlPattern, YTurlPattern } from "../../utils/patterns";
import { fetchCustomizableQrCode } from "../../services/httpRequest/qrcode/fetchCustomizableQr";

import { useEffect, useState } from 'react';

export const ShorturlInput = ({ register, placeholder }: any) => {

    return(
        <input {...register("longUrl", { pattern: urlPattern, required: true })} 
        placeholder={placeholder} 
        className="w-full p-3 rounded-md"
        /> 
    )
}



export const WebURLQrCodeInput = ({ register }: any) => {

    return(
      
        <>
            <label className="text-slate-700 text-xl font-bold">Website URL</label>

            <p className="text-slate-700 text-[12px] font-bold mb-3 mt-1">If you have a very long URL make sure to lower the resolution to make the qr code readable in scanners</p>

            <input 
                type="text" 

                {...register("qrCodeURL", { pattern: urlPattern, required: true })} 
                className="w-full p-5 rounded-md bg-violet-700 placeholder:font-bold mt-2 focus:outline-none text-white"

                placeholder="Place a URL below to link with your QR Code"
            />

        </>

    )
}



const displayCustomizableQrCode = async (backgroundColor: string, foregroundColor: string, setCustomizableQrCode: any): Promise<void> => {

  const customizableQrCode = await fetchCustomizableQrCode(backgroundColor, foregroundColor);

  setCustomizableQrCode(customizableQrCode);

}

export const QrCodeColorPickerInput = ({ register }: any) => {

    const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
    const [foregroundColor, setForegroundColor] = useState('#000000');

    const [CustomizableQrCode, setCustomizableQrCode] = useState<string>('');

    useEffect(() => {

      const customizableQrCode = async (): Promise<void> => {
        await displayCustomizableQrCode(backgroundColor, foregroundColor, setCustomizableQrCode);
      }

      customizableQrCode();

    }, [backgroundColor, foregroundColor])


    return (

      <div className="my-8 flex items-center gap-3 relative">

       
        <div className="flex flex-col w-[50%] gap-3">

        <label className="font-bold text-slate-700">Background Color</label>

          <div className="relative">

              <input
                type="text"
                value={backgroundColor}
                readOnly
                className="w-[80%] p-2 rounded-md bg-violet-700 text-white"/>

              <input
                type="color"
                className="bg-violet-700 rounded-lg p-2 absolute left-[60%] top-[-12%] mt-2"
                style={{ height: '36px', width: '36px' }}
            
                value={backgroundColor}
                {...register("qrcode_bgcolor", { required: true })} 
                onChange={(e) => setBackgroundColor(e.target.value)}
               />


          </div>
  

        <label className="font-bold text-slate-700">Foreground Color</label>
  
          <div className="relative">

              <input
                type="text"
                value={foregroundColor}
                readOnly
                className="w-[80%] p-2 rounded-md bg-violet-700 text-white" />


              <input
                type="color"
                className="bg-violet-700 rounded-lg p-2 absolute left-[60%] top-[-12%] mt-2"
                style={{ height: '36px', width: '36px' }}

                value={foregroundColor}
                {...register("qrcode_foregroundcolor", { required: true })} 
                onChange={(e) => setForegroundColor(e.target.value)}

                />

          </div>

        </div>
       

          <img src={CustomizableQrCode} width={160} className="rounded-md"/> 

      </div>

    );

}



export const QrCodeResolutionInput = ({ register }: any) => {

  return (
    <>

      <label className="font-bold text-slate-700">Resolution</label>

      <div className="mt-3 flex gap-3">

        <label>Low</label>
        <input type="radio" value="L" defaultChecked {...register("resolution", { required: true })} />

        <label>Meduim</label>
        <input type="radio" value="M" {...register("resolution", { required: true })} />

        <label>High</label>
        <input type="radio" value="H" {...register("resolution", { required: true })} />

      </div>
      
    </>

  );

};


export const ConverterInput = ({ register }: any) => {

  return(

    <input 
    type="text" 

    {...register("youtubeURL", { pattern: YTurlPattern, required: true })} 
    className="w-full p-5 rounded-md bg-black placeholder:font-bold focus:outline-none text-white"

    placeholder="https://www.youtube.com/watch?v=x1iXA041zM4"
    />

  )
}
