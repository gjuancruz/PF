import React from 'react'
import { Link } from 'react-router-dom'
import style from './Error404.module.css'

const Error404 = () => {
  return (
    <div className={style.page}>
        <div className={style.container}>
            <div className={style.numberContainer}>
            <div className={style.number}>404</div>
            </div>
            <div className={style.text1}>Oops... esta página no está disponible.</div>
            <Link to={'/home'}>
            <button className={style.backButton}>VOLVER A HOME</button>
            </Link>
        </div>
    </div>
  )
}

export default Error404