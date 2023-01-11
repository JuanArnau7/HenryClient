import React from "react";
import { Link, NavLink } from "react-router-dom";
// import { SidebarData } from "./SidebarData";
import { FaStoreAlt, FaUserCircle } from "react-icons/fa";
import "./AdminSidebar.css"


const AdminSidebar = ({ sidebar, handlerSidebar }) => {
  return (
    <>
      {/* <div className="w-screen">
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <span onClick={() => handlerSidebar()}>Abrir</span>
          </Link>
        </div>
        <div className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items">
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <span onClick={() => handlerSidebar()}>Cerrar</span>
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}><span>{item.title}</span></Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div> */}

      <div className="min-h-full">
        <nav className="bg-gray-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {/* <img className="h-8 w-8" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" /> */}
                </div>
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
                    <NavLink to={'/dashboard/Home'} className={({isActive}) => isActive ? "bg-gray-900 shadow-sm shadow-slate-400 text-white px-5 py-2 rounded-md text-sm font-bold" : "text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"}>
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
                  <button type="button" className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="sr-only">View notifications</span>
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                    </svg>
                  </button>

                  {/* <!-- Profile dropdown --> */}
                  <div className="relative ml-3">
                    <div>
                      <button type="button" className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                        <span className="sr-only">Open user menu</span>
                        <FaUserCircle
                            className="text-2xl md:text-4xl text-white dark:text-black pt-1 cursor-pointer"
                             />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                {/* <!-- Mobile menu button --> */}
                  <button type="button" className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" aria-controls="mobile-menu" aria-expanded="false">
                  <span className="sr-only">Open main menu</span>
                {/* <!--
              Heroicon name: outline/bars-3
              Menu open: "hidden", Menu closed: "block"
            --> */}

            <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
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
          <div className="md:hidden" id="mobile-menu">
            <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
              {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
              <Link to={'/dashboard/'}>
                <span className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium" aria-current="page" >Home </span>
              </Link>
              <Link to={'/dashboard/Foods'}>
                <span className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Foods</span>
              </Link>
              <Link to={'/dashboard/Users'}>
                <span className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Users</span>
              </Link>
              <Link to={'/dashboard/reviews'}>
                <span className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Reviews</span>
              </Link>
              <Link to={'/dashboard/tags'}>
                <span className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Tags</span>
              </Link>
            </div>
            <div className="border-t border-gray-700 pt-4 pb-3">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <img className="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium leading-none text-white">Tom Cook</div>
                  <div className="text-sm font-medium leading-none text-gray-400">tom@example.com</div>
                </div>
                <button type="button" className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="sr-only">View notifications</span>
                  {/* <!-- Heroicon name: outline/bell --> */}
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                  </svg>
                </button>
              </div>
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