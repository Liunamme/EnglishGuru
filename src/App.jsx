import React, { useState } from 'react'
import { StoreContext } from './context/context'
import AppRouter from './components/AppRouter'
import { HashRouter as Router } from 'react-router-dom'

function App() {
  const [pageNow, setPageNow] = useState(localStorage.getItem('pageNow') || '/start') // Состояние нынешней страницы (на другие попасть невозможно)
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'eng'); // Используем значение из localStorage или 'ENG' по умолчанию
  const [testParametres, setTestParametres] = useState(
    JSON.parse(localStorage.getItem('testParametres')) || {
      dataWords: [],
      trueWords: [],
      falseWords: [],
      skipWords: [],
    }
  ); // Глобальное состояние теста
  const [dataWords, setDataWords] = useState([]); // Массив для хранения объектов слов
  const [modalEndTest, setModalEndTest] = useState(false) // Модалка для завершение теста и подведения итогов
  const [endTest, setEndTest] = useState(JSON.parse(localStorage.getItem('endTest')) || false)

  return (
    <StoreContext.Provider // Передача состояний отсюда по всем компонентам
			value={{
        pageNow, setPageNow, // Текущая страница
				lang, setLang, // Язык слов
        dataWords, setDataWords, // Массив для хранения объектов слов
        testParametres, setTestParametres, // Глобальное состояние теста
        modalEndTest, setModalEndTest, // Модалка для завершение теста и подведения итогов
        endTest, setEndTest, 
			}}
		>
      <Router>
        <AppRouter/>
      </Router>
		</StoreContext.Provider>
  )
}


export default App
