import { DataDisplayBtn } from "../../ui/button";

import { fetchShortUrl } from "../../../services/httpRequest/shorturl/fetch";
import { ShortURLFormInputTypes } from "../../../utils/types/shorturl";
import { generateRandomString } from "../../../utils/generateKey";

import { useQuery } from 'react-query';

import '../../../../public/scrollStyle.css';


export const DataDisplay = () => {

    const url = useQuery('shorturls', fetchShortUrl);

    return(

        <div className="max-sm:w-full max-lg:w-[80%] overflow-auto scrollable-container px-5 mt-8 h-[75%] w-[53%]">

        {
            url.data?.data.map((data: ShortURLFormInputTypes) => (

                <div 
                   key={generateRandomString(5)} 
                   className="max-sm:flex-col max-sm:items-center flex w-full justify-between w-1/2 mb-5 bg-slate-200 p-5 rounded-md gap-5">

                   <div className="w-[32%] max-sm:w-full max-sm:flex max-sm:justify-center max-sm:w-full sm:truncate font-semibold">{data.longUrl}</div>

                   <a href={`http://localhost:5000/${data.shortUrl}`} target="_blank" className="font-semibold text-violet-700">urlsnap.vercel.app/{data.shortUrl}</a>
    
                    <DataDisplayBtn url_id={data._id} clicks={data.clicks} urlToCopy={data.shortUrl} />

                </div>

            ))
        }

        </div>
        
    )
}