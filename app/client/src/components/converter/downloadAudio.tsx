import { DownloadAudioBtn, ConvertNextBtn } from "../ui/button"

export const DownloadAudio = ({ setaudioFilePath, audioFilePath }: any) => {

    const splitPathArray = audioFilePath.split('/');

    const audioTittle = splitPathArray[splitPathArray.length - 1];

    return(

        <div className="max-lg:w-[60%] max-sm:w-[80%] w-[40%] h-[90%] p-4 mt-8 text-white bg-violet-700 rounded-md">

            <h1 className="font-semibold">{ audioTittle }</h1>

            <div className="flex mt-4 gap-7">
                <DownloadAudioBtn audioFilePath={audioFilePath} />
                <ConvertNextBtn setaudioFilePath={setaudioFilePath} audioFilePath={audioFilePath} />
            </div>
           

        </div>
    )
}