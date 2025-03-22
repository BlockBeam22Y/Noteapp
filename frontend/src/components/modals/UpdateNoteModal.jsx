import { useState } from 'react';
import ErrorMessage from '../ErrorMessage';
import CategorySelector from '../CategorySelector';

function UpdateNoteModal({ note, setModal, loadNotes, allCategories }) {
    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);
    const [categories, setCategories] = useState(note.categories);

    const [isPending, setIsPending] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleOnSubmit = () => {
        setIsPending(true);
        setIsError(false);

        fetch(`${import.meta.env.VITE_API_URL}/notes/${note.id}`, {
            method: 'PUT',
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
            <h3 className='font-bold text-2xl border-b pb-2'>Edit Note</h3>
            
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
                    disabled={isPending || !title.trim() || !content.trim() || !categories.length}
                    onClick={handleOnSubmit}
                    className='
                    font-medium px-4 py-2 rounded-full
                    bg-cyan-500 text-white transition-colors
                    hover:bg-cyan-600 hover:text-gray-100
                    active:bg-cyan-400 active:text-white
                    disabled:bg-cyan-400 disabled:text-white
                '>
                    Save changes
                </button>
            </div>
        </>
    );
}

export default UpdateNoteModal;