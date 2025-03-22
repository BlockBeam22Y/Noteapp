import NoteCard from './components/NoteCard'
import { FiPlus } from 'react-icons/fi'
import { IoIosClose, IoMdArchive, IoMdArrowBack } from 'react-icons/io'
import { useEffect, useState } from 'react'
import CreateNoteModal from './components/modals/CreateNoteModal'
import CategoryFilter from './components/CategoryFilter'

function App() {
  const [modal, setModal] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [showArchived, setShowArchived] = useState(false);

  const [notes, setNotes] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [filters, setFilters] = useState({})

  const loadNotes = () => {
    fetch(`${import.meta.env.VITE_API_URL}/notes?archived=${showArchived}`)
      .then(res => res.json())
      .then(notes => setNotes(notes))
  };

  useEffect(loadNotes, [showArchived]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/categories`)
      .then(res => res.json())
      .then(allCategories => {
        setAllCategories(allCategories);
        setFilters(
          allCategories.reduce((acc, category) => {
              return {
                  ...acc,
                  [category.id]: true
              }
          }, {})
        );
      })
  }, []);

  return (
    <div className='bg-slate-200 min-h-dvh relative'>
      <div className='w-full h-full p-8 flex flex-col gap-4'>
        <div className='flex items-center justify-between flex-wrap gap-2'>
          <div className='flex items-center flex-wrap gap-4'>
            {
              showArchived && (
                <button
                  onClick={() => setShowArchived(false)}
                  className='hover:bg-gray-100 active:bg-gray-50 transition-colors rounded-full'
                >
                  <IoMdArrowBack className='w-8 h-8 p-1'/>
                </button>
              )
            }

            <h1 className='text-3xl font-bold'>
              { showArchived ? 'Archived Notes' : 'Notes' }
            </h1>
          </div>

          {
            !showArchived && (
              <button
                onClick={() => setShowArchived(true)}
                className='
                  bg-slate-500 text-white transition-colors
                  hover:bg-slate-600 hover:text-gray-100
                  active:bg-slate-400 active:text-white
                  flex items-center gap-2
                  rounded-full px-4 py-2
              '>
                <IoMdArchive className='w-5 h-5'/>
                
                <span className='text-sm font-medium'>Archived</span>
              </button>
            )
          }
        </div>

        <CategoryFilter allCategories={allCategories} filters={filters} setFilters={setFilters} />

        <div className='flex flex-wrap items-start gap-4'>
          {
            notes.length ? (
              notes
                .filter(note => note.categories.some(c => filters[c.id]))
                .map(note => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    selectedMenu={selectedMenu}
                    setSelectedMenu={setSelectedMenu}
                    setModal={setModal}
                    loadNotes={loadNotes}
                    allCategories={allCategories}
                  />
                ))
            ) : (
              <div>
                { showArchived ? 'No archived notes were found' : 'No active notes were found' }
              </div>
            )
          }
        </div>
      </div>
      
      <button
        onClick={() => {
          setSelectedMenu(null);
          setModal(<CreateNoteModal setModal={setModal} loadNotes={loadNotes} allCategories={allCategories} />);
        }}
        className='
        bg-fuchsia-500 text-white transition
        hover:bg-fucshia-600 hover:text-gray-100 hover:scale-110
        active:bg-fuchsia-400 active:text-white
        text-xl font-semibold
        fixed right-8 bottom-8
        flex items-center gap-1
        p-3 rounded-full shadow-md
      '>
        <FiPlus className='w-7 h-7'/>

        <span className='mr-1'>Create</span>
      </button>

      <div className={`w-screen h-screen fixed left-0 top-0 flex justify-center items-center ${modal ? 'bg-gray-200/50' : 'hidden'}`}>
        <div onClick={() => setModal(null)} className='w-full h-full absolute'/>
        
        <div className='px-6 py-4 bg-white rounded-md z-10 relative flex flex-col gap-2'>
          <button
            onClick={() => setModal(null)}
            className='
            absolute -top-3 -right-3 rounded-full
            text-white bg-black transition-colors duration-50
            hover:text-gray-200 hover:bg-red-600
            active:text-gray-100 active:bg-red-500
          '>
            <IoIosClose className='w-6 h-6'/>
          </button>

          { modal }
      </div>
      </div>
    </div>
  )
}

export default App
