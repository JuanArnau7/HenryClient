import React, { useState } from 'react'
import SelectorCalificacionReview from './SelectorCalificacionReview'

const ModalAddReviewDish = ({setModalReviewDish, ModalReviewDish}) => {
    const [Calificacion, setCalificacion] = useState("")
  return (
    <>
    <div id="authentication-modal" tabindex="-1" aria-hidden="true" className={!ModalReviewDish? "fixed  flex justify-center hidden items-center  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 sm:inset-0 h-modal md:h-full sm:h-full  bg-gray-900 bg-opacity-50": "fixed  flex justify-center  items-center  w-full p-4 overflow-x-hidden overflow-y-auto sm:inset-0 sm:h-full md:inset-0 h-modal md:h-full bg-gray-900 bg-opacity-50 "}>
    <div className="relative w-full h-full max-w-md md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" 
            onClick={()=>setModalReviewDish(false)}>
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                <span className="sr-only">Close modal</span>
            </button>
            <div className="px-6 py-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Add Review</h3>
                <form className="space-y-6" action="#">
                    <div>
                        <SelectorCalificacionReview setCalificacion={setCalificacion}/>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                        <textarea name="description" id="description" className="resize-y max-h-96 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required/>
                    </div>
                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </form>
            </div>
        </div>
    </div>
</div> 
    </>
  )
}

export default ModalAddReviewDish