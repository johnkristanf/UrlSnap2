import { useQuery } from "react-query";

import { generatedQrCodeTypes } from "../../utils/types/qrCodeFormTypes";
import { QrCodeDataDisplayActionsBtn } from "../ui/button";

import { fetchAllQrCodes } from "../../services/httpRequest/qrcode/fetchAll";
import { useState } from "react";

import { QrCodeDataDisplayModal } from "./qrCodeDataDisplayModal";

import '../../../public/scrollStyle.css';





export const QrCodeDataDisplay = () => {

    const [openQrModal, setopenQrModal] = useState(false);

    const [qrCodeData, setqrCodeData] = useState({
        qrCodeLongURL: '',
        qrCodeShortURL: '',
        qrCode: '',
    });


    const openModal = (longURL: string, shortURL: string, qrCode: string, qrCode_id: string) => {

        const qrData = {
            qrCodeLongURL: longURL,
            qrCodeShortURL: shortURL,
            qrCode: qrCode,
            qrCode_id,
        }

        setqrCodeData(qrData);
        setopenQrModal(true);
    }

   
    const qrcode = useQuery('qrCodes', fetchAllQrCodes);
        

    return(

        <>

        <div className="max-xl:w-[80%] w-[30%] mt-8 p-5 h-[93%] rounded-md bg-slate-200 scrollable-container overflow-auto">

            <h1 className="text-slate-700 text-2xl font-bold mb-5">Generated Qr Codes</h1>

            {
                qrcode.data?.data.map((data: generatedQrCodeTypes) => (

                    <div key={data.qrCodeShortURL} className="bg-violet-700 p-5 rounded-md mb-5 text-white font-semibold flex justify-between items-center">

                        <div className="w-[60%] text-ellipsis overflow-hidden font-semibold whitespace-nowrap">{data.qrCodeLongURL}</div>

                        <QrCodeDataDisplayActionsBtn openModal={openModal} data={data} />


                    </div>
                ))
            }

           

        </div>


        { openQrModal && <QrCodeDataDisplayModal qrCodeData={qrCodeData} setopenQrModal={setopenQrModal} /> }


        </>
    )
}