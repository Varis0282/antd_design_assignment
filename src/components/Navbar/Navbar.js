const Navbar = ({ data, search, setSearch, handleSearchChange }) => {

    return (
        <div className='flex flex-row justify-between bg-black min-h-[70px] items-center'>
            <p className='pl-2 justify-end w-[230px] px-1 f'></p>
            <p className='text-2xl font-bold text-white justify-center items-center'>Scizers Technologies LLP Front-End Developer project</p>
            <p className='pr-2 justify-end'>
                <input
                    type="text"
                    placeholder='Search...'
                    value={search}
                    onChange={(e) => { handleSearchChange(e) }}
                    className='rounded h-[42px] w-[230px] px-1 focus:border-0 focus:ring-0 focus:outline-none'
                />
            </p>
        </div>
    )
}

export default Navbar
