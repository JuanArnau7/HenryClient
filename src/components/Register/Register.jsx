import { useState } from "react"
import { useDispatch } from "react-redux"
import { postUserCreate } from "../../redux/Actions/actions"

const Register = () => {
    
  
  const [form, setForm] = useState({
    "fullName" : "",
    "email" : "",
    "country":"",
    "img" : "",
    "passwordV" : "",
  })
  const [pass, setPass] = useState({
    "password": "",
    "repeatPassword" : ""
  })
  const [error, setError] = useState({
    eFullName: '',
    eEmail : '',
    eImg : '',
    ePassword: '',
    eRPassword: ''
  })
  const dispatch = useDispatch()

  const validacionFullName = (input) =>{
    if (input.length < 7){
      return "Full name required min 7 characters"
    }
    if (!input.includes(' ')){
      return "Full name required ' '."
    }
    if (!/^[A-ZÑa-zñáéíóúÁÉÍÓÚ'°,. ]+$/.test(input) && input !== ""){
      return "Only leters "
    }
  }
  const validacionEmail = (input) =>{
    if (!/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(input) && input !== ""){
      return "enter a valid email" 
    }
  }
  const validacionPassword = (input) =>{
    if (input.length<6) {
      return "Password required min 6 characters"
    }
    if (pass.password !== pass.repeatPassword){
      console.log(pass.password)
      console.log(pass.repeatPassword)
      setForm({...form, passwordV:pass.repeatPassword})
      return "Password must match"
    }
  }
  const validacionPasswordR = (input) =>{
    if (input !== pass.repeatPassword){
      // return "Passwords must match 2"
    }
  }

  
  const handleClickSubmit = (e) => {
    e.preventDefault()
    console.log("soy el submit")
    console.log(form)
    dispatch(postUserCreate(form))
  }
  const handleChange = (e) => {
    if(e.target.name === "fullName") setError({...error, eFullName:(validacionFullName(e.target.value))})
    if(e.target.name === "email") setError({...error, eEmail:(validacionEmail(e.target.value))})
    if(e.target.name === "password") setError({...error, ePassword:(validacionPassword(e.target.value))})
    if(e.target.name === "repeatPassword") setError({...error, ePassword:(validacionPassword(e.target.value))})
    
    setForm({
      ...form,
      [e.target.name]:e.target.value
    })
  }

  const handleChangePass = (e) => {
    if(e.target.name === "password") setError({...error, eRPassword:(validacionPassword(e.target.value))}) 
    if(e.target.name === "repeatPassword") setError({...error, eRPassword:(validacionPasswordR(e.target.value))})
    setPass({
      ...pass,
      [e.target.name]:e.target.value
    })
    // if(password === repeatPassword) setForm({...form, passwordV:repeatPassword})
  }
  // const handleClickCountry = (e) => {
  //   setForm({

  //   })
  // }
  const desabilitado = (
    form.country.length &&
    form.email.length &&
    form.fullName.length &&
    form.passwordV.length &&
    !error.eEmail.length &&
    !error.eFullName.length && 
    !error.ePassword.length &&
    !error.eRPassword.length
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
              </div>

              {/* <div className="col-span-6 sm:col-span-3">
                <label for="last-name" className="block text-sm font-medium text-gray-700">Last name</label>
                <input type="text" name="last-name" id="last-name" autoComplete="family-name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
              </div> */}

              <div className="col-span-6 sm:col-span-4">
                <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">Email address</label>
                <input onChange={handleChange} type="text" name="email" id="email-address" autoComplete="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
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
              <div>
                <label>Password</label>
                <br></br>
                <input onChange={handleChangePass} name={"password"} type={"password"}></input>
                <br></br>
                <label>Repeat password</label>
                <br></br>
                <input onChange={handleChangePass} name={"repeatPassword"} type={"password"} ></input>
              </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
          {(desabilitado) ? (
                    <button onClick={handleClickSubmit} type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" >Save</button>) 
                    : 
                    (<button className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 background-color=grey" disabled>Save</button>)
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