import { Loader } from "../../components/loader";

import Swal from "sweetalert2";

export const isLoading = (mutation: any) => {
    return mutation.isLoading && <Loader /> 
}


export const isError = (errors: any) => {

    if(errors.longUrl || errors.qrCodeURL || errors.youtubeURL){
        
        Swal.fire({
            position: "top",
            icon: "error",
            title: "Invalid URL! Please try another url.",
            showConfirmButton: false,
            timer: 1500
        }) 
    } 
    
   
}