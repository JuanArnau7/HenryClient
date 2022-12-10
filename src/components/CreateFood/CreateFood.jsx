import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { postDishCreate } from '../../redux/Actions/actions'
import "./CreateFood.css"

const CreateFood = props => {
    const dispatch = useDispatch()
    const [Form, setForm] = useState({
      "name" : "",
      "type" : "",
      "description":"",
      "img" : "imagen.com",
      "price" : "",
    })
    // const [error, setError] = useState({
    //   eName: '',
    //   eType : '',
    //   eDescription : '',
    //   eImg : '',
    //   ePrice: '',
    // })
    const validar = () => {
      if (!Form.name) {
        return false
      }
      if (!Form.type) {
        return false
      }
      if (!Form.description) {
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
    
    const handleSubmit = (e) => {
     e.preventDefault()
     if(validar(Form)===true){
       let agg = dispatch(postDishCreate(Form))
       if (agg !== null) {
        agregado()
        setForm({
          "name" : "",
          "type" : "",
          "description":"",
          "img" : "imagen.com",
          "price" : "",
        })
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
  return (
    <>
<div class="bg-gray-200 flex  items-center justify-center mt-10 sm:mt-0  h-screen content-center Create" >
  <div class=" md:gap-6">
    <div class="mt-5 md:col-span-2 md:mt-0">
      <form onSubmit={handleSubmit} method="POST">
        <div class="overflow-hidden shadow sm:rounded-md">
          <div class="bg-white px-4 py-5 sm:p-6">
          <div class="flex mb-8 items-center justify-center">
                <h1 class="font-semibold">Crear Plato de Comida</h1>
              </div>
            <div class="grid grid-cols-6 gap-6">
              <div class="col-span-6 sm:col-span-3">
                <label for="first-name" class="block text-sm font-medium text-gray-700">Nombre</label>
                <input onChange={handleChange} type="text" name="name" id="first-name" autocomplete="given-name" class="mt-1 block w-full rounded-md border-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
              </div>

              <div class="col-span-6 sm:col-span-3">
                <label for="last-name" class="block text-sm font-medium text-gray-700">Precio</label>
                <input onChange={handleChange} type="number" name="price" id="last-name" autocomplete="family-name" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
              </div>
              <div class="col-span-6 sm:col-span-4">
              <div class="justify-items-center">
              <label for="about" class="block text-sm font-medium text-gray-700">Descripcion</label>
              <div class="mt-1">
                <textarea id="about" onChange={handleChange} name="description" rows="3" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="eg ingredients...."></textarea>
              </div>
            </div>
              </div>

              <div class="col-span-6 sm:col-span-3">
                <label for="country" class="block text-sm font-medium text-gray-700">Tipo de Dieta</label>
                <select id="country" name="type" onChange={handleChange} class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                  <option>Options...</option>
                  <option value={"Vegana"}>Vegana</option>
                  <option value={"Vegetariana"}>Vegetariana</option>
                  <option value={"Carnivora"}>Carnivora</option>
                  <option value={"Omnivora"}>Omnivora</option>
                  <option value={"Celiaca"}>Celiaca</option>
                </select>
              </div>
              {/* <div class="col-span-6 sm:col-span-3">
                <label for="country" class="block text-sm font-medium text-gray-700">Tipo de Plato</label>
                <select id="country" name="country" autocomplete="country-name" class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                  <option>Options...</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                  <option>Mexico</option>
                  <option>Mexico</option>
                </select>
              </div> */}
              <div class="col-span-6 sm:col-span-3">
                <label for="country" class="block text-sm font-medium text-gray-700">Imagen URL</label>
                <input onChange={handleChange} type="url" name="img" id="last-name" autocomplete="family-name" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 text-center sm:px-6">
            <button type="submit" class="inline-flex justify-center align-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Crear</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
    </>
  )
}


export default CreateFood