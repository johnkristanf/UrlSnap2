import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';

export const Logo = () => {

    return(

        <div className='flex items-center gap-2'>
           <FontAwesomeIcon icon={faLink} className='text-4xl'/>
           <h1 className='max-md:text-slate-200 text-violet-700 font-bold text-3xl'>UrlSnap</h1>
           
        </div>
    )
}