import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom"
import Swal from 'sweetalert2';
import { logOut } from '../../../redux/Actions/actions';


const Sidebar = ({pathname, userId}) => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const [open, setOpen] = useState(false);

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
         <div className=" top-0 left-25 right-0">
            <button className='py-2' onClick={ () => setOpen(true) }>
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
               </svg>
            </button>

            <div className={`${!open && "hidden" } bg-gray-600/50 min-h-screen w-full fixed top-0 left-0 right-0 backdrop-blur-sm` } onClick={ () => setOpen(false) }></div>


            <div className={` ${open ? 'w-80' : 'w-0' } bg-green-700 min-h-screen w-80 fixed top-0 left-0 transition-all duration-300`}>
               <div className={` ${!open && 'hidden' } pt-3`}>
                  <div className='bg-green-700 h-12 flex items-center'>
                  <button className='ml-4 text-black mr-12 ' onClick={ () => setOpen(false) } >
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                     </svg>
                  </button>
                  <span className="self-center text-xl text-white font-semibold whitespace-nowrap dark:text-white">Henry's Foods</span>
                  </div>
                  <div className='bg-white h-screen'>
                  {!userId?
                  <>
                  <Link to='/'>
                  <div className='text-center text-black text-xl hover:bg-gray-600 cursor-pointer py-3 mb-2'>
                     Log In
                  </div>
                  </Link>
                  <Link to='/perfil'>
                  <div className='text-center text-black text-xl hover:bg-gray-600 cursor-pointer py-3 mb-2'>
                     Sing In
                  </div>
                  </Link>
                  </>
                  :
                  <>
                  <div className='text-center text-black text-xl hover:bg-gray-600 cursor-pointer py-3 mb-2'>
                     <button id="dropdownDefault" data-dropdown-toggle="dropdown" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Dropdown button <svg class="ml-2 w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>
                     <div id="dropdown" class="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700">
                        <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefault">
                           <li>
                           <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                           </li>
                           <li>
                           <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                           </li>
                           <li>
                           <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                           </li>
                           <li>
                           <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
                           </li>
                        </ul>
                     </div>
                  </div>
                  <Link to={'/perfil'}>
                  <div className='text-center text-black text-xl hover:bg-gray-600 cursor-pointer py-3 mb-2'>
                     User Profile
                  </div>
                  </Link>
                  <Link to={'/cart'}>
                     <div className='text-center text-black text-xl hover:bg-gray-600 cursor-pointer py-3 mb-2'>
                       Cart 
                     </div>
                  </Link>
                  <Link>
                  <div className='text-center text-black text-xl hover:bg-gray-600 cursor-pointer py-3 mb-2' onClick={()=>handleLogOut()}>
                     Log Out
                  </div>
                  </Link>
                  </>
                  }
                  </div>
                  
               </div>
            </div>

         </div>
       </>
    )
}

export default Sidebar;