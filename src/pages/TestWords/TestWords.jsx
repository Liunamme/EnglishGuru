import React from 'react'
import style from './TestWords.module.scss'
import TestSection from './TestSection/TestSection'
import ModalResult from './ModalResult/ModalResult'

const TestWords = () => {
  return (
    <div className={`${style.testWords}`}>
      <ModalResult/>
      <div className={`${style.testWords_container} wrapper`}>
        <TestSection/>
      </div>
    </div>
  )
}

export default TestWords