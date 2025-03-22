import { SlOptionsVertical } from 'react-icons/sl'
import NoteContextMenu from './NoteContextMenu';

function NoteCard({ note, selectedMenu, setSelectedMenu, setModal, loadNotes, allCategories }) {
    const { title, content, categories } = note;
    
    return (
        <div className='w-64 p-2 bg-white flex flex-col gap-1 shadow rounded relative'>
            <div className='flex items-center gap-2'>
                <h2 className='px-2 text-xl font-medium text-ellipsis text-nowrap overflow-hidden grow'>
                    { title }
                </h2>
                
                <button
                    onClick={() => setSelectedMenu(note.id === selectedMenu ? null : note.id)}
                    className='p-1 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors'
                >
                    <SlOptionsVertical className='w-4 h-4'/>
                </button>
            </div>

            <p className='p-2 text-sm break-all'>{ content }</p>

            <div className='text-sm flex gap-1 flex-wrap'>
                <span className='font-medium'>Categories:</span>

                {
                    categories.length ? (
                        categories.map(category => <span key={category.id} className='px-2 rounded-full text-sm bg-gray-200 border'>{ category.name }</span>)
                    ) : (
                        <span>None</span>
                    )
                }
            </div>

            {
                note.id === selectedMenu && (
                    <NoteContextMenu
                        note={note}
                        setSelectedMenu={setSelectedMenu}
                        setModal={setModal}
                        loadNotes={loadNotes}
                        allCategories={allCategories}
                    />
                )
            }
        </div>
    );
}

export default NoteCard;