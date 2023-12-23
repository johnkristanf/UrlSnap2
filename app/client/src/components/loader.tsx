import '../../public/loaderStyle.css';

export const Loader = () => {

    return(
    <>
        <div className='bg-gray-500 opacity-75 w-full h-screen fixed top-0 z-[1000]'></div>
        
        <div className='w-full z-[2000] absolute top-0 h-screen flex justify-center items-center'>

        <div id="wifi-loader">
            <svg className="circle-outer" viewBox="0 0 86 86">
                <circle className="back" cx="43" cy="43" r="40"></circle>
                <circle className="front" cx="43" cy="43" r="40"></circle>
                <circle className="new" cx="43" cy="43" r="40"></circle>
            </svg>
            <svg className="circle-middle" viewBox="0 0 60 60">
                <circle className="back" cx="30" cy="30" r="27"></circle>
                <circle className="front" cx="30" cy="30" r="27"></circle>
            </svg>
            <svg className="circle-inner" viewBox="0 0 34 34">
                <circle className="back" cx="17" cy="17" r="14"></circle>
                <circle className="front" cx="17" cy="17" r="14"></circle>
            </svg>
            <div className="text text-3xl" data-text="Loading......"></div>
        </div>

        </div>
       

    </>
    )
}