import React, { useContext } from 'react'
import style from './Nums.module.scss'
import { StoreContext } from '../../../../context/context';

const Nums = ({ currentWord }) => {
    const { testParametres } = useContext(StoreContext); // Получение состояний из глобального хранилища
  return (
    <div className={style.testSection_nums}>
      <div className={style.testSection_nums_true}>{testParametres.trueWords.length}</div>
      <div className={style.testSection_nums_remaining}>{Object.keys(currentWord).length !== 0 ? testParametres.dataWords.length + testParametres.skipWords.length + 1 : testParametres.dataWords.length + testParametres.skipWords.length}</div>
      <div className={style.testSection_nums_false}>{testParametres.falseWords.length}</div>
    </div>
  )
}

export default Nums