function CategoryFilter({ allCategories, filters, setFilters }) {
    const handleOnChange = (event) => {
        const { id } = event.target;

        if (id !== 'all')
            setFilters({
                ...filters,
                [id]: !filters[id]
            });
        else
            setFilters(
                allCategories.reduce((acc, category) => {
                    return {
                        ...acc,
                        [category.id]: !Object.values(filters).every(_ => _)
                    }
                }, {})
            );
    }

    return (
        <div className='px-4 py-2 bg-gray-100 flex gap-x-4 gap-y-2 flex-wrap'>
            <span className='font-semibold'>Categories:</span>

            <label className='flex items-center gap-1'>
                <input
                    type='checkbox'
                    id='all'
                    checked={Object.values(filters).every(_ => _)}
                    onChange={handleOnChange}
                />

                <span>All</span>
            </label>

            {
                allCategories.map(category => (
                    <label key={category.id} className='flex items-center gap-1'>
                        <input
                            type='checkbox' 
                            id={category.id}
                            checked={filters[category.id]}
                            onChange={handleOnChange}
                        />

                        <span>{ category.name }</span>
                    </label>
                ))
            }
        </div>
    );
}

export default CategoryFilter;