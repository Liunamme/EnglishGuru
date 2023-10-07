import React, { useContext } from 'react'
import style from './ModalResult.module.scss'
import { AppRouterContext, StoreContext } from '../../../context/context';
import MyModal from '../../../components/UI/MyModal/MyModal';
import Btn from '../../../components/UI/Btn/Btn';

const ModalResult = () => {
    const { testParametres, setTestParametres, modalEndTest, setModalEndTest, setEndTest, lang} = useContext(StoreContext); // Получение состояний из глобального хранилища
  const { changePage,setStart } = useContext(AppRouterContext); // Получение состояний из AppRouter
  const handleClick = (link) => {
      setTestParametres(prev => ({
        ...prev,
        dataWords: [],
        falseWords: [],
        skipWords: [],
        trueWords: [],
      }));
      changePage(link) // переадресовывает на другую страницу и на любые другие нельзя будет перейти
      setStart(link === '/test' ? true : false)
      setModalEndTest(false)
      setEndTest(false)
}
  return (
    <MyModal visible={modalEndTest} setVisible={setModalEndTest} className={style.modal}>
    <div className={style.modal}>
      <h2>Результаты теста</h2>
      <div className={style.resultTest}>
        <p className={style.resultTest_total}>Общее кол-во слов: <span>{testParametres.countWords}</span></p>
        <p className={style.resultTest_true}>Кол-во правильный слов: <span>{testParametres.trueWords.length}</span></p>
        <p className={style.resultTest_false}>Кол-во неправильных слов: <span>{testParametres.falseWords.length}</span></p>
      </div>
      <h3>Ваши ошибки</h3>
      <div className={style.falseWords}>
        {testParametres.falseWords.map((item, index )=> (
          lang === 'rus' ? (
            <div className={style.falseWords_word} key={index}>{item.rus.join(', ')} - {item.eng.join(', ')} - <span>{item.inputWord}</span></div>
          ) : lang === 'eng' ? (
            <div className={style.falseWords_word} key={index}>{item.eng.join(', ')} - {item.rus.join(', ')} - <span>{item.inputWord}</span></div>
          ) : null
        ))}
      </div>
      <Btn value='Начать новый тест' onClick={() => handleClick('/start')}/>
    </div>
    
    </MyModal>
  )
}

export default ModalResult