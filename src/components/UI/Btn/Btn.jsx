import React from 'react'
import style from './Btn.module.scss'

const Btn = ( {value, className, onClick} ) => {
  return (
    <input type="button" value={value} onClick={onClick} className={`${style.btn} ${className}`}/>
  )
}

export default Btn