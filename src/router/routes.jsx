// Импорты
import InputWords from "../pages/InputWords/InputWords"
import TestWords from "../pages/TestWords/TestWords"
/////////////////////////////////////////////////////
const routes = [
	{ path: '/start', element: <InputWords />, exact: true }, // Страница ввода слов
	{ path: '/test', element: <TestWords />, exact: true }, // Страница с тестом по словам
] 

export default routes
