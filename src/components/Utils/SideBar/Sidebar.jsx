import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom"
import Swal from 'sweetalert2';
import { logOut } from '../../../redux/Actions/actions';
import FiltroCategoria from '../Filter/FiltroCategoria';
import FiltroPrecios from '../Filter/FiltroPrecios';
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { FaSignInAlt } from 'react-icons/fa';
import { FiFilter } from 'react-icons/fi';
import { TbArrowsSort } from 'react-icons/tb';
import { CgProfile } from 'react-icons/cg';
import { BsCart4 } from 'react-icons/bs';
import { BiMoon } from 'react-icons/bi';
import { ImSun } from 'react-icons/im';



const Sidebar = ({pathname, userId}) => { 
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const [open, setOpen] = useState(false);
   const [Filtros, setFiltros] = useState(false)
   const [Sorts, setSorts] = useState(false)
   
   
   //-------------------------------- LOGICA DARKMODE ---------------------------//

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

   //-------------------------------- LOGICA DARKMODE ---------------------------//



   const handleLogOut = async () => {
		const confirm = await Swal.fire({
			title: "Are you sure?",
			text: "Sure you want logout this page?",
			icon: 'question',
			showCancelButton: true
		})
		if (confirm.isConfirmed) {
			dispatch(logOut())
			localStorage.removeItem("token")
			navigate(`/`);
		}
	}

    return (
       <>
         <div className=" top-0 left-25 right-0 transition-all duration-350 dark:text-white" >
            <button className='py-2' onClick={ () => setOpen(true) }>
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
               </svg>
            </button>

            <div className={`${!open && "hidden" } bg-gray-600/50 min-h-screen w-full fixed top-0 left-0 right-0 backdrop-blur-sm` } onClick={ () => (setOpen(false), setFiltros(false), setSorts(false))}></div>


            <div className={` ${open ? 'xl:w-80 lg:w-80 md:w-80 sm:w-screen' : ' xl:w-20 lg:w-20 md:w-20 sm:hidden md:block lg:block xl:block' } bg-green-700 dark:bg-gray-800 min-h-screen  fixed top-0 left-0 transition-all duration-200 dark:text-white`} onMouseOver={()=>setOpen(true)} onMouseLeave={()=>(setOpen(false), setFiltros(false), setSorts(false) )}>
               <div className={`my-3 transition-all duration-300`}>
                     {open?
                     <>
                  <div className='bg-green-700 dark:bg-gray-800 h-12 flex items-center  justify-around transition-all duration-200 dark:text-white'>
                  <button className=' text-black dark:text-white 'onClick={ () => (setOpen(false), setFiltros(false), setSorts(false) )} >
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                     </svg>
                  </button>
                  <span className=" text-xl text-white font-semibold whitespace-nowrap dark:text-white ">Henry's Foods</span>
                  <button className='py-2' onClick={ () => setOpen(open? false : true) }>
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                     </svg>
                  </button>
                     </div>
                     </>
                     :
                     <>
                     <div className='bg-green-700 dark:bg-gray-800 h-12 flex items-center  justify-around transition-all duration-300 dark:text-white'>
           <button className='py-2 ' onClick={ () => setOpen(true) }>
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
               </svg>
            </button>
                  </div>
                     </>
                     }
                  {!userId?
                  <>
                  <div className='bg-white h-screen shadow-lg transition-all duration-300'>
                  <div className='text-center rounded-lg text-black text-xl hover:bg-gray-200 cursor-pointer py-3 mb-2 dark:text-white '>
                     <button  className="text-black  text-xl bg-transparent   font-medium rounded-lg px-4 py-2.5 text-center inline-flex items-center dark:focus:ring-blue-800" type="button" onClick={()=>setFiltros(Filtros? false : true)}>{open? <> <FiFilter className='text-2xl mr-2'/> Filters<svg className="ml-2 w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg></>: <><FiFilter className='text-2xl ml-2'/></>}</button>
                     {Filtros?
                     <FiltroCategoria/>
                     :
                     <></>
                     }
                  </div>
                  <div className='text-center rounded-lg text-black text-xl hover:bg-gray-200 cursor-pointer py-3 mb-2 dark:text-white'>
                     <button  className="text-black  text-xl bg-transparent   font-medium rounded-lg px-4 py-2.5 text-center inline-flex items-center  dark:focus:ring-blue-800" type="button" onClick={()=>setSorts(Sorts? false : true)}>{open? <><TbArrowsSort className='text-2xl mr-2'/> Sort  <svg className="ml-2 w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg></> : <><TbArrowsSort className='text-2xl ml-2'/></> }</button>
                     {Sorts?
                     <FiltroPrecios/>
                     :
                     <></>
                     }
                  </div>
                  <Link to={"/login"}>
                  <div className='text-center rounded-lg text-black text-xl hover:bg-gray-200 cursor-pointer py-3 mb-2 flex items-center justify-center dark:text-white'>
                  {open?
                  <>
                  <BiLogIn className='text-3xl'/> Log In 
                  </>
                  :
                  <>
                  <BiLogIn className='text-3xl'/> 
                  </>
                  }
                  </div>
                  </Link>
                  <Link to={"/register"}>
                  <div className='text-center rounded-lg text-black text-xl hover:bg-gray-200 cursor-pointer py-3 mb-2 flex items-center justify-center dark:text-white'>
                     {open?
                     <>
                     <FaSignInAlt className='text-2xl mr-2'/> Sing In   
                     </>
                     :
                     <>
                        <FaSignInAlt className='text-2xl'/>
                     </>
                     }
                  </div>
                  </Link>
                  <div className='dark:text-white text-center rounded-lg text-black text-xl hover:bg-gray-200 cursor-pointer py-3 mb-2 font-medium flex items-center justify-center' onClick={changeMode} >
                  { open?
                     <>
                     {
                        localStorage.getItem('theme') === 'dark'?
                        <>
                        <BiMoon className="text-3xl mr-2 " /> DarkMode 
                        </>
                        :
                        <>
                        <ImSun className="text-3xl mr-2 "/> LightMode
                        </>
                     }
                     </>
                     :
                     <>
                     {
                        localStorage.getItem('theme') === 'dark'?
                        <>
                        <BiMoon className="text-3xl "/>
                        </>
                        :
                        <>
                        <ImSun className="text-3xl"/>
                        </>
                     }
                     </>
                     }
                  </div>
                  </div>
                  </>
                  :
                  <>
                  <div className='bg-white dark:bg-gray-800 h-screen shadow-lg transition-all duration-300 dark:text-white'>
                  <div className='text-center text-black text-xl rounded-lg hover:bg-gray-200 cursor-pointer py-3 mb-2 dark:text-white'>
                  <button  className="dark:text-white text-black  text-xl bg-transparent  font-medium rounded-lg px-4 py-2.5 text-center inline-flex items-center  dark:focus:ring-blue-800" type="button" onClick={()=>setFiltros(Filtros? false : true)}>{open? <><FiFilter className='text-2xl mr-2'/> Filters <svg className="ml-2 w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg></>: <><FiFilter className='text-2xl ml-2'/></>}</button>
                     {Filtros?
                     <FiltroCategoria/>
                     :
                     <></>
                     }
                  </div>
                  <div className='text-center rounded-lg text-black text-xl hover:bg-gray-200 cursor-pointer py-3 mb-2 dark:text-white'>
                  <button  className="dark:text-white text-black  text-xl bg-transparent   font-medium rounded-lg px-4 py-2.5 text-center inline-flex items-center  dark:focus:ring-blue-800" type="button" onClick={()=>setSorts(Sorts? false : true)}>{open? <> <TbArrowsSort className='text-2xl mr-2'/> Sort <svg className="ml-2 w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg> </> : <><TbArrowsSort className='text-2xl ml-2'/></> }</button>
                     {Sorts?
                     <FiltroPrecios/>
                     :
                     <></>
                     }
                  </div>
                  <Link to={'/perfil'}>
                  <div className=' dark:text-white text-center rounded-lg text-black text-xl hover:bg-gray-200 cursor-pointer py-3 mb-2 font-medium flex items-center justify-center'>
                     {open?
                     <>
                        <CgProfile className="text-2xl mr-2"/> User Profile 
                     </>
                     :
                     <>
                     <CgProfile className="text-2xl"/>
                     </>
                     }

                  </div>
                  </Link>
                  <Link to={'/cart'}>
                     <div className='dark:text-white text-center rounded-lg text-black text-xl hover:bg-gray-200 cursor-pointer py-3 mb-2 font-medium flex items-center justify-center '>
                       {open?
                       <>
                       <BsCart4 className="text-2xl mr-2 "/> Cart 
                       </>
                       :
                       <>
                        <BsCart4 className="text-2xl "/>
                       </>}
                     </div>
                  </Link>
                  <Link>
                  <div className='dark:text-white text-center rounded-lg text-black text-xl hover:bg-gray-200 cursor-pointer py-3 mb-2 font-medium flex items-center justify-center' onClick={()=>handleLogOut()}>
                     {open?
                     <>
                     <BiLogOut className="text-3xl mr-2 "/> Log Out 
                     </>
                     :
                     <>
                     <BiLogOut className="text-3xl "/>
                     </>
                     }
                  </div>
                  </Link>
                  <div className='dark:text-white text-center rounded-lg text-black text-xl hover:bg-gray-200 cursor-pointer py-3 mb-2 font-medium flex items-center justify-center' onClick={changeMode} >
                     { open?
                     <>
                     {
                        localStorage.getItem('theme') === 'dark'?
                        <>
                        <BiMoon className="text-3xl mr-2 " /> DarkMode 
                        </>
                        :
                        <>
                        <ImSun className="text-3xl mr-2 "/> LightMode
                        </>
                     }
                     </>
                     :
                     <>
                     {
                        localStorage.getItem('theme') === 'dark'?
                        <>
                        <BiMoon className="text-3xl "/>
                        </>
                        :
                        <>
                        <ImSun className="text-3xl"/>
                        </>
                     }
                     </>
                     }

                  </div>
                  </div>
                  </>
                  }
                  
               </div>
            </div>
         </div>
       </>
    )
}

export default Sidebar;