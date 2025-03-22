import DeleteNoteModal from './modals/DeleteNoteModal';
import UpdateNoteModal from './modals/UpdateNoteModal';

function NoteContextMenu({ note, setSelectedMenu, setModal, loadNotes, allCategories }) {
    const handleOnArchive = () => {
        setSelectedMenu(null);
        
        fetch(`${import.meta.env.VITE_API_URL}/notes/archive/${note.id}`, { method: 'PUT' })
            .then(res => {
                if (!res.ok)
                    throw new Error('Something went wrong!');
                
                setModal(null);
                loadNotes();
            })
    }

    return (
        <ul className='w-20 flex flex-col bg-white text-sm absolute right-2 top-8 z-10 shadow-lg border border-black/25 rounded'>
            {
                note.isArchived ? (
                    <>
                        <li
                            onClick={handleOnArchive}
                            className='px-2 py-1 rounded hover:bg-gray-100 transition-colors cursor-pointer'
                        >
                            Unarchive
                        </li>
                    </>
                ) : (
                    <>
                        <li
                            onClick={() => {
                                setSelectedMenu(null);
                                setModal(
                                    <UpdateNoteModal
                                        note={note}
                                        setModal={setModal}
                                        loadNotes={loadNotes}
                                        allCategories={allCategories}
                                    />
                                )
                            }}
                            className='px-2 py-1 rounded hover:bg-gray-100 transition-colors cursor-pointer'
                        >
                            Edit
                        </li>

                        <li
                            onClick={handleOnArchive}
                            className='px-2 py-1 rounded hover:bg-gray-100 transition-colors cursor-pointer'
                        >
                            Archive
                        </li>

                        <li
                            onClick={() => {
                                setSelectedMenu(null);
                                setModal(
                                    <DeleteNoteModal
                                        note={note}
                                        setModal={setModal}
                                        loadNotes={loadNotes}
                                    />
                                )
                            }}
                            className='px-2 py-1 rounded hover:bg-gray-100 transition-colors cursor-pointer'
                        >
                            Delete
                        </li>
                    </>
                )
            }
        </ul>
    );
}

export default NoteContextMenu;