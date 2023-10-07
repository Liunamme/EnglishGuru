import React from 'react';
import style from './InputWords.module.scss';
import Form from './Form/Form';
const InputWords = () => {

  return (
    <div className={style.inputWords}>
      <div className={`${style.inputWords_container} wrapper`}>
        <Form/>
      </div>
    </div>
  );
};

export default InputWords;