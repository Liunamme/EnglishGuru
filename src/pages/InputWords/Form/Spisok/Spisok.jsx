import React, { useContext, useState, useEffect } from 'react';
import style from './Spisok.module.scss'
import { StoreContext } from '../../../../context/context';
import Btn from '../../../../components/UI/Btn/Btn';

const Spisok = () => {
    const { setDataWords } = useContext(StoreContext); // Получение состояний из глобального хранилища
    // Получение начального значения для textarea из localStorage
    const [textareaValue, setTextareaValue] = useState(localStorage.getItem('textareaValue') || ''); // Состояние для текстового поля
    const defaultPlaceholder = 'Введите слова\nФормат: eng,eng - rus,rus(description);\nПримеры:\ngo, walk - идти;\ndepict - изображать, описывать;\nring - звонить, звонок(у двери, школьный);';

    // Обработчик изменения текста в текстовом поле
    const handleTextareaChange = (event) => {
        const newValue = event.target.value;
        setTextareaValue(newValue);
        if (textareaPlaceholder === 'Слова успешно загружены!' && newValue !== initialTextareaValue) {
            setTextareaPlaceholder(defaultPlaceholder);
        }
    };

    // Обработчик нажатия на кнопку "Загрузить слова"
    const handleLoadWords = () => {
        const lines = textareaValue.split(';').filter((line) => line.trim() !== ''); // Убираем пустые строки
        const newWords = lines.map((line) => {
            const [languages, description] = line.split('(').map((item) => item.trim());
            const [engWords, rusWords] = languages.split('-').map((item) => item.trim());

            // Проверка на наличие всех компонентов
            if (engWords && rusWords) {
                const desc = description ? description.replace(')', '').trim() : ''; // Проверка и обработка описания
                return {
                    eng: engWords.split(',').map((word) => word.trim()),
                    rus: rusWords.split(',').map((word) => word.trim()),
                    desc: desc,
                };
            }
            return null;
        });

        // Убираем объекты с null
        const filteredWords = newWords.filter((word) => word !== null);

        // Обновляем состояние только если есть корректные объекты
        if (filteredWords.length > 0) {
            setDataWords(filteredWords);
            setTextareaValue(''); // Очищаем текстовое поле
            // Обновляем placeholder
            setTextareaPlaceholder('Слова успешно загружены!');
        }
    };

    // Состояние для placeholder
    const [textareaPlaceholder, setTextareaPlaceholder] = useState(defaultPlaceholder);

    // Сохраняем содержимое textarea в localStorage при изменении
    useEffect(() => {
        localStorage.setItem('textareaValue', textareaValue);
    }, [textareaValue]);
    return (
        <div className={style.form_parametres_spisok}>
            <textarea
                value={textareaValue}
                placeholder={textareaPlaceholder}
                onChange={handleTextareaChange}
            ></textarea>
            <Btn value='Загрузить слова' className={style.sumbitBtn} onClick={handleLoadWords} />
        </div>
    );
}

export default Spisok;