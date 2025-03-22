import { PiWarningCircleFill } from 'react-icons/pi';
import { IoIosClose } from 'react-icons/io';

function ErrorMessage({ setIsError }) {
    return (
        <div className='bg-red-600 text-white text-sm p-2 flex items-center gap-1 rounded'>
            <PiWarningCircleFill className='w-5 h-5' />
            <span className='grow'>Something went wrong. Please try again.</span>
            
            <button onClick={() => setIsError(false)}>
                <IoIosClose className='w-5 h-5 rounded-full hover:bg-red-500'/>
            </button>
        </div>
    );
}

export default ErrorMessage;