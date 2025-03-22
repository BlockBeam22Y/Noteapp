import { useState } from 'react';
import ErrorMessage from '../ErrorMessage';
import CategorySelector from '../CategorySelector';

function CreateNoteModal({ setModal, loadNotes, allCategories }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [categories, setCategories] = useState([]);

    const [isPending, setIsPending] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleOnSubmit = () => {
        setIsPending(true);
        setIsError(false);

        fetch(`${import.meta.env.VITE_API_URL}/notes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title.trim(),
                content: content.trim(),
                categories
            })
        })
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
            <h3 className='font-bold text-2xl border-b pb-2'>Create Note</h3>
            
            <div className='flex flex-col'>
                <label className='font-medium'>Title</label>
                <input
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    type='text'
                    className='w-80 h-7 border border-black/25 rounded px-2'
                />
            </div>

            <div className='flex flex-col'>
                <label className='font-medium'>Description</label>
                <textarea
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    className='w-80 min-h-20 max-h-40 border border-black/25 rounded px-2'
                />
            </div>

            <div className='flex flex-col'>
                <label className='font-medium'>Categories</label>
                
                <CategorySelector categories={categories} setCategories={setCategories} allCategories={allCategories} />
            </div>
            
            { isError && <ErrorMessage setIsError={setIsError}/> }
            
            <div className='flex justify-center items-center gap-2'>
                <button
                    disabled={isPending || !title.trim() || !content.trim() || !categories.length}
                    onClick={handleOnSubmit}
                    className='
                    font-medium px-4 py-2 rounded-full
                    bg-cyan-500 text-white transition-colors
                    hover:bg-cyan-600 hover:text-gray-100
                    active:bg-cyan-400 active:text-white
                    disabled:bg-cyan-400 disabled:text-white
                '>
                    Create
                </button>
            </div>
        </>
    );
}

export default CreateNoteModal;