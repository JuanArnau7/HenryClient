import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { postReviewDish } from '../../../redux/Actions/actions';
import SelectorCalificacionReview from './SelectorCalificacionReview'

const ModalAddReviewDish = ({setModalReviewDish, ModalReviewDish, DishId}) => {
    const dispatch = useDispatch()
    const [Calificacion, setCalificacion] = useState("");
    const [Description, setDescription] = useState("")
    const [Rating, setRating] = useState({
        s1 : false,
        s2 : false,
        s3 : false,
        s4 : false,
        s5 : false,
    })
    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);


    const handleDescription = (e) => {
        setDescription(e.target.value)
    }
    const agregado =()=>{
        Swal.fire({
          title: 'Thanks for your review!',
          text: '',
          icon: 'success',
          confirmButtonText: 'OK'
        })
      } 
    const noAgregado =()=>{
    Swal.fire({
        title: 'Error creating review!',
        text: '',
        icon: 'error',
        confirmButtonText: 'OK'
    })
    }
    const completar = () => {
        Swal.fire({
          title: 'Fill in all fields!',
          text: '',
          icon: 'warning',
          confirmButtonText: 'OK'
        })
      }    
    const handleSubmit = async (e) => {

        e.preventDefault()
        let review = {
            foods : DishId,
            reviews : Calificacion,
            descriptions : Description,
            score: Rating.s5? 5 : Rating.s4? 4 : Rating.s3? 3 : Rating.s2? 2 : 1,
            reviewsDate: hoy
        }
        let add = await dispatch(postReviewDish(review))
        if (validar() === true) {
            console.log("review", review)
            if (add) {
               agregado()
               reset()
            } else {
                noAgregado()
            }
        } else {
            completar()
        }
    }
    const validar = () => {
        if (!Calificacion || Calificacion === "") {
            return false 
        }
        if (!Description || Description === "") {
            return false
        }
        if (Rating.s1 === false && Rating.s2 === false && Rating.s3 === false && Rating.s4 === false && Rating.s5 === false) {
            return false
        }
        return true
    }
    const reset = () => {
        setCalificacion("");
        setDescription("");
        setRating({
        s1 : false,
        s2 : false,
        s3 : false,
        s4 : false,
        s5 : false,
        });
        setModalReviewDish(false)
    }
  return (
    <>
    <div id="authentication-modal" tabIndex="-1" aria-hidden="true" className={!ModalReviewDish? "fixed  flex justify-center hidden items-center  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 sm:inset-0 h-modal md:h-full sm:h-full  bg-gray-900 bg-opacity-50": "fixed  flex justify-center  items-center  w-full p-4 overflow-x-hidden overflow-y-auto sm:inset-0 sm:h-full md:inset-0 h-modal md:h-full bg-gray-900 bg-opacity-50 "}>
    <div className="relative w-full h-full max-w-md md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" 
            onClick={()=>reset()}>
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                <span className="sr-only">Close modal</span>
            </button>
            <div className="px-6 py-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Add Review</h3>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <SelectorCalificacionReview setCalificacion={setCalificacion}/>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                        <textarea name="description" id="description" className="resize-y max-h-96 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"  value={Description} onChange={handleDescription}/>
                    </div>
                    <div className="flex items-center justify-center mb-5 hover:cursor-pointer">
                    <svg onClick={()=>setRating(Rating.s1? {s1:false} : {s1:true})} className={Rating.s1? "text-yellow-400 w-7 h-7" : "text-gray-300 hover:text-yellow-400 w-7 h-7" } fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                    <svg  onClick={()=>setRating(Rating.s2? {s1: true, s2:false} : {s1:true, s2: true})} className={Rating.s2? "text-yellow-400 w-7 h-7" : "text-gray-300 hover:text-yellow-400 w-7 h-7"} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Second star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                    <svg  onClick={()=>setRating(Rating.s3? {s1:true, s2:true, s3:false} : {s1:true, s2: true, s3:true})} className={Rating.s3?"text-yellow-400 w-7 h-7":"text-gray-300 hover:text-yellow-400 w-7 h-7"} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Third star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                    <svg  onClick={()=>setRating(Rating.s4? {s1:true, s2:true, s3:true, s4:false} : {s1:true, s2: true, s3:true, s4:true})} className={Rating.s4?"text-yellow-400 w-7 h-7":"text-gray-300 hover:text-yellow-400 w-7 h-7"} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fourth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                    <svg
                    onClick={()=>setRating(Rating.s5? {s1:true, s2:true, s3:true, s4:true, s5:false} : {s1:true, s2: true, s3:true, s4:true, s5:true})} 
                    className={Rating.s5?"text-yellow-400 w-7 h-7":"text-gray-300 hover:text-yellow-400 w-7 h-7"} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
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