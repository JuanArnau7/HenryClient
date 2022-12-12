import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { filtrar, getAllDishes } from "../../../redux/Actions/actions"

const FiltroCategoria = () => {
  const dispatch = useDispatch()
  const dishes = useSelector(state=> state.allDishes)
  const [Categorias, setCategorias] = useState([])

  const categorias = [
    {
      name: "Desayunos"
    },
    {
      name: "Smoothies"
    },
    {
      name: "Te"
    },
    {
      name: "Parrillada"
    },

    {
      name: "Postres"
    },

    {
      name: "Acompañamientos"
    },
    {
      name: "Bebidas"
    },
    {
      name: "Sopas"
    }

  ]

  
  const handleChange = (e) => {
    e.preventDefault()
    if (e.target.value === "All") {
      dispatch(getAllDishes())
    } else {
      let actualizar = dispatch(getAllDishes())
      if (actualizar) {
        dispatch(filtrar(dishes.filter(d => {
          if (d.lenguage.es.type.includes(e.target.value)) return d
        })))
      }
      }
  }

  useEffect(() => {
    setCategorias(categorias)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dishes]);
  
    return(
      <>
      <label onClick={()=> console.log("dishes", dishes)}>aa</label>
        <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChange}>
          <option value={''}>Optionss</option>
          <option value={'All'}>All</option>
          {Categorias?
          Categorias.map((c, index)=>{
             return (
               <option key ={index} value={c.name}>{c.name}</option>

             )
          })
        :
        <></>}
        </select>
      </>
    )
  }
  
  export default FiltroCategoria