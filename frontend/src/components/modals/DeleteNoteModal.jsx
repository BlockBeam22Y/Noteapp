import { useState } from 'react';
import ErrorMessage from '../ErrorMessage';
import { IoIosWarning } from 'react-icons/io';

function DeleteNoteModal({ note, setModal, loadNotes }) {
    const [isPending, setIsPending] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleOnSubmit = () => {
        setIsPending(true);
        setIsError(false);

        fetch(`${import.meta.env.VITE_API_URL}/notes/${note.id}`, { method: 'DELETE' })
            .then(res => {
                if (!res.ok)
                    throw new Error('Something went wrong!');
                
                setModal(null);
                loadNotes();
            })
            .catch(() => setIsError(true))
            .finally(() => setIsPending(false))
    };
    
    return (
        <>
            <div className='flex flex-col items-center'>
                <IoIosWarning className='w-20 h-20 fill-red-600' />

                <h3 className='font-bold text-2xl'>Are you sure?</h3>
            </div>

            <p className='text-center w-80'>You will permanently delete this note</p>

            <pre className='border p-1 text-center w-80'>
                <span className='font-bold'>Title: </span>
                <span className='text-wrap'>{ note.title }</span>
            </pre>
            
            { isError && <ErrorMessage setIsError={setIsError}/> }
            
            <div className='flex justify-center items-center gap-2'>
                <button
                    onClick={() => setModal(null)}
                    className='
                    font-medium px-4 py-2 rounded-full
                    bg-white text-cyan-500 transition-colors
                    hover:bg-gray-100 hover:text-cyan-600
                    active:bg-white active:text-cyan-400
                    border border-cyan-500
                '>
                    Cancel
                </button>

                <button
                    disabled={isPending}
                    onClick={handleOnSubmit}
                    className='
                    font-medium px-4 py-2 rounded-full
                    bg-red-500 text-white transition-colors
                    hover:bg-red-600 hover:text-gray-100
                    active:bg-red-400 active:text-white
                    disabled:bg-red-400 disabled:text-white
                '>
                    Yes, delete it!
                </button>
            </div>
        </>
    );
}

export default DeleteNoteModal;