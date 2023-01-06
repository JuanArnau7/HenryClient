import React from 'react';
import { Link } from 'react-router-dom';
const NavBarCreateFoods = props => {

  return (
    <>
    <nav className="bg-green-700 px-2 sm:px-4 py-2.5 fixed">
  <div className="mx-auto w-screen px-2 sm:px-6 lg:px-8">
    <div className="relative flex h-16 items-center justify-between">
      <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
        <div className="hidden sm:ml-6 sm:block">
          <div className="flex space-x-4">
            <Link to="/local/alterHome" className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium" aria-current="page">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
</nav>
    </>
  )
}


export default NavBarCreateFoods