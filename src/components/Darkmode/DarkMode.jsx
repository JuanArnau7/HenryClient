import { useEffect, dispatch } from "react"

const DarkMode = () => {

    const dark = localStorage.getItem("theme")

    useEffect(() => {
		if(dark){
			async function darkTheme(){
                document.documentElement.classList.add('dark')
			}
			darkTheme()
		}
	}, [dispatch, dark])
	



    const changeMode = () => {
    if(!localStorage.theme){
        darkActivated()
    } else {
        darkDisabled()
    }
    }
    
    const darkActivated = () => {
        localStorage.setItem('theme', 'dark');
        document.documentElement.classList.add('dark');
    }

    const darkDisabled = () => {
        localStorage.removeItem('theme');
        document.documentElement.classList.remove('dark');
    }

    return(
        <div className="p-1">
        <button 
        type="button" 
        className=" text-black focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2 text-center mr-2 mb-2  dark:text-white dark:bg-gray-800 dark:hover:text-black dark:hover:bg-white dark:focus:ring-black-800"
        onClick={changeMode}>
            Dark Mode
        </button>
        </div>
    )
}


export default DarkMode;

    
