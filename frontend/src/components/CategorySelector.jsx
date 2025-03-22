import { useEffect, useRef, useState } from 'react';
import { IoIosClose } from 'react-icons/io';

function CategorySelector({ categories, setCategories, allCategories }) {
    const [isFocus, setIsFocus] = useState(false)
    const [filteredCategories, setFilteredCategories] = useState([]);
    const ref = useRef(null);

    const handleOnInput = () => {
        setFilteredCategories(
            allCategories
                .filter(category => (
                    !categories.find(c => c.id === category.id) &&
                    category.name.toLowerCase().includes(ref.current.textContent.toLowerCase())
                ))
        )
    };

    useEffect(handleOnInput, [categories]);

    return (
        <div onClick={() => ref.current.focus()}>
            <ul className='w-80 border border-black/25 rounded px-2 py-1 relative flex flex-wrap items-center gap-1 overflow-hidden cursor-text'>
                {
                    categories.map(category => (
                        <li key={category.id} className='pl-1 pr-2 rounded-full text-sm bg-gray-200 border flex items-center'>
                            <IoIosClose 
                                onClick={() => setCategories(
                                    categories.filter(c => c.id !== category.id)
                                )}
                                className='w-5 h-5 hover:text-gray-700 cursor-pointer'
                            />
                            
                            <span>{ category.name }</span>
                        </li>
                    ))
                }

                <li>
                    <span
                        ref={ref}
                        contentEditable
                        onInput={handleOnInput}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        className='outline-0 inline-block'
                    />
                </li>
            </ul>
            
            {
                isFocus && (
                    <ul className='absolute w-80 max-h-32 overflow-y-auto shadow-md'>
                        {
                            filteredCategories
                                .map(category => (
                                    <li
                                        key={category.id}
                                        onMouseDown={() => {
                                            setCategories([
                                                ...categories,
                                                category
                                            ]);
                                            ref.current.textContent = '';
                                        }}
                                        className='bg-white hover:bg-cyan-500 hover:text-white px-4 py-1 cursor-pointer'
                                    >
                                        { category.name }
                                    </li>
                                ))
                        }
                    </ul>
                )
            }
        </div>
    )
}

export default CategorySelector;