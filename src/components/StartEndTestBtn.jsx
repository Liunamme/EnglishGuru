import React, { useContext, useEffect } from 'react'
import { AppRouterContext, StoreContext } from '../context/context';
import Btn from './UI/Btn/Btn';

const StartEndTestBtn = ({ type, value, link, className }) => {
  const { changePage, start, setStart } = useContext(AppRouterContext); // Получение состояний из AppRouter
  const { dataWords, setDataWords, testParametres, setTestParametres, endTest, setEndTest} = useContext(StoreContext); // Получение состояний из глобального хранилища

    const handleClick = (link) => {
	  
    if (type === 'start' && dataWords.length !== 0) {
      setDataWords([])
      setTestParametres(prev => ({
        ...prev,
        dataWords: dataWords,
        countWords: dataWords.length
      }));
      changePage(link) // переадресовывает на другую страницу и на любые другие нельзя будет перейти
      setStart(link === '/start' ? false : true)
      localStorage.removeItem('textArea');
    }
    if (type === 'end') {
      setTestParametres((prevParametres) => ({
        ...prevParametres,
        dataWords: [],
        skipWords: [],
      }));
      setEndTest(true)
    }
}

useEffect(() => {
  localStorage.setItem('testParametres', JSON.stringify(testParametres));
}, [testParametres])

useEffect(() => {
  localStorage.setItem('start', start);
}, [start])

useEffect(() => {
  localStorage.setItem('endTest', JSON.stringify(endTest));
}, [endTest])


  return (
    <Btn 
          className={className}
          value={value}
          onClick={() => handleClick(link)}
          
    />
  )
}

export default StartEndTestBtn