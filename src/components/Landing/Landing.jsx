import React from 'react'
import img from '../Landing/img/restaurant.jpg'
import img1 from '../Landing/img/ratatouille.jpg'
import styles from '../Landing/Landing.module.css'
import { Link } from 'react-router-dom'




const Landing = () => {
  return (
    <>
      <div className={styles.background}>
      <div className={styles.img}>
        <img src={img} alt="LandingPage" />
      </div>

        <div className={styles.contTile}>

          <div className={styles.CardTitle}>
            <div className={styles.Title}>Welcome</div>
            <div className={styles.parrafo}>
              
            </div>
            <Link to="/home">
              <button className={styles.button}>Let's go !</button>
            </Link>
          </div>
            <div className={styles.Title}> Henry Food Restaurant!</div>

        </div>

        <div className={styles.contGlobo}>
          <div className={styles.contimg}>
          <div className={styles.img1}>
            <img src={img1} alt="LandingPage" />
          </div>

          </div>
        </div>

      </div>
    </>
  )
}

export default Landing