import React from 'react'
import s from '../Landing/Landing.module.css'
import { Link } from 'react-router-dom'




const Landing = () => {
    return (
    <div className={s.contenedor}>
        <h1><u> HENRY </u></h1>
        <p> FOOD RESTAURANT </p>
        <div>
            <Link to="/local/alterHome">
                <button className={s.home}>Home</button>
            </Link>
        </div>
    </div>
    )
}

export default Landing