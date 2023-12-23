import { WebURLQrCodeInput } from "../ui/inputs";
import { QrCodeColorPickerInput } from "../ui/inputs";
import { QrCodeResolutionInput } from "../ui/inputs";

import { GenerateQrBtn } from "../ui/button";

import { qrCodeFormTypes } from "../../utils/types/qrCodeFormTypes";

import { isLoading, isError } from "../../services/validator/inputs";

import { createQrCode } from "../../services/httpRequest/qrcode/create";

import { useForm, SubmitHandler } from "react-hook-form";

import { useMutation, useQueryClient } from 'react-query';
import { useState } from "react";




export const CustomQrCodeForm= () => {

    const [Submitting, setSubmitting] = useState(false);

    const queryClient = useQueryClient();
    
    const mutation = useMutation(createQrCode, {
        onSuccess: () => {
            queryClient.invalidateQueries('qrCodes')
        }
    })

    const { register, handleSubmit, reset, formState: { errors } } = useForm<qrCodeFormTypes>();


    const onSubmit: SubmitHandler<qrCodeFormTypes> = (qrCodeData) => {
        setSubmitting(true);

        mutation.mutate(qrCodeData)
        reset();

        setSubmitting(false);

    }

    return(
        
        <>
            <div className="max-xl:w-[80%] bg-slate-200 p-8 mt-8 w-[40%] h-[93%] rounded-md">

                    { isLoading(mutation) }

                    { isError(errors) }

                <form onSubmit={handleSubmit(onSubmit)} >

                    <WebURLQrCodeInput register={register} /> 


                   <QrCodeColorPickerInput register={register} />

                   <QrCodeResolutionInput register={register} />

                   <GenerateQrBtn Submitting={Submitting} />

                </form>
               
            </div>
        </>
    )
}