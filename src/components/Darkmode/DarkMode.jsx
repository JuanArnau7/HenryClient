const DarkMode = () => {
    
    // if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    //     document.documentElement.classList.add('dark');
    // } else {
    //     document.documentElement.classList.remove('dark')
    // }

    const changeMode = () => {
        document.documentElement.classList.toggle('dark')
    }

    return(
        <div className="p-1">
        <button 
        type="button" 
        class=" text-black focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2 text-center mr-2 mb-2  dark:text-white dark:bg-gray-800 dark:hover:text-black dark:hover:bg-white dark:focus:ring-black-800"
        onClick={changeMode}>
            Dark
        </button>
        </div>
    )
}
    

export default DarkMode;

    
