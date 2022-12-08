import React from 'react'
import s from '../Landing/Landing.module.css'
import { Link } from 'react-router-dom'




const Landing = () => {
  return (
    <div className={s.contenedor}>
        <div>
            <Link to="/local/home">
                <button>Local Home</button>
            </Link>
        </div>
        <div className={s.login}>
            <Link to='/login' >
                <button> Login </button>
            </Link>  
        </div>
        <div className={s.register}>
            <Link to='/register' >
                <button> Register </button>
            </Link>
        </div>
        <div className={s.guest}>
            <Link to='/homeguest' >
                <button> Guest </button>
            </Link>            
        </div>
    </div>
  )
}

export default Landing