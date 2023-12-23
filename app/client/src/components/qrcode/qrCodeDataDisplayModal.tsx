import { QrCodeDownloadQrFormatBtn } from "../ui/button";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

export const QrCodeDataDisplayModal = ({ qrCodeData, setopenQrModal }: any) => {

    const imageData = `data:image/png;base64,${qrCodeData.qrCode}`;

    console.log('qrCodeData', qrCodeData)


    return(

    <>
        <div className="bg-gray-800 w-full h-screen fixed top-0 z-[500] opacity-75"></div>

        <div className="max-md:py-0 max-md:absolute max-md:h-[120vh] w-full h-screen fixed top-0 z-[600] flex justify-center py-16">


            <div className="max-md:flex-col max-md:gap-12 max-md:pb-10 max-md:mt-10 max-md:w-[80%] max-md:pr-10 max-md:h-full bg-slate-200 w-[60%] rounded-md flex justify-evenly items-center relative">

                <div className="max-md:relative flex justify-between items-center absolute top-8 w-full px-8">

                    <label className="font-bold text-slate-700 text-3xl">Qr Code Details</label>

                        <FontAwesomeIcon onClick={() => setopenQrModal(false)} 
                           icon={faX} 
                           className="font-bold text-3xl hover:opacity-75 hover:cursor-pointer"
                        />

                </div>

                <img src={imageData} alt="QR Code" width={200} className="rounded-md"/>


                <div className="flex flex-col gap-10 w-1/2">


                   <div className="flex flex-col">
                       <label className="font-bold text-slate-700 text-2xl">Long URL:</label>

                       <a href={qrCodeData.qrCodeLongURL} target="_blank" 
                            className="font-bold text-xl text-violet-700 overflow-hidden text-ellipsis whitespace-nowrap">
                            { qrCodeData.qrCodeLongURL }
                        </a>

                   </div>


                    <div className="flex flex-col">
                        <label className="font-bold text-slate-700 text-2xl"> Short URL:</label>

                        <a href={`http://localhost:5000/qr/${qrCodeData.qrCodeShortURL}`} target="_blank" 
                            className="font-bold text-xl text-violet-700">
                            http://localhost:5000/qr/{qrCodeData.qrCodeShortURL}
                        </a>

                    </div>
        

                    <div>
                        <h1 className="font-bold text-slate-700 text-2xl">Download Qr Code via:</h1>
                        <QrCodeDownloadQrFormatBtn qrcode_id={qrCodeData.qrCode_id} />

                    </div>


                </div>

            </div>

        </div>

    </>

    )
}