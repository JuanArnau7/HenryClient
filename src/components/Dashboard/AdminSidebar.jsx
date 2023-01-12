import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
// import { SidebarData } from "./SidebarData";
import { FaStoreAlt } from "react-icons/fa";
import "./AdminSidebar.css"
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";


const AdminSidebar = ({ sidebar, handlerSidebar }) => {
  const user = useSelector(state => state.userProfile)
  const navigate = useNavigate()
  const [Visible, setVisible] = useState(false)
  return (
    <>

      <div className="min-h-full w-screen">
        <nav className="bg-gray-800 w-full">
          <div className="mx-auto  px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <Link to='/' >
                <span className="flex items-center">
                  <span className="text-lg md:text-xl -ml-4 text-white font-semibold whitespace-nowrap dark:text-white">Henry's Foods</span>
                </span>
                </Link>
                <Link to={'/local/alterHome'}
                  className="hover:border hover:border-white rounded-lg pl-1">
                  <span className="sr-only">Go to all dishes</span>
                  <FaStoreAlt className="text-white text-xl md:text-3xl" />
                </Link>

                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
                    <NavLink to={'/dashboard/'} className={({isActive}) => isActive ? "bg-gray-900 shadow-sm shadow-slate-400 text-white px-5 py-2 rounded-md text-sm font-bold" : "text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"}>
                      Home
                    </NavLink>
                    <NavLink to={'/dashboard/Foods'} className={({isActive}) => isActive ? "bg-gray-900 shadow-sm shadow-slate-400 text-white px-5 py-2 rounded-md text-sm font-bold" : "text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"}>
                      Foods
                    </NavLink>
                    <NavLink to={'/dashboard/Users'} className={({isActive}) => isActive ? "bg-gray-900 shadow-sm shadow-slate-400 text-white px-5 py-2 rounded-md text-sm font-bold" : "text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"}>
											Users
                    </NavLink>
                    <NavLink to={'/dashboard/Reviews'} className={({isActive}) => isActive ? "bg-gray-900 shadow-sm shadow-slate-400 text-white px-5 py-2 rounded-md text-sm font-bold" : "text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"}>
											Reviews
                    </NavLink>
                    <NavLink to={'/dashboard/Tags'} className={({isActive}) => isActive ? "bg-gray-900 shadow-sm shadow-slate-400 text-white px-5 py-2 rounded-md text-sm font-bold" : "text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"}>
											Tags
                    </NavLink>
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">

                  {/* <!-- Profile dropdown --> */}
                  <div className="relative ml-3">
                    <div>
                    <button type="button" className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" >

                        <span className="sr-only">Visible user menu</span>
                        {user.img?
                            <>
                            <img src={user.img}
                            alt="not found"
                              className="  w-10 h-10 text-white dark:text-black  cursor-pointer rounded-full"
                              onClick={() => navigate('/perfil')} />
                            </>
                          :
                          <FaUserCircle
                          className="text-2xl md:text-4xl text-white dark:text-black pt-1 cursor-pointer"
                          onClick={() => navigate('/perfil')} />
                        }
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="-mr-2 flex md-hidden">
                {/* <!-- Mobile menu button --> */}
                  <button type="button" className=" md:hidden inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" onClick={()=>Visible?setVisible(false):setVisible(true)}>
                  <span className="sr-only">Visible main menu</span>
                {/* <!--
              Heroicon name: outline/bars-3
              Menu open: "hidden", Menu closed: "block"
            --> */}

            <svg className=" h-6 w-6 md:hidden" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
                  {/* <!--
              Heroicon name: outline/x-mark
              Menu open: "block", Menu closed: "hidden"
            --> */}
            
                  <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* <!-- Mobile menu, show/hide based on menu state. --> */}
          <div className={Visible? `md:block sm:block` : `md:hidden sm:hidden`}>
            <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3 flex items-center justify-center">
              {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
              <Link to={'/dashboard/'}>
                <span className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium" >Home </span>
              </Link>
              <Link to={'/dashboard/Foods'}>
                <span className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Foods</span>
              </Link>
              <Link to={'/dashboard/Users'}>
                <span className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Users</span>
              </Link>
              <Link to={'/dashboard/Reviews'}>
                <span className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Reviews</span>
              </Link>
              <Link to={'/dashboard/Tags'}>
                <span className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Tags</span>
              </Link>
            </div>
          </div>
        </nav>

        {/* <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          </div>
        </header> */}
        {/* <main>
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
              <div className="px-4 py-6 sm:px-0">
                <div className="h-96 rounded-lg border-4 border-dashed border-gray-200"></div>
              </div>
            </div>
          </main> */}
      </div>

    </>
  )
}

export default AdminSidebar