import React from 'react'
import s from '../Landing/Landing.module.css'
import { Link } from 'react-router-dom'




const Landing = () => {
    return (
    <div className={s.contenedor}>
        <h1><u> HENRY </u></h1>
        <p> FOOD RESTAURANT SINCE 1882 </p>
        <div>
            <Link to="/login">
                <button className={s.home} >Home</button>
            </Link>
        </div>
        <div >
            <Link to='/login' >
                {/* <button className={s.login}> Login </button> */}
            </Link>  
        </div>
        <div >
            <Link to='/register' >
                {/* <button className={s.register}> Register </button> */}
            </Link>
        </div>
        <div className={s.guest}>
            <Link to='/homeguest' >
                {/* <button> Guest </button> */}
            </Link>            
        </div>
    </div>
    )
}

export default Landing