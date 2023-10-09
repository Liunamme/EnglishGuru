// Импорты
import React, { useContext, useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { AppRouterContext, StoreContext } from '../context/context';
import routes from '../router/routes'
import Header from './Header/Header';
/////////////////////////////////////////////////////
const AppRouter = () => {
		// Состояния
		const { setPageNow } = useContext(StoreContext); // Получение состояний из глобального хранилища
		const [start, setStart] = useState(JSON.parse(localStorage.getItem('start') || false)) // Старт теста
		/////////////////////////////////////////////////////
		// Функционал
		const navigate = useNavigate();
		useEffect(() => {
			const storedPageNow = localStorage.getItem('pageNow') ? localStorage.getItem('pageNow') : '/start';
				if (storedPageNow === '/start') {
					setPageNow('/start');
					navigate('/start');
				} else if (storedPageNow === '/test') {
					setPageNow('/test');
					navigate('/test');
				}

		}, [navigate]); // Переадресовывает на нужную страницу, и на другие попасть невозможно
	
		const changePage = (link) => {
			localStorage.setItem('pageNow', link);
			setPageNow(link);
			navigate(link);
		}; // Функция для изменения текущей страницы
	return (
		<AppRouterContext.Provider // useContex для передачи состояний отсюда по всем компонентам
			value={{
				changePage, // Изменение страницы
				start, setStart, // Старт теста
			}} // в value нужно добавлять состояния, которые ме хотим передать другим компонентам (для чистаемости: 1 строчка - 1 состояние и функция для управления им)
		>
			<Header/>
			<Routes>
		{routes.map(route => ( // Чтобы добавить новую страницу, которая не доступна без аунтефикации -  добавь её в routes.js privateRoutes
					<Route
						path={route.path}
						element={route.element}
						exact={route.exact}
						key={route.path}
					/>
				))}
		</Routes>
		</AppRouterContext.Provider>
				
	);
}

export default AppRouter;