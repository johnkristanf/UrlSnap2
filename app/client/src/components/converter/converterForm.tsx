import { ConverterInput } from "../ui/inputs";
import { ConvertYTMP3Btn } from "../ui/button";
import { DownloadAudio } from "./downloadAudio";

import { converterFormTypes } from "../../utils/types/converter";
import { isError, isLoading } from "../../services/validator/inputs";

import { convertYtURL } from "../../services/httpRequest/converter/convert";

import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

import { useMutation, useQueryClient } from "react-query";


export const ConverterForm = () => {

    const [Submitting, setSubmitting] = useState(false);
    const [audioFilePath, setaudioFilePath] = useState();

    const queryClient = useQueryClient();

    const { register, handleSubmit, reset, formState: { errors } } = useForm<converterFormTypes>();

    const mutation = useMutation(
        async (converterData: converterFormTypes) => {
            return await convertYtURL(converterData)
      
        },

        {
            onSuccess: () => {
                queryClient.invalidateQueries('converted');
            }
        } 
    );


    const onSubmit: SubmitHandler<converterFormTypes> = async (converterData) => {
        setSubmitting(true);

        const result = await mutation.mutateAsync(converterData);
        setaudioFilePath(result);

        reset();

        setSubmitting(false);
    }

    if(audioFilePath){
        return <DownloadAudio setaudioFilePath={setaudioFilePath} audioFilePath={audioFilePath} />
    } 
    

    return(

    <>
        { isLoading(mutation) }

        { isError(errors) }


        <div className="max-lg:w-[80%] w-1/2 h-[90%] p-4 mt-5 text-white bg-violet-700 rounded-md">

            <h1 className="font-semibold">Please insert a valid YouTube video URL</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="flex items-center justify-center gap-3 w-full mt-5 ">
                <ConverterInput register={register} />

                <ConvertYTMP3Btn Submitting={Submitting} />
            </form>

        </div>
    </>

    )
}


