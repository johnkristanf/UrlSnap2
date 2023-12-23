import { ServicesBtn } from "../../ui/button";
import { createShortUrl } from "../../../services/httpRequest/shorturl/create";

import { ShortURLFormInputTypes } from "../../../utils/types/shorturl";

import { ShorturlInput } from "../../ui/inputs";

import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

import { useMutation, useQueryClient } from 'react-query';

import { isLoading, isError } from "../../../services/validator/inputs";




export const ServicesForm = ({ btnText, placeholder }: any) => {

    const [Submitting, setSubmitting] = useState(false);

    const queryClient = useQueryClient();

    const { register, handleSubmit, reset, formState: { errors } } = useForm<ShortURLFormInputTypes>();

    const mutation = useMutation(createShortUrl, {
        onSuccess: () => {
          queryClient.invalidateQueries('shorturls')
        },
    })


    const onSubmit: SubmitHandler<ShortURLFormInputTypes> = async (data) => {
        setSubmitting(true)

        mutation.mutate(data); 
        reset();

        setSubmitting(false)
    }
    
    return(
        <>

            { isLoading(mutation) }

            { isError(errors) }

            <form onSubmit={handleSubmit(onSubmit)} className="max-lg:w-[76%] max-sm:w-[90%] flex items-center justify-center gap-3 w-1/2 mt-5">

                <ShorturlInput register={register} placeholder={placeholder} />
                
                <ServicesBtn btnText={btnText} Submitting={Submitting} />

            </form>
            
        </>
    )
}


