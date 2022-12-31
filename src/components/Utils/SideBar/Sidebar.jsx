import { useState } from 'react';
import logo from './img/logo.png'


const Sidebar = () => {

   const [open, setOpen] = useState(false);

    return (
       <>
         <div className="py-5  top-0 left-25 right-0 shadow-md">
            <button className='py-7' onClick={ () => setOpen(true) }>
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
               </svg>
            </button>

            <div className={`${!open && "hidden" } bg-gray-600/50 min-h-screen w-full fixed top-0 left-0 right-0 backdrop-blur-sm` } onClick={ () => setOpen(false) }></div>


            <div className={` ${open ? 'w-80' : 'w-0' } bg-green-600 min-h-screen w-80 fixed top-0 left-0 transition-all duration-300`}>
               <div className={` ${!open && 'hidden' } pt-3`}>
                  <button className='ml-4 text-black mb-14' onClick={ () => setOpen(false) }>
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                     </svg>
                  </button>
                  <div className='text-center text-black text-xl hover:bg-gray-600 cursor-pointer py-3 mb-2'>
                     Soporte
                  </div>
                  <div className='text-center text-black text-xl hover:bg-gray-600 cursor-pointer py-3 mb-2'>
                     Cuenta
                  </div>
                  <div className='text-center text-black text-xl hover:bg-gray-600 cursor-pointer py-3 mb-2'>
                     Salir
                  </div>
                  <div className='text-center text-black text-xl hover:bg-gray-600 cursor-pointer py-3 mb-2'>
                     Configuracion
                  </div>
               </div>
            </div>

         </div>
       </>
    )
}

export default Sidebar;