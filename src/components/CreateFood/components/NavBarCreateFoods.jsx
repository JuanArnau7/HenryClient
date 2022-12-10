import React from 'react';
const NavBarCreateFoods = props => {

    const irAtras = () => {
    alert("esto va a tener la funcion de ir a atras")
    }
  return (
    <>
    <nav class="bg-gray-800">
  <div class="mx-auto w-screen px-2 sm:px-6 lg:px-8">
    <div class="relative flex h-16 items-center justify-between">
      <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
        <div class="hidden sm:ml-6 sm:block">
          <div class="flex space-x-4" onClick={()=>irAtras()}>
            <a href="#" class="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium" aria-current="page">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            </a>
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