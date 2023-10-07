import React, { useContext, useState } from 'react';
import style from './Answer.module.scss';
import { StoreContext } from '../../../../context/context';

const Answer = ({ currentWord }) => {
  const { lang, testParametres, setTestParametres } = useContext(StoreContext);

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAnswerClick = () => {
    if (testParametres.dataWords.length || testParametres.skipWords.length || Object.keys(currentWord).length !== 0) {
      // Преобразуем текущее слово в нижний регистр для сравнения
      const currentWordInLowercase = {
        eng: currentWord.eng.map(word => word.toLowerCase()),
        rus: currentWord.rus.map(word => word.toLowerCase()),
      };

      // Проверяем, есть ли введенное значение в массивах текущего слова
      const isCorrect =
        (lang === 'rus' && currentWordInLowercase.eng.includes(inputValue.toLowerCase())) ||
        (lang === 'eng' && currentWordInLowercase.rus.includes(inputValue.toLowerCase()));

      // Создаем объект updatedCurrentWord с ключом inputWord
      const updatedCurrentWord = {
        ...currentWord,
        inputWord: inputValue,
      };

      // Обновляем testParametres в зависимости от результата
      if (isCorrect) {
        setTestParametres((prevState) => ({
          ...prevState,
          trueWords: [...prevState.trueWords, updatedCurrentWord],
        }));
      } else {
        setTestParametres((prevState) => ({
          ...prevState,
          falseWords: [...prevState.falseWords, updatedCurrentWord],
        }));
      }

      // Очищаем значение ввода
      setInputValue('');
    }
  };

  const handleSkipWordClick = () => {
    if (Object.keys(currentWord).length !== 0 && testParametres.dataWords.length) {
      setTestParametres((prevState) => ({
        ...prevState,
        skipWords: [...prevState.skipWords, currentWord],
      }));
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      // Вызвать handleAnswerClick() при нажатии Enter
      handleAnswerClick();
    } else if (event.ctrlKey && event.key === 'Control') {
      // Вызвать handleSkipWordClick() при нажатии Ctrl
      handleSkipWordClick();
    }
  };



  return (
    <div className={style.testSection_answer}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <div className={style.testSection_answer_btns}>
        <button className={style.testSection_answer_btns_skipBtn} onClick={handleSkipWordClick}>Пропустить слово</button>
        <button className={style.testSection_answer_btns_answerBtn} onClick={handleAnswerClick}>Ответить</button>
      </div>
    </div>
  );
};

export default Answer;