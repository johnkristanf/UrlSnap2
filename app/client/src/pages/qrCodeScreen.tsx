import { NavBar } from "../components/navbar";
import { Footer } from "../components/footer";

import { QrCodeDescription } from "../components/qrcode/qrDescription";
import { CustomQrCodeForm } from "../components/qrcode/customQrcodeForm";
import { QrCodeDataDisplay } from "../components/qrcode/qrCodeDataDisplay";

import { QueryClient, QueryClientProvider } from "react-query";


const qrCodeScreen = () => {

    const queryClient = new QueryClient();

    return(
        
        <>
        <NavBar />

            <div className="max-xl:h-[220vh] mt-5 pb-24 flex flex-col justify-start items-center w-full h-[110vh]">

                <QrCodeDescription />

                <div className="w-full flex justify-evenly h-full max-xl:flex-col max-xl:items-center max-xl:mt-5">

                    <QueryClientProvider client={queryClient}>
                        <CustomQrCodeForm />
                        <QrCodeDataDisplay  />
                        
                    </QueryClientProvider>
                  
                </div>

              
            </div>

        <Footer />
        </> 
    )
}

export default qrCodeScreen;