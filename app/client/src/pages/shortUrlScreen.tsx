import { NavBar } from "../components/navbar";
import { Footer } from "../components/footer";

import { ServicesForm } from "../components/shorturl/ui/ServicesForm";
import { DataDisplay } from "../components/shorturl/ui/ShorturlDisplay";

import { QueryClient, QueryClientProvider } from "react-query";

const shortUrlScreen = () => {

    const queryClient = new QueryClient();

    return(
        
        <>
          <NavBar />

            <div className="mt-12 pb-10 flex flex-col justify-start items-center w-full h-[80vh]">
                
                <div className="max-md:w-[80%] w-full flex flex-col items-center justify-center">
                  <h1 className="text-white text-5xl font-semibold">Free Url Snap</h1>
                  <h1 className="text-white text-center font-semibold opacity-75 mt-5">URLSnap efficiently transforms extensive web URLs into concise and shareable links.</h1>
                </div>
               

                <QueryClientProvider client={queryClient}>
                   <ServicesForm btnText='Snap URL' placeholder='Enter link here'/>
                   <DataDisplay />
                   
                </QueryClientProvider>

            </div>

            <Footer />
        </> 
    )
}

export default shortUrlScreen;