import React, { useContext, useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { StoreContext } from '../../../../context/context';

const ExcelImport = () => {
  const { dataWords, setDataWords } = useContext(StoreContext); // Получение состояний из глобального хранилища
  const [selectedData, setSelectedData] = useState([]);
  const [fileInputKey, setFileInputKey] = useState(0); // Добавляем ключ для сброса input файла

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Создаем массив объектов dataWords
        const newDataWords = [];

        // Проходим по каждой строке данных из Excel
        for (let rowIndex = 0; rowIndex < parsedData.length; rowIndex++) {
          const row = parsedData[rowIndex];
          if (row[0] || row[1] || row[2]) {
            const engWords = row[0] ? row[0].split(',') : []; // Разделяем английские слова по запятым
            const rusWords = row[1] ? row[1].split(',') : []; // Разделяем русские слова по запятым
            const descWords = row[2] ? row[2] : ''; // Просто строка

            // Проверяем, что хотя бы одно поле содержит данные
            if (engWords.some((word) => word.trim() !== '') || rusWords.some((word) => word.trim() !== '') || descWords.trim() !== '') {
              const wordObject = {
                eng: engWords.map((word) => word.trim()), // Удаляем лишние пробелы вокруг слов
                rus: rusWords.map((word) => word.trim()), // Удаляем лишние пробелы вокруг слов
                desc: descWords.trim(), // Просто строка, без разделения
              };

              newDataWords.push(wordObject);
            }
          }
        }

        setDataWords(newDataWords);
        setSelectedData(parsedData); // Если вам нужен доступ к исходным данным
      };

      reader.readAsBinaryString(file);
    }
  };

  // Обработчик изменения инпута файла для сброса данных при выборе нового файла
  const handleFileInputChange = (e) => {
    setDataWords([]); // Сбрасываем данные при выборе нового файла
    setFileInputKey(fileInputKey + 1); // Увеличиваем ключ для сброса input файла
    handleFileUpload(e); // Обрабатываем новый файл
  };

  return (
    <input
      key={fileInputKey} // Устанавливаем ключ input файла
      type="file"
      accept=".xlsx"
      onChange={handleFileInputChange}
      style={{ width: '115px' }}
    />
  );
};

export default ExcelImport;