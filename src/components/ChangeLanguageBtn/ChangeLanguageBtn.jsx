import React, { useContext, useEffect } from 'react'
import style from './ChangeLanguageBtn.module.scss'
import { StoreContext } from '../../context/context';
import rusImg from '/assets/icons/russia.svg'
import engImg from '/assets/icons/usa.svg'

const ChangeLanguageBtn = ( {className} ) => {
    const { lang, setLang } = useContext(StoreContext); // Получение состояний из глобального хранилища
    useEffect(() => {
      localStorage.setItem('lang', lang);
    }, [lang]);
    return (
    <>
      { lang === "eng" 
        ? <img  src={engImg} alt="eng" onClick={() => setLang("rus")} className={`${className} ${style.changeLanguageBtn}`}/> 
        : lang === "rus" 
        ? <img src={rusImg} alt="rus" onClick={() => setLang("eng")} className={`${className} ${style.changeLanguageBtn}`}/> 
        : ''
      }
    </>
    
  )
}

export default ChangeLanguageBtn