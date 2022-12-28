import React from 'react'

const SelectorCalificacionReview = ({setCalificacion}) => {
    const handleChange = (e) =>{
        setCalificacion(e.targte.value)
    }
  return (
    <>
    <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Qualification</label>
        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChange}>
        <option value={''}>Choose a option</option>
        <option value={'EXCELENTE'}>Excellent</option>
        <option value={'MUY BUENO'}>Very Good</option>
        <option value={'BUENO'}>Good</option>
        <option value={'REGULAR'}>Regular</option>
        <option value={'INSUFUCIENTE'}>Insufficient</option>
        </select>
    </>
  )
}


export default SelectorCalificacionReview