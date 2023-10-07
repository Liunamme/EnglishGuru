import React, { useState } from 'react';
import style from './Form.module.scss'
import Excel from './Excel/Excel';
import Spisok from './Spisok/Spisok';
const Form = () => {
    const [selectedOption, setSelectedOption] = useState('#');
        // Обработчик изменения выбранной опции
        const handleOptionChange = (event) => {
            setSelectedOption(event.target.value);
          };
  return (
    <div className={`${style.form} ${selectedOption === 'excel' ? style.excel : selectedOption === 'spisok' ? style.spisok : ''}`}>
    <h1>Загрузка слов</h1>
    <select value={selectedOption} onChange={handleOptionChange}>
      <option value="#" disabled>Выберите способ</option>
      <option value="excel">Через Excel файл</option>
      <option value="spisok">Через текстовое поле</option>
    </select>
    <div className={style.form_parametres}>
      {selectedOption === 'excel' && <Excel/>}
      {selectedOption === 'spisok' && <Spisok/>}
    </div>
  </div>
  )
}

export default Form