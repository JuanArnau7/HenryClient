import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { postDishCreate } from '../../redux/Actions/actions'
import NavBarCreateFoods from './components/NavBarCreateFoods'
import "./CreateFood.css"

const CreateFood = props => {
    const dispatch = useDispatch()
    const [Form, setForm] = useState({
      "adminid": {
        "_id": "638b0101aff092a52beda5a5",
        "name": "kossito"
      },
      "img": "",
      "price" : 0,
      "lenguage": {
        es: {
          name: "",
          descripcion: "",
          type : ""
        },
        en: {
            name: "",
            descripcion: "",
            type: ""
        },
      },
    })
    const [InglesCompletado, setInglesCompletado] = useState(false)
    const validar = () => {
      if (!Form.lenguage.es.name) {
        return false
      }
      if (!Form.lenguage.en.name) {
        return false
      }
      if (!Form.lenguage.es.descripcion) {
        return false
      }
      if (!Form.lenguage.en.descripcion) {
        return false
      }
      if (!Form.lenguage.es.type) {
        return false
      }
      if (!Form.lenguage.en.type) {
        return false
      }
      if (!Form.img) {
        return false
      }
      if (!Form.price) {
        return false
      }
      return true
    }
    const agregado =()=>{
      Swal.fire({
        title: 'Plato de comida Agregado Correctamente!',
        text: '',
        icon: 'success',
        confirmButtonText: 'OK'
      })
    } 
    const noAgregado =()=>{
      Swal.fire({
        title: 'Error al agregar el Plato de Comida!',
        text: '',
        icon: 'warning',
        confirmButtonText: 'OK'
      })
    } 
    const completar = () => {
      Swal.fire({
        title: 'Complete todos los campos!',
        text: '',
        icon: 'warning',
        confirmButtonText: 'OK'
      })
    }
    const handleNameSpanish=(e)=>{
     setForm({
        ...Form,
         lenguage: {
          ...Form.lenguage,
         es:{
          ...Form.lenguage.es,
          name : e.target.value
         }}
      })
    }
    const handleDescriptionSpanish=(e)=>{
      setForm({
        ...Form,
         lenguage: {
          ...Form.lenguage,
         es:{
          ...Form.lenguage.es,
          descripcion : e.target.value
         }}
      })
    }
    const handleNameEnglish=(e)=>{
      setForm({
        ...Form,
         lenguage: {
          ...Form.lenguage,
         en:{
          ...Form.lenguage.en,
          name : e.target.value
         }}
      })
    }
    const handleDescriptionEnglish=(e)=>{
      setForm({
        ...Form,
         lenguage: {
          ...Form.lenguage,
         en:{
          ...Form.lenguage.en,
          descripcion : e.target.value
         }}
      })
    }
    const handleTypeSpanish=(e)=>{
      setForm({
        ...Form,
         lenguage: {
          ...Form.lenguage,
         es:{
          ...Form.lenguage.es,
          type : e.target.value
         }}
      })
    }
    const handleTypeEnglish=(e)=>{
      setForm({
        ...Form,
         lenguage: {
          ...Form.lenguage,
         en:{
          ...Form.lenguage.en,
          type : e.target.value
         }}
      })
    }
    const handleSubmit = (e) => {
     e.preventDefault()
     console.log(Form)
     if(validar(Form)===true){
       let agg = dispatch(postDishCreate(Form))
       if (agg !== null) {
        agregado()
        reset()
       } else {
        noAgregado()
       }
     } else {
      completar()
     }
    }
    const handleChange = (e) => {
      setForm({
        ...Form,
        [e.target.name]:e.target.value
      })
    }
    const reset = () =>{
      setInglesCompletado(false)
      setForm({
        "adminid": {
          "_id": "638b0101aff092a52beda5a5",
          "name": "kossito"
        },
        "img": "",
        "price" : 0,
        "lenguage": {
          es: {
            name: "",
            descripcion: "",
            type : ""
          },
          en: {
              name: "",
              descripcion: "",
              type: ""
          },
        },
      })
    }
  return (
    <>
    <NavBarCreateFoods/>
<div className="bg-gray-200 flex  items-center justify-center mt-10 sm:mt-0  h-screen content-center Create" >
  <div className=" md:gap-6">
    <div className="mt-5 md:col-span-2 md:mt-0">
      <form onSubmit={handleSubmit} method="POST">
            {!InglesCompletado?
            <>
        <div className="overflow-hidden shadow sm:rounded-md">
          <div className="bg-white px-4 py-5 sm:p-6">
              <div className="flex flex-col mb-8 items-center justify-center">
                <h1 className="font-semibold">Crear Plato de Comida</h1>
                <h4>Ingles</h4>
              </div>
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700">Nombre</label>
                <input onChange={handleNameEnglish} type="text" name="name" id="first-name"  className="mt-1 block w-full rounded-md border-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label  className="block text-sm font-medium text-gray-700">Precio</label>
                <input onChange={handleChange} type="number" name="price" id="last-name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
              </div>
              <div className="col-span-6 sm:col-span-4">
              <div className="justify-items-center">
              <label  className="block text-sm font-medium text-gray-700">Descripcion</label>
              <div className="mt-1">
                <textarea id="about" onChange={handleDescriptionEnglish} name="description" rows="3" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="eg ingredients...."></textarea>
              </div>
            </div>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label  className="block text-sm font-medium text-gray-700">Tipo de Plato</label>
                <input onChange={handleTypeEnglish} type="text" name="price" id="last-name"  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label  className="block text-sm font-medium text-gray-700">Imagen URL</label>
                <input onChange={handleChange} type="url" name="img" id="last-name"  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
              </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 text-center sm:px-6">
              <button type='button' className="inline-flex justify-center align-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" onClick={()=> setInglesCompletado(true)}>Siguiente</button>
            </div>
            </div>
            </>
            :
            <>
            <div className="overflow-hidden shadow sm:rounded-md">
              <div className="bg-white px-4 py-5 sm:p-6">
                <div className="flex flex-col mb-8 items-center justify-center">
                <h1 className="font-semibold">Crear Plato de Comida</h1>
                <h4>Español</h4>
              </div>
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label  className="block text-sm font-medium text-gray-700">Nombre</label>
                <input onChange={handleNameSpanish} type="text" name="name" id="first-name"  className="mt-1 block w-full rounded-md border-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
              </div>
              <div className="col-span-6 sm:col-span-4">
              <div className="justify-items-center">
              <label  className="block text-sm font-medium text-gray-700">Descripcion</label>
              <div className="mt-1">
                <textarea id="about" onChange={handleDescriptionSpanish} name="description" rows="3" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="eg ingredients...."></textarea>
              </div>
            </div>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label  className="block text-sm font-medium text-gray-700">Tipo de Plato</label>
                <input onChange={handleTypeSpanish} type="text" name="price" id="last-name"  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
              </div>
            </div>

          </div>
          <div className="bg-gray-50 px-4 py-3 text-center sm:px-6">
          <button type="button" className="inline-flex justify-center mr-5 align-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" onClick={()=>setInglesCompletado(false)}>Anterior</button>
            <button type="submit" className="inline-flex justify-center align-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Crear</button>
          </div>
        </div>
            </>
            }
      </form>
    </div>
  </div>
</div>
    </>
  )
}


export default CreateFood