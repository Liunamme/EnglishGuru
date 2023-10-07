import React, { useContext, useEffect } from 'react'
import style from './Header.module.scss'
import logo from '/assets/icons/english.svg'
import StartEndTestBtn from '../StartEndTestBtn'
import { AppRouterContext } from '../../context/context'
import ChangeLanguageBtn from '../ChangeLanguageBtn/ChangeLanguageBtn'

const Header = () => {
  const { start } = useContext(AppRouterContext); // Получение состояний из глобального хранилища
  return (
    <header>
        {!start && <ChangeLanguageBtn className={style.changeLanguageBtn}/>}
        <h1><img src={logo} alt=" " />English Guru</h1>
        {start && <StartEndTestBtn type='end' value='Завершить тест' link='/start' className={style.startEndBtn}/>}
        {!start && <StartEndTestBtn type='start' value='Начать тест' link='/test' className={style.startEndBtn}/>}
    </header>
  )
}

export default Header