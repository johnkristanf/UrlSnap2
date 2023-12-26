
import { DownloadAudioBtn, ConvertNextBtn } from "../ui/button"

import { getMp3Title } from "../../services/httpRequest/converter/mp3Tittle"
import { useEffect, useState } from "react";
import { Loader } from "../loader";

const DownloadAudio = ({ YTurl, setconvertedAudio, convertedAudio }: any) => {

    
    console.log('convertedAudio', convertedAudio);

    const [mp3Title, setmp3Title] = useState<string>();

    useEffect(() => {

        const getTittle = async () => {
            setmp3Title(await getMp3Title(YTurl))
        }

        getTittle();

    }, [YTurl]);

    
    if(!mp3Title) return <Loader />


    return(

        <div className="max-lg:w-[60%] max-sm:w-[80%] w-[40%] h-[90%] p-4 mt-8 text-white bg-violet-700 rounded-md">

            <h1 className="font-semibold">{ mp3Title } </h1>

            <div className="flex mt-4 gap-7">
                <DownloadAudioBtn mp3Title={mp3Title} convertedAudio={convertedAudio} />
                <ConvertNextBtn setconvertedAudio={setconvertedAudio} />
            </div>
           

        </div>
    )
}

export default DownloadAudio