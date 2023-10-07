import React, { useContext, useState } from 'react';
import style from './Excel.module.scss'
import ExcelImport from './ExcelImport';
import { StoreContext } from '../../../../context/context';

const Excel = () => {
    const { dataWords } = useContext(StoreContext); // Получение состояний из глобального хранилища
  return (
    <div className={style.form_parametres_excel}>
        <ExcelImport/> 
        <div className={style.form_parametres_excel_description}>
        {dataWords.length === 0 ? <h2>⬆ Загрузите Excel Файл ⬆</h2> : dataWords.length > 0 && <h2>Слова успешно загружены!</h2>}
          <h3>{`Формат: [eng,eng] [rus,rus] [description]`}</h3>
          <h3>{`Примеры:\n[go,walk] [идти]\n[depict] [изображать, описывать]\n[ring] [звонить, звонок] [у двери, школьный]`}</h3>
        </div>
    </div>
  )
}

export default Excel