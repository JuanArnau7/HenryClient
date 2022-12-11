import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { postUserCreate } from "../../redux/Actions/actions"
import { useNavigate } from 'react-router-dom'
import Swal from "sweetalert2";

const Register = () => {
    
  
  const [form, setForm] = useState({
    "fullName" : "",
    "email" : "",
    "country":"",
    "img" : "",
    "password" : "",
  })
  const [pass, setPass] = useState({
    "passwordV": "",
    "repeatPassword" : ""
  })
  const [error, setError] = useState({
    eFullName : '',
    eEmail : '',
    eImg : '',
    ePassword : ''
  })
  
  const validacionFullName = (input) =>{
    if (input.length < 7){
      return "Full name required min 7 characters"
    }
    if (!input.includes(' ')){
      return "Full name required at least one space."
    }
    if (!/^[A-ZÑa-zñáéíóúÁÉÍÓÚ'°,. ]+$/.test(input) && input !== ""){
      return "Only leters "
    }
    return ''
  }
  const validacionEmail = (input) =>{
    if (!/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(input) && input !== ""){
      return "enter a valid email" 
    }
    return ''
  }
  const validacionPassword = (input) =>{
    if (pass.passwordV.length < 6) {
      return "Password required min 6 characters"
    }
    if (pass.passwordV !== pass.repeatPassword){
      setForm({...form, password:""})
      return "Password must match"
    }else {
      setForm({...form, password:pass.repeatPassword})
    }
    return ''
  }
  
  useEffect(() => {
    setError({...error, ePassword:validacionPassword(pass)})
  },[pass])
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const errorConection = () => {
    Swal.fire({
      title: "Error to connect to server",
      text: "",
      icon: "warning",
      confirmButtonText: "OK",
    });
  };
  const errorRepeat = () => {
    Swal.fire({
      title: "Existing user",
      text: "",
      icon: "warning",
      confirmButtonText: "OK",
    });
  };
  const handleClickSubmit = async (e) => {
    e.preventDefault()
    var creacion = await dispatch(postUserCreate(form))
    // console.log(creacion)
    if (creacion?.status === 200){
      navigate("/login")
    }
    if (creacion?.status === 400){
      errorRepeat()
    } 
    else{
      errorConection()
    }
  }
  
  const handleChange = (e) => {
    if(e.target.name === "fullName") setError({...error, eFullName:(validacionFullName(e.target.value))})
    if(e.target.name === "email") setError({...error, eEmail:(validacionEmail(e.target.value))})
    if(e.target.name === "passwordV") setError({...error, ePassword:(validacionPassword(e.target.value))})
    if(e.target.name === "repeatPassword") setError({...error, ePassword:(validacionPassword(e.target.value))})
    
    setForm({
      ...form,
      [e.target.name]:e.target.value
    })
  }

  const handleChangePass = (e) => {
    if(e.target.name === "passwordV") setError({...error, eRPassword:(validacionPassword(e.target.value))}) 
    if(e.target.name === "repeatPassword") setError({...error, eRPassword:(validacionPassword(e.target.value))})
    setPass({
      ...pass,
      [e.target.name]:e.target.value
    })
  }

  const desabilitado = (
    form.country.length &&
    form.email.length &&
    form.fullName.length &&
    form.password.length 
    &&
    !error.eFullName.length && 
    !error.eEmail.length &&
    !error.ePassword.length 
  )

  return(
      <>
            <div className="mt-10 sm:mt-0">
  <div className="md:grid md:grid-cols-3 md:gap-6">
    <div className="md:col-span-1">
      <div className="px-4 sm:px-0">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Create User form</h3>
      </div>
    </div>
    <div className="mt-5 md:col-span-2 md:mt-0">
      <form action="#" method="POST">
        <div className="overflow-hidden shadow sm:rounded-md">
          <div className="bg-white px-4 py-5 sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">Full name</label>
                <input onChange={handleChange} type="text" name="fullName" id="first-name" autoComplete="given-name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
                <p>{error.eFullName}</p>
              </div>

              {/* <div className="col-span-6 sm:col-span-3">
                <label for="last-name" className="block text-sm font-medium text-gray-700">Last name</label>
                <input type="text" name="last-name" id="last-name" autoComplete="family-name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
              </div> */}

              <div className="col-span-6 sm:col-span-4">
                <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">Email address</label>
                <input onChange={handleChange} type="text" name="email" id="email-address" autoComplete="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
                <p>{error.eEmail}</p>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                <select onChange={handleChange} id="country" name="country" autoComplete="country-name" className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                  <option value="Argentina">Argentina</option>
                  <option value="Mexico">Mexico</option>
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="Peru">Peru</option>
                  <option value="Paraguay">Paraguay</option>
                  <option value="Bolivia">Bolivia</option>
                  <option value="Uruguay">Uruguay</option>
                  <option value="Ecuador">Ecuador</option>
                </select>
              </div>
              <div>

              {/* <div className="col-span-6">
                <label for="street-address" className="block text-sm font-medium text-gray-700">Street address</label>
                <input type="text" name="street-address" id="street-address" autoComplete="street-address" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
              </div>

              <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                <label for="city" className="block text-sm font-medium text-gray-700">City</label>
                <input type="text" name="city" id="city" autoComplete="address-level2" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
              </div>

              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                <label for="region" className="block text-sm font-medium text-gray-700">State / Province</label>
                <input type="text" name="region" id="region" autoComplete="address-level1" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
              </div>

              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                <label for="postal-code" className="block text-sm font-medium text-gray-700">ZIP / Postal code</label>
                <input type="text" name="postal-code" id="postal-code" autoComplete="postal-code" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
              </div> */}
              </div>

            </div>
              <div>
                <label>Password</label>
                <br></br>
                <input onChange={handleChangePass} name={"passwordV"} type={"password"}></input>
                <br></br>
                <label>Repeat password</label>
                <br></br>
                <input onChange={handleChangePass} name={"repeatPassword"} type={"password"} ></input>
                <p>{error.ePassword}</p>
              </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
          {(desabilitado) ? (
                    <button onClick={handleClickSubmit} type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" >Save</button>) 
                    : 
                    (<button className=" inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 " disabled>Save</button>)
                    }
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
      </>
    )
    
  }
  
  export default Register