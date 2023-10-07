import React, { useContext, useEffect } from 'react';
import style from './Words.module.scss';
import { StoreContext } from '../../../../context/context';

const Words = ({ currentWord, setCurrentWord }) => {
  const { testParametres, setTestParametres, lang, setModalEndTest, endTest, } = useContext(StoreContext);

  const getRandomWord = (arr) => {
    const randomIndex = Math.floor(Math.random() * testParametres[arr].length);
    const randomWord = testParametres[arr][randomIndex];

    const updatedWords = [...testParametres[arr]];
    updatedWords.splice(randomIndex, 1);

    setTestParametres((prevParametres) => ({
      ...prevParametres,
      [arr]: updatedWords,
    }));

    setCurrentWord(randomWord);
  };

  useEffect(() => {
    if (testParametres.dataWords.length > 0) {
      getRandomWord('dataWords');
    }
  }, [testParametres.trueWords, testParametres.falseWords, testParametres.skipWords]);

  useEffect(() => {
    if (testParametres.dataWords.length === 0 && testParametres.skipWords.length > 0) {
      getRandomWord('skipWords');
    }
    else if (!testParametres.dataWords.length && !testParametres.skipWords.length && Object.keys(currentWord).length !== 0) {
      setCurrentWord({});
      setModalEndTest(true)
      localStorage.setItem('endTest', JSON.stringify(true));
    }
  }, [testParametres.trueWords, testParametres.falseWords]);

  useEffect(() => {
    if (endTest) {
      setCurrentWord({});
      setModalEndTest(true)
    }
    
  }, [endTest]);

  

  

    const engArray = currentWord.eng || [];
    const rusArray = currentWord.rus || [];
    const wordArray = lang === 'eng' ? engArray : lang === 'rus' ? rusArray : [];
    const totalLength = wordArray.reduce((acc, word) => acc + word.length, 0);

  return (
  <div className={style.testSection_words} style={currentWord && totalLength > 15 ? { fontSize: '3rem' } : totalLength > 20 ? { fontSize: '2rem' } : totalLength > 30 ? { fontSize: '1rem' } : {}}>
    {lang === 'eng' && Array.isArray(currentWord.eng) ? currentWord.eng.join(', ') : ''}
    {lang === 'rus' && Array.isArray(currentWord.rus) ? currentWord.rus.join(', ') : ''}
    {lang === 'rus' && <span>{currentWord.desc}</span>}
   </div>
  );
};

export default Words;

