import React, { useState } from 'react'
import style from './TestSection.module.scss'
import Nums from './Nums/Nums';
import Words from './Words/Words';
import Answer from './Answer/Answer';

const TestSection = () => {
    const [currentWord, setCurrentWord] = useState({})



  return (
    <div className={style.testSection}>
    <Nums currentWord={currentWord} type='test'/>
    <Words currentWord={currentWord} setCurrentWord={setCurrentWord}/>
    <Answer currentWord={currentWord} setCurrentWord={setCurrentWord} />
  </div>
  )
}

export default TestSection