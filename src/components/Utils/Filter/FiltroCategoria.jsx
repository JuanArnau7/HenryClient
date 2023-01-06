import React from "react";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { filtrar, getAllDishes, getFilterDishes } from "../../../redux/Actions/actions"

const FiltroCategoria = () => {
  const dispatch = useDispatch()
  const dishes = useSelector(state=> state.allDishes)
  const tags = useSelector(state=>state.allTags)

  const filtrados = useSelector(state=>state.filterDishes)
  const [Country, setCountry] = useState(false)
  const [Food, setFood] = useState(false)
  const [Fit, setFit] = useState(false)

  const handleSubmit = (e) => {
    // e.preventDefault()
    dispatch(getFilterDishes())
  }
  const handleChangeCountry = (e) => {
    dispatch(getAllDishes())
    if (e.target.value === "All") {
      dispatch(getFilterDishes())
    } else {
      dispatch(filtrar(filtrados.filter(d => {
        if (d.tags.en?.includes(e.target.value)) return d
      })))
    }
  }
  const handleChangeFood = (e) => {
    dispatch(getAllDishes())
    if (e.target.value === "All") {
      dispatch(getFilterDishes())
    } else {
      dispatch(filtrar(filtrados.filter(d => {
        if (d.tags.en?.includes(e.target.value)) return d
      })))
    }
  }
  const handleChangeFit = (e) => {
    dispatch(getAllDishes())
    if (e.target.value === "All") {
      dispatch(getFilterDishes())
    } else {
      dispatch(filtrar(filtrados.filter(d => {
        if (d.tags.en?.includes(e.target.value)) return d
      })))
    }
  }

  const tagCountry = tags.filter(c => c.type === "country") 
  const tagFood = tags.filter(c => c.type === "food") 
  const tagFit = tags.filter(c => c.type === "fit") 

  useEffect(() => {
    // setCategorias(categorias)
    dispatch(getAllDishes())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[dispatch]);
  
    return(
      <>
      <form className="flex flex-col m-5 gap-2 ">

        <select defaultValue={''} id="country" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChangeCountry}>
          <option value={''}>Options</option>
          <option value={'All'}>All</option>
          {tagCountry?
          tagCountry.map((c, index)=>{
             return (
               <option key ={index} value={c.tagEN}>{c.tagEN}</option>

             )
          })
        :
        <></>}
        </select>
        <select defaultValue={''} id="food" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChangeFood} >
          <option value={''}>Options</option>
          <option value={'All'}>All</option>
          {tagFood?
          tagFood.map((c, index)=>{
             return (
               <option key ={index} value={c.tagEN}>{c.tagEN}</option>

             )
          })
        :
        <></>}
        </select>
        <select defaultValue={''} id="fit" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChangeFit}>
          <option value={''}>Options</option>
          <option value={'All'}>All</option>
          {tagFit?
          tagFit.map((c, index)=>{
             return (
               <option key ={index} value={c.tagEN}>{c.tagEN}</option>

             )
          })
        :
        <></>}
        </select>
        <button onClick={handleSubmit} type="reset" className="bg-blue-600 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">Reset</button>
      </form>
      </>
    )
  }
  
  export default FiltroCategoria