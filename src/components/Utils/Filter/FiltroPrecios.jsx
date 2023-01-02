import React from "react";
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { filtrar, getAllDishes } from "../../../redux/Actions/actions"

const FiltroPrecios = () => {
  const dispatch = useDispatch()
  const Dishes = useSelector(state => state.filterDishes)

  const handleChange =(e)=>{
    console.log(e.target.value, Dishes)
    if (e.target.value === 'AZ') {
      let arr = Dishes.sort((a, b) => {
          if(a.lenguage.en.name < b.lenguage.en.name) { return -1; }
          if(a.lenguage.en.name > b.lenguage.en.name) { return 1; }
          return 0;
      })
      dispatch(filtrar(arr))
  } else if (e.target.value === 'ZA') {
      let arr = Dishes.sort((a, b) => {
          if(a.lenguage.en.name > b.lenguage.en.name) { return -1; }
          if(a.lenguage.en.name < b.lenguage.en.name) { return 1; }
          return 0;
      })
      dispatch(filtrar(arr))
  }else  if (e.target.value === 'Mayor') {
      let arr = Dishes.sort((a, b) => {
          if(a.price > b.price) { return -1; }
          if(a.price < b.price) { return 1; }
          return 0;
      })
      dispatch(filtrar(arr))
  } else if (e.target.value === 'Menor') {
      let arr = Dishes.sort((a, b) => {
          if(a.price < b.price) { return -1; }
          if(a.price > b.price) { return 1; }
          return 0;
      })
      dispatch(filtrar(arr))
  }else if (e.target.value === 'All'){
      dispatch(getAllDishes())
  }
  }
  useEffect(() => {
    dispatch(getAllDishes())
  }, [dispatch])
  
    return(
      <>
        <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChange}>
          <option value={''}>Options</option>
          <option value={'All'}>All</option>
          <option value={'Mayor'}>Higher at lower cost</option>
          <option value={'Menor'}>Lower to higher cost</option>
          <option value={'AZ'}>A-Z</option>
          <option value={'ZA'}>Z-A</option>
        </select>
      </>
    )
  }
  
  export default FiltroPrecios